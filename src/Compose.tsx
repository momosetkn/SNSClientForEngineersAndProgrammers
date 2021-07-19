import React, { useEffect, useRef, useState } from "react";
import { User } from "./Api";
import { ComposeValue, initialComposeValue } from "./MainPage";

export const Compose = ({
  value,
  onChange,
  onSubmit,
  userList
}: {
  value: ComposeValue,
  onChange: (value: ComposeValue) => void,
  onSubmit: (value: ComposeValue) => void;
  userList: User[]
}) => {
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
      if (send && value.text.trim()) {
        setSend(false);
        onSubmit(value);
        onChange(initialComposeValue);
      }
    })();
  }, [send, value, onChange, onSubmit]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keydown", handleKeydown, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef.current]);

  const handleChangeComposeValue = (event: any) => {
    onChange({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <input
        type="text"
        name="replyToTextId"
        placeholder="ツイートへの返信"
        value={value.replyToTextId}
        onChange={handleChangeComposeValue}
      />
      <select
        name="replyToUserId"
        value={value.replyToUserId}
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
        value={value.text}
        onChange={e => onChange({...value, text: e.target.value})}
      />
      <input type="submit" onClick={(e) => {e.preventDefault();setSend(true);}} value="send" />
    </form>
  );
};
