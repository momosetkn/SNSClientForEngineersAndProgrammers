import React, { createContext, useEffect, useMemo } from 'react';
import { useState } from "react";
import { Compose } from "./Compose";
import { end_point, User, Text } from "./Api";
import {Log} from "./Log";
import './index.css';
import styled from "styled-components";

export type ComposeValue = { text: string, replyToTextId: string, replyToUserId: string }

export const initialComposeValue: ComposeValue = {text: "", replyToTextId: "", replyToUserId: ""};

export const ComposeContext =
  createContext<{ composeValue: ComposeValue, setComposeValue: (value: ComposeValue) => void }>(
    {composeValue: initialComposeValue, setComposeValue: (value: ComposeValue) => {}}
  );

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
  const [composeValue, setComposeValue] = useState<ComposeValue>(initialComposeValue);

  const userMap: Record<string, User> = useMemo(() => userList.reduce((acc: any, cur: { id: any; }) => ({
    ...acc,
    [cur.id]: cur
  }), {}), [userList]);

  const loadUser = () => {
    fetch(`${end_point}/user/all`)
      .then((res) => (res.json()))
      .then(setUserList);
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
    // TODO: 発言後にリロードさせる
    // loadLog();
  };

  useEffect(() => {
    loadUser();
    setInterval(loadUser, 60_000 * 10);//10分
  }, []);

  return (
    <div>
      <Compose value={composeValue} onChange={setComposeValue} onSubmit={handleSubmit} userList={userList} />
      <ComposeContext.Provider value={{composeValue, setComposeValue}}>
        <div className="flex">
          {lists.map(list => (
            <Logs key={list.name} name={list.name} query={list.query} userMap={userMap}/>
          ))}
        </div>
      </ComposeContext.Provider>
    </div>
  );
};

const Logs = ({
  name,
  query,
  userMap,
} : {
  name: string,
  query: string,
  userMap: Record<string, User>,
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
`;
