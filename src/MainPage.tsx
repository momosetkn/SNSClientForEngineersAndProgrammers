import React, { useEffect, useMemo } from 'react';
import { useState } from "react";
import { Compose } from "./Compose";
import { end_point, User, Text } from "./Api";
import {Log} from "./Log";

export type ComposeValue = { text: string, replyToTextId: string, replyToUserId: string }

export const initialComposeValue: ComposeValue = {text: "", replyToTextId: "", replyToUserId: ""};

export const MainPage = () => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [composeValue, setComposeValue] = useState<ComposeValue>(initialComposeValue);

  const userMap: Record<string, User> = useMemo(() => userList.reduce((acc: any, cur: { id: any; }) => ({
    ...acc,
    [cur.id]: cur
  }), {}), [userList]);

  const reloadLog = () => {
    fetch(`${end_point}/text/all?$orderby=_created_at%20desc&$limit=60`)
      .then((res) => (res.json()))
      .then(setTexts);
  };

  const handleSubmit = async ({text, replyToUserId, replyToTextId}: { text: string, replyToUserId?: string, replyToTextId?: string} ) => {
    const params = {
      text,
      ...(replyToUserId ? {in_reply_to_user_id: replyToUserId}: {}),
      ...(replyToTextId ? {in_reply_to_text_id: replyToTextId}: {}),
    };
    await fetch(`${end_point}/text`, {
      method: "POST",
      headers: {Authorization: "HelloWorld"},
      body: JSON.stringify(params)
    }).then((res) => res.json()).then(x => console.log(x));
    reloadLog();
  };

  useEffect(() => {
    reloadLog();
    setInterval(reloadLog, 30_000);

    (async () => {
      // @ts-ignore
      await fetch(`${end_point}/user/all`)
        .then((res) => (res.json()))
        .then(setUserList);
    })()
  }, []);

  return (
    <div>
      <Compose value={composeValue} onChange={setComposeValue} onSubmit={handleSubmit} userList={userList} />
      {texts.map(text => (
        <Log
          key={text.id}
          text={text}
          userMap={userMap}
          onReplyTo={(x) =>
            setComposeValue({...composeValue, replyToTextId: x.textId,  replyToUserId: x.userId})
          }
        />
      ))}
    </div>
  );
}
