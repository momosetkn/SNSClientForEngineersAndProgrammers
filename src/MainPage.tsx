import React, { createContext, useEffect, useMemo } from 'react';
import { useState } from "react";
import { Compose } from "./Compose";
import { end_point, User, Image, uploadImages, Response } from "./Api";
import './index.css';
import styled from "styled-components";
import {Logs} from "./Logs";
import {PreviewImagesOverlay} from "./PreviewImagesOverlay";

export type ComposeValue = { text: string, replyToTextId: string, replyToUserId: string; files?: File[]}

export const initialComposeValue: ComposeValue = {text: "", replyToTextId: "", replyToUserId: ""};

export const ComposeContext =
  createContext<{ composeValue: ComposeValue, setComposeValue: (value: ComposeValue) => void }>(
    {composeValue: initialComposeValue, setComposeValue: (_: ComposeValue) => {}}
  );

export const ImageMapContext = createContext<Record<string, Image[]>>({});

export const LoadImagesContext = createContext<() => void>(() => {});

export const SetPreviewImagesContext = createContext<(params: {images: string[], index: number}) => void>(() => {});

const lists = [
  {
    name: 'All',
    query: encodeURI("$filter=_user_id ne 'd9ecf9245defb6b07cb86fe92a6fde9e735fc9f9'&$orderby=_created_at desc&$limit=20"),
  },
  {
    name: 'To me',
    query: encodeURI("$filter=in_reply_to_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc&$limit=20")
  },
  {
    name: 'Self',
    query: encodeURI("$filter=_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc&$limit=20")
  },
]

export const MainPage = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [imageList, setImageList] = useState<Image[]>([]);
  const [composeValue, setComposeValue] = useState<ComposeValue>(initialComposeValue);
  const [loadLogTrigger, setLoadLogTrigger] = useState(Number.MIN_SAFE_INTEGER);
  const [previewImages, setPreviewImages] = useState<{images: string[], index: number}>({images: [], index: 0});
  const [openPreviewImagesOverlay, setOpenPreviewImagesOverlay] = useState(false);

  const userMap: Record<string, User> = useMemo(() => userList.reduce((acc: any, cur: { id: any; }) => ({
    ...acc,
    [cur.id]: cur
  }), {}), [userList]);

  const imageMap: Record<string, Image[]> = useMemo(() => imageList.reduce((acc: any, cur: Image) => ({
    ...acc,
    [cur.bind_text_id]: [...(acc[cur.bind_text_id] || []), cur],
  }), {}), [imageList]);

  const loadUser = () => {
    fetch(`${end_point}/user/all`)
      .then((res) => (res.json()))
      .then(setUserList);
  };

  const loadImages = () => {
    fetch(`${end_point}/image/all`)
      .then((res) => (res.json()))
      .then(setImageList);
  };

  const handleSubmit = async ({text, replyToUserId, replyToTextId, files}: ComposeValue) => {
    const params = {
      text,
      ...(replyToUserId ? {in_reply_to_user_id: replyToUserId}: {}),
      ...(replyToTextId ? {in_reply_to_text_id: replyToTextId}: {}),
    };
    // 以下コードにて、'を"へ置換してるっぽいので、エスケープさせる（\"と認識させて、文字列の終端と認識されちゃうのを防止）
    // https://github.com/HawkClaws/versatileapi/blob/6f7c8db356455f890662b525106d2e1270fa58e8/versatileapi/src/main/java/com/flex/versatileapi/service/VersatileService.java#L154
    const postTextRes: Response = await fetch(`${end_point}/text`, {
      method: "POST",
      headers: {Authorization: "HelloWorld"},
      body: JSON.stringify(params).replaceAll("'", String.raw`\'`)
    }).then((res) => res.json());
    files && await uploadImages({files, bindTextId: postTextRes.id});

    loadImages();
    setLoadLogTrigger(prev => prev+1);
  };

  useEffect(() => {
    loadUser();
    setInterval(loadUser, 60_000 * 10);//10分

    loadImages();
    setInterval(loadImages, 10_000);
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
        <LoadImagesContext.Provider value={loadImages}>
          <ImageMapContext.Provider value={imageMap}>
            <ComposeContext.Provider value={{composeValue, setComposeValue}}>
              <div className="flex">
                {lists.map(list => (
                  <Logs
                    key={list.name}
                    name={list.name}
                    query={list.query}
                    userMap={userMap}
                    loadLogTrigger={loadLogTrigger}
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
    </StyledMain>
  );
};

const StyledMain = styled.div`
  ::-webkit-scrollbar {
    display:none;
  }
`;
