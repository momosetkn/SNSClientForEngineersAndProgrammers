import React, { useEffect, useMemo } from 'react';
import { useState } from "react";
import { Compose } from "./Compose";
import { end_point, User, Text } from "./Api";

export const MainPage = () => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [confirm, setConfirm] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
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
    <>
      {confirm ? (
        <div>
          <Compose onSubmit={handleSubmit} userList={userList}/>
          {texts.map(text => (
            <Log key={text.id} text={text} userMap={userMap}/>
          ))}
        </div>
      ) : (
        <div>
          あなたはエンジニア・プログラマですか？
          <button onClick={() => setConfirm(true)}>はい</button>
        </div>
      )
      }
    </>
  );
}

const Log = ({text, userMap}: { text: Text; userMap: Record<string, User> }) => {
  const [updateTimeTrigger, setUpdateTimeTrigger] = useState(Number.MIN_SAFE_INTEGER);

  const time = useMemo(() => {
    const now = new Date();
    const date = new Date(text._created_at);
    const diff = (now.getTime() - date.getTime()) / 1_000;
    let timeDiff = "";
    if (diff < 60) {
      timeDiff = `${Math.floor(diff)}秒前`;
    } else if (diff / 60 < 60) {
      timeDiff = `${Math.floor(diff / 60)}分前`;
    } else if (diff / 60 / 60 < 24) {
      timeDiff = `${Math.floor(diff / 60 / 60)}時間前`;
    } else {
      timeDiff = `${Math.floor(diff / 60 / 60 / 24)}日前`;
    }
    return {
      timeDiff,
      time: text._created_at,
      localizedTime: date.toLocaleString("ja-JP"),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, userMap, updateTimeTrigger]);

  useEffect(() => {
    setInterval(() => setUpdateTimeTrigger(prev => prev + 1), 5_000);
  }, []);

  const getUser = (userId: string) => {
    return userMap[userId]?.name || `匿名(${userId.slice(0, 2)})`;
  }

  return (
    <div>
      <div>
        <time dateTime={time.time} title={time.localizedTime}>
          {time.timeDiff}
        </time>
      </div>
      <div
        title={userMap[text._user_id]?.description || text._user_id}>
        {getUser(text._user_id)}
      </div>
      <div>
        <pre>
          {text.in_reply_to_user_id ? `@${getUser(text.in_reply_to_user_id)} `: ''}
          {text.text}
        </pre>
      </div>
    </div>
  );
}
