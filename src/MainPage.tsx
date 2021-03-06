import React, {createContext, useEffect, useMemo, useState} from 'react';
import {Compose} from "./Compose";
import {end_point, httpToJson, Image, Like, Return, uploadImages, User} from "./Api";
import './index.css';
import styled from "styled-components";
import {Logs} from "./Logs";
import {PreviewImagesOverlay} from "./PreviewImagesOverlay";
import {NotificationBar, NotificationContent} from "./NotificationBar";
import {asyncConvertBase64} from "./Util";
import {localStorageKey} from "./Constants";
import {ConfirmModal, ConfirmModalValue} from "./ConfirmModal";
import {SettingsOverlay} from "./SettingsOverlay";

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
  userMap: Record<string, User>,
  fireNotificationContent: (value: NotificationContent) => void,
  fireConfirmModal: (value: ConfirmModalValue) => Promise<boolean>,
  openSettingsOverlay: () => void,
}>({
  imageMap: {},
  likeMap: {},
  userMap: {},
  fireNotificationContent: (_: NotificationContent) => {},
  fireConfirmModal: async (_: ConfirmModalValue) => false,
  openSettingsOverlay: () => {},
});

export const LoadImagesContext = createContext<() => void>(() => {});

export const SetPreviewImagesContext = createContext<(params: {images: string[], index: number}) => void>(() => {});

export type PainValue = {
  name: string;
  query: string;
  limit: number;
  pollingIntervalTime: number;
};

const initialPains = [
  {
    name: 'All',
    query: "$filter=_user_id ne 'd9ecf9245defb6b07cb86fe92a6fde9e735fc9f9'&$orderby=_created_at desc",
    limit: 20,
    pollingIntervalTime: 20,
  },
  {
    name: 'To me',
    query: "$filter=in_reply_to_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc",
    limit: 20,
    pollingIntervalTime: 20,
  },
  {
    name: 'Self',
    query: "$filter=_user_id eq '57039384a74e1fed39b1663b460b7e7f51f99bee'&$orderby=_created_at desc",
    limit: 20,
    pollingIntervalTime: 20,
  },
];

export const MainPage = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [imageList, setImageList] = useState<Image[]>([]);
  const [likeList, setLikeList] = useState<Like[]>([]);
  const [composeValue, setComposeValue] = useState<ComposeValue>(initialComposeValue);
  const [loadLogTrigger, setLoadLogTrigger] = useState(Number.MIN_SAFE_INTEGER);
  const [previewImages, setPreviewImages] = useState<{images: string[], index: number}>({images: [], index: 0});
  const [openPreviewImagesOverlay, setOpenPreviewImagesOverlay] = useState(false);
  const [notificationContent, setNotificationContent] = useState<NotificationContent>();
  const [confirmModalValue, setConfirmModalValue] = useState<ConfirmModalValue>({content: '', action: "ok", title: ''});
  const [confirmModalPromise, setConfirmModalPromise] = useState(() => (_: boolean) => {});
  const [pains, setPains] = useState<PainValue[]>([]);
  const [settingsOverlayOpen, setSettingsOverlayOpen] = useState(false);

  const userMap: Record<string, User> = useMemo(() => userList.reduce((acc: any, cur: User) => ({
    ...acc,
    [cur._user_id]: acc[cur._user_id] || cur,
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
    fetch(`${end_point}/user/all?$orderby=_created_at desc`)
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

  const handleChangePain = (index: number, value?: PainValue, ) => {
    const sameNamePain = pains.find((pain, i) => pain.name === value?.name && i !== index);
    if(sameNamePain) {
      setNotificationContent({text: "?????????pain???????????????????????????", type: 'error'});
      return;
    }
    setPains(prev => {
      const left = prev.slice(0, index);
      const right = prev.slice(index + 1);
      return value ? [...left, value, ...right] : [...left, ...right];
    });
  };

  const handleSubmit = async ({text, replyToUserId, replyToTextId, files}: ComposeValue) => {
    const params = {
      text,
      ...(replyToUserId ? {in_reply_to_user_id: replyToUserId}: {}),
      ...(replyToTextId ? {in_reply_to_text_id: replyToTextId}: {}),
    };
    const postTextRes: Return = await fetch(`${end_point}/text`, {
      method: "POST",
      headers: {Authorization: "HelloWorld"},
      body: JSON.stringify(params)
    }).then(httpToJson);
    if (files) {
      for (const file of files) {
        const base64 = await asyncConvertBase64(file);
        if (!base64) {
          console.error('???????????????????????????');
          setNotificationContent({text: '???????????????????????????', type: "error"});
          continue;
        }
        await uploadImages({base64s: [base64], bindTextId: postTextRes.id});
      }
      await loadImages();
    }

    setLoadLogTrigger(prev => prev+1);
  };

  const fireConfirmModal = async (value: ConfirmModalValue) => {
    setConfirmModalValue(value);
    return await new Promise((resolve) => {
      setConfirmModalPromise(() => resolve);
    }) as boolean;
  };

  useEffect(() => {
    loadUser();
    setInterval(loadUser, 60_000 * 10);//10???

    loadImages();
    setInterval(loadImages, 10_000);

    loadLikes();
    setInterval(loadLikes, 60_000);//1minute

    const value = localStorage.getItem(localStorageKey.pains)
    setPains(value ? JSON.parse(value) : initialPains);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(previewImages.images.length){
      setOpenPreviewImagesOverlay(true);
    }
  }, [previewImages]);

  useEffect(() => {
    localStorage.setItem(localStorageKey.pains, JSON.stringify(pains))
  }, [pains]);

  return (
    <StyledMain>
      <SetPreviewImagesContext.Provider value={setPreviewImages}>
        <LoadImagesContext.Provider value={loadImages} >
          <ImageMapContext.Provider value={{imageMap, likeMap, userMap, fireConfirmModal, fireNotificationContent: setNotificationContent, openSettingsOverlay: () => setSettingsOverlayOpen(true) }}>
            <ComposeContext.Provider value={{composeValue, setComposeValue}}>
              <Compose value={composeValue} onChange={setComposeValue} onSubmit={handleSubmit} userList={userList} />
              <div className="flex">
                {pains.map((list, index) => (
                  <Logs
                    key={list.name}
                    value={list}
                    loadLogTrigger={loadLogTrigger}
                    onChangePain={value => handleChangePain(index, value)}
                  />
                ))}
              </div>
            </ComposeContext.Provider>
          </ImageMapContext.Provider>
        </LoadImagesContext.Provider>
      </SetPreviewImagesContext.Provider>
      <SettingsOverlay open={settingsOverlayOpen} onClose={() => setSettingsOverlayOpen(false)} pains={pains} onChangePains={setPains}/>
      <PreviewImagesOverlay
        open={openPreviewImagesOverlay}
        onClose={() => setOpenPreviewImagesOverlay(false)}
        images={previewImages.images}
        index={previewImages.index}
      />
      <NotificationBar content={notificationContent} />
      <ConfirmModal value={confirmModalValue} onClose={() => confirmModalPromise(false)} onAccept={() => confirmModalPromise(true)}/>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  ::-webkit-scrollbar {
    display:none;
  }
`;
