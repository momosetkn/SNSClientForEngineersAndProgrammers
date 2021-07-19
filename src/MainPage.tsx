import React, { useEffect, useMemo, useRef } from 'react';
import { useState } from "react";

const end_point = "https://versatileapi.herokuapp.com/api";

type Base = {
  id: string;
  _created_at: string;
  _updated_at: string;
  _user_id: string;
}

type Text = Base & {
  text: string;
  in_reply_to_user_id?: string; //返信対象のUserId
  in_reply_to_text_id?: string; //返信対象のTextId
}

type User = Base & {
  description: string;
  name: string;
}

export const MainPage = () => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [confirm, setConfirm] = useState(false);
  const [userMap, setUserMap] = useState<Record<string, User>>({});

  const reloadLog = () => {
    fetch(`${end_point}/text/all?$orderby=_created_at%20desc&$limit=60`)
      .then((res) => (res.json()))
      .then(setTexts);
  };

  const handleSubmitMsg = async (msg: string) => {
    await fetch(`${end_point}/text`, {
      method: "POST",
      headers: {Authorization: "HelloWorld"},
      body: JSON.stringify({text: msg})
    }).then((res) => res.json()).then(x => console.log(x));
    reloadLog();
  };

  useEffect(() => {
    reloadLog();
    setInterval(reloadLog, 30_000);

    (async () => {
      // @ts-ignore
      const userMap = await fetch(`${end_point}/user/all`)
        .then((res) => (res.json()))
        .then((x) => (
          x.reduce((acc: any, cur: { id: any; }) => ({...acc, [cur.id]: cur}), {})
        ));
      setUserMap(userMap);
    })()
  }, []);

  return (
    <>
      {confirm ? (
        <div>
          <Compose onSubmitMsg={handleSubmitMsg}/>
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

const Compose = ({onSubmitMsg}: { onSubmitMsg: (msg: string) => void }) => {
  const [msg, setMsg] = useState("");
  const [send, setSend] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeydown = (e: KeyboardEvent) => {
    // Ctrl + Enterで送信
    if (e.ctrlKey && e.keyCode === 13 && !send) {
      // ここで送信処理はせず、sendフラグの変更をuseEffectで察知させて、送ることで、古いデータを送らないようにする
      setSend(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (send && msg.trim()) {
        setSend(false);
        onSubmitMsg(msg.trim());
        setMsg("");
      }
    })();
  }, [send, msg]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", handleKeydown, false);
    }
  }, [inputRef.current]);

  return (
    <form>
      <textarea
        ref={inputRef}
       
        rows={4}
        value={msg}
        onChange={e => setMsg(e.target.value)}/>
    </form>
  );
};

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
