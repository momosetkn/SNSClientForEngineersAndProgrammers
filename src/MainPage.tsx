import React, { createContext, useEffect, useMemo } from 'react';
import { useState } from "react";
import { Compose } from "./Compose";
import {end_point, User, Image, uploadImages, Return, Like, httpToJson} from "./Api";
import './index.css';
import styled from "styled-components";
import {Logs} from "./Logs";
import {PreviewImagesOverlay} from "./PreviewImagesOverlay";
import {NotificationBar, NotificationContent} from "./NotificationBar";

export type ComposeValue = { text: string, replyToTextId: string, replyToUserId: string; files?: File[]}

export const initialComposeValue: ComposeValue = {text: "", replyToTextId: "", replyToUserId: ""};

export const ComposeContext =
  createContext<{ composeValue: ComposeValue, setComposeValue: (value: ComposeValue) => void }>(
    {composeValue: initialComposeValue, setComposeValue: (_: ComposeValue) => {}}
  );

// TODO rename
export const ImageMapContext = createContext<{
  imageMap: Record<string, Image[]>,
  likeMap: Record<string, Like>,
  setNotificationContent: (value: NotificationContent) => void,
}>({
  imageMap: {},
  likeMap: {},
  setNotificationContent: (_: NotificationContent) => {},
});

export const LoadImagesContext = createContext<() => void>(() => {});

export const SetPreviewImagesContext = createContext<(params: {images: string[], index: number}) => void>(() => {});

export type PainValue = {
  name: string;
  query: string;
};

export const MainPage = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [imageList, setImageList] = useState<Image[]>([]);
  const [likeList, setLikeList] = useState<Like[]>([]);
  const [composeValue, setComposeValue] = useState<ComposeValue>(initialComposeValue);
  const [loadLogTrigger, setLoadLogTrigger] = useState(Number.MIN_SAFE_INTEGER);
  const [previewImages, setPreviewImages] = useState<{images: string[], index: number}>({images: [], index: 0});
  const [openPreviewImagesOverlay, setOpenPreviewImagesOverlay] = useState(false);
  const [notificationContent, setNotificationContent] = useState<NotificationContent>();
  // TODO: localstorage?
  const [painValues, setPainValues] = useState<PainValue[]>( [
    {
      name: 'All',
      query: encodeURI("$filter=_user_id ne 'd9ecf9245defb6b07cb86fe92a6fde9e735fc9f9'&$orderby=_created_at desc"),
    },
    {
      name: 'To me',
      query: encodeURI("$filter=in_reply_to_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc")
    },
    {
      name: 'Self',
      query: encodeURI("$filter=_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc")
    },
  ]);

  const userMap: Record<string, User> = useMemo(() => userList.reduce((acc: any, cur: User) => ({
    ...acc,
    [cur.id]: cur
  }), {}), [userList]);

  const imageMap: Record<string, Image[]> = useMemo(() => imageList.reduce((acc: any, cur: Image) => ({
    ...acc,
    [cur.bind_text_id]: [...(acc[cur.bind_text_id] || []), cur],
  }), {}), [imageList]);

  const likeMap: Record<string, Like> = useMemo(() => likeList.reduce((acc: any, cur: Like) => ({
    ...acc,
    [cur.id]: cur,
  }), {}), [likeList]);

  const loadUser = () => {
    fetch(`${end_point}/user/all`)
      .then(httpToJson)
      .then(setUserList);
  };

  const loadImages = async () => {
    const loadImagesLimit = async (limit: number) => {
      const newImageList: Image[] = await fetch(`${end_point}/image/all?$orderby=_created_at desc&$limit=${limit}`).then(httpToJson);

      if(imageList.length ===0){
        setImageList(newImageList);
        return;
      }

      const newImageListIndex = newImageList.findIndex(newImage => newImage.id === imageList[0]?.id);
      if(newImageListIndex !== -1){
        setImageList(prev => [...newImageList.slice(0, newImageListIndex), ...prev]);
        return;
      }
      await loadImagesLimit(limit + 100);
    }
    await loadImagesLimit(20);
  };

  const loadLikes = () => {
    fetch(`${end_point}/like/all`)
      .then(httpToJson)
      .then(setLikeList);
  };

  const handleSubmit = async ({text, replyToUserId, replyToTextId, files}: ComposeValue) => {
    const params = {
      text,
      ...(replyToUserId ? {in_reply_to_user_id: replyToUserId}: {}),
      ...(replyToTextId ? {in_reply_to_text_id: replyToTextId}: {}),
    };
    // 以下コードにて、'を"へ置換してるっぽいので、エスケープさせる（\"と認識させて、文字列の終端と認識されちゃうのを防止）
    // https://github.com/HawkClaws/versatileapi/blob/6f7c8db356455f890662b525106d2e1270fa58e8/versatileapi/src/main/java/com/flex/versatileapi/service/VersatileService.java#L154
    const postTextRes: Return = await fetch(`${end_point}/text`, {
      method: "POST",
      headers: {Authorization: "HelloWorld"},
      body: JSON.stringify(params).replaceAll("'", String.raw`\'`)
    }).then(httpToJson);
    files && await uploadImages({files, bindTextId: postTextRes.id});

    await loadImages();
    setLoadLogTrigger(prev => prev+1);
  };

  useEffect(() => {
    loadUser();
    setInterval(loadUser, 60_000 * 10);//10分

    loadImages();
    setInterval(loadImages, 10_000);

    loadLikes();
    setInterval(loadLikes, 60_000);//1minute
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if(previewImages.images.length){
      setOpenPreviewImagesOverlay(true);
    }
  }, [previewImages]);

  return (
    <StyledMain>
      <Compose value={composeValue} onChange={setComposeValue} onSubmit={handleSubmit} userList={userList} />
      <SetPreviewImagesContext.Provider value={setPreviewImages}>
        <LoadImagesContext.Provider value={loadImages} >
          <ImageMapContext.Provider value={{imageMap, likeMap, setNotificationContent }}>
            <ComposeContext.Provider value={{composeValue, setComposeValue}}>
              <div className="flex">
                {painValues.map((list, index) => (
                  <Logs
                    key={list.name}
                    value={list}
                    userMap={userMap}
                    loadLogTrigger={loadLogTrigger}
                    onChangePainValue={value => {
                      setPainValues(prev => {
                        const newList = [...prev];
                        newList[index] = value;
                        return newList
                      })
                    }}
                  />
                ))}
              </div>
            </ComposeContext.Provider>
          </ImageMapContext.Provider>
        </LoadImagesContext.Provider>
      </SetPreviewImagesContext.Provider>
      <PreviewImagesOverlay
        open={openPreviewImagesOverlay}
        onClose={() => setOpenPreviewImagesOverlay(false)}
        images={previewImages.images}
        index={previewImages.index}
      />
      <NotificationBar content={notificationContent} />
    </StyledMain>
  );
};

const StyledMain = styled.div`
  ::-webkit-scrollbar {
    display:none;
  }
`;
