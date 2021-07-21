import React, { createContext, useEffect, useMemo } from 'react';
import { useState } from "react";
import { Compose, composeHeight } from "./Compose";
import { end_point, User, Text, Image } from "./Api";
import {Log} from "./Log";
import './index.css';
import styled from "styled-components";

export type ComposeValue = { text: string, replyToTextId: string, replyToUserId: string }

export const initialComposeValue: ComposeValue = {text: "", replyToTextId: "", replyToUserId: ""};

export const ComposeContext =
  createContext<{ composeValue: ComposeValue, setComposeValue: (value: ComposeValue) => void }>(
    {composeValue: initialComposeValue, setComposeValue: (value: ComposeValue) => {}}
  );

export const ImageMapContext = createContext<Record<string, Image>>({});

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

  const userMap: Record<string, User> = useMemo(() => userList.reduce((acc: any, cur: { id: any; }) => ({
    ...acc,
    [cur.id]: cur
  }), {}), [userList]);

  const imageMap: Record<string, Image> = useMemo(() => imageList.reduce((acc: any, cur: { bind_text_id: any; }) => ({
    ...acc,
    [cur.bind_text_id]: cur
  }), {}), [imageList]);

  const loadUser = () => {
    fetch(`${end_point}/user/all`)
      .then((res) => (res.json()))
      .then(setUserList);
  };

  const loadImage = () => {
    fetch(`${end_point}/image/all`)
      .then((res) => (res.json()))
      .then(setImageList);
  };

  const handleSubmit = async ({text, replyToUserId, replyToTextId}: { text: string, replyToUserId?: string, replyToTextId?: string} ) => {
    const params = {
      text,
      ...(replyToUserId ? {in_reply_to_user_id: replyToUserId}: {}),
      ...(replyToTextId ? {in_reply_to_text_id: replyToTextId}: {}),
    };
    // 以下コードにて、'を"へ置換してるっぽいので、エスケープさせる（\"と認識させて、文字列の終端と認識されちゃうのを防止）
    // https://github.com/HawkClaws/versatileapi/blob/6f7c8db356455f890662b525106d2e1270fa58e8/versatileapi/src/main/java/com/flex/versatileapi/service/VersatileService.java#L154
    await fetch(`${end_point}/text`, {
      method: "POST",
      headers: {Authorization: "HelloWorld"},
      body: JSON.stringify(params).replaceAll("'", String.raw`\'`)
    }).then((res) => res.json()).then(x => console.log(x));

    loadImage();
    setLoadLogTrigger(prev => prev+1);
  };

  useEffect(() => {
    loadUser();
    setInterval(loadUser, 60_000 * 10);//10分

    loadImage();
    setInterval(loadUser, 10_000);
  }, []);

  return (
    <div>
      <Compose value={composeValue} onChange={setComposeValue} onSubmit={handleSubmit} userList={userList} />
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
    </div>
  );
};

const Logs = ({
  name,
  query,
  userMap,
  loadLogTrigger,
} : {
  name: string,
  query: string,
  userMap: Record<string, User>,
  loadLogTrigger?: number,
}) => {
  const [texts, setTexts] = useState<Text[]>([]);

  const loadLog = () => {
    fetch(`${end_point}/text/all?${query}`)
      .then((res) => (res.json()))
      .then(setTexts);
  };

  useEffect(() => {
    loadLog();
    setInterval(loadLog, 10_000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => loadLog(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadLogTrigger]);

  return (
    <StyledLogs>
      <h3 className="m0">
        {name}
      </h3>
      {texts.map(text => (
        <Log
          key={text.id}
          text={text}
          userMap={userMap}
        />
      ))}
    </StyledLogs>
  );
}

const StyledLogs = styled.div`
  width: 320px;
  height: calc(100vh - ${composeHeight});
  overflow-y: auto;
`;
