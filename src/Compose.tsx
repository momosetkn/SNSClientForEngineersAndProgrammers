import React, { useEffect, useRef, useState } from "react";
import { User } from "./Api";

type ComposeValue = { text: string, replyToUserId: string }

const initialValue: ComposeValue = {text: "", replyToUserId: ""};

export const Compose = ({onSubmit, userList}: { onSubmit: (value: ComposeValue) => void; userList: User[] }) => {
  const [composeValue, setComposeValue] = useState<ComposeValue>(initialValue);
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
      if (send && composeValue.text.trim()) {
        setSend(false);
        onSubmit(composeValue);
        setComposeValue(initialValue);
      }
    })();
  }, [send, composeValue, onSubmit]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", handleKeydown, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef.current]);

  const handleChangeComposeValue = (event: any) => {
    setComposeValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form>
      <select
        name="replyToUserId"
        value={composeValue.replyToUserId}
        onChange={handleChangeComposeValue}
      >
        <option value="">-</option>
        {userList.map(user => (
          <option key={user.id} value={user.id}>
            {user.name || `匿名(${user._user_id.slice(0, 2)})`}
          </option>
        ))}
      </select>
      <textarea
        name="text"
        ref={inputRef}
        placeholder="今なにしてる？"
        rows={4}
        value={composeValue.text}
        onChange={e => setComposeValue(prev => ({...prev, text: e.target.value}))}
      />
      <input type="submit" onClick={(e) => {e.preventDefault();setSend(true);}} value="send" />
    </form>
  );
};
