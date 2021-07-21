import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { end_point, User } from "./Api";
import { ComposeValue, initialComposeValue } from "./MainPage";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const composeHeight = '100px';

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

  const handleKeyup = useCallback((e: KeyboardEvent) => {
    // Ctrl + Enterで送信
    if (e.ctrlKey && e.key === 'Enter' && !send) {
      // ここで送信処理はせず、sendフラグの変更をuseEffectで察知させて、送ることで、古いデータを送らないようにする
      setSend(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      console.log('effect');
      inputRef.current.removeEventListener("keyup", handleKeyup, false);
      inputRef.current.addEventListener("keyup", handleKeyup, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef.current]);

  const handleChangeComposeValue = (event: any) => {
    onChange({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImageFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const convertBase64Promise = new Promise((r) => {
      const fr = new FileReader();
      fr.onload = (e) => {
        r(e.target?.result);
      };
      fr.readAsDataURL(file);
    });
    const convertBase64 = (await convertBase64Promise) as any as string;

    await fetch(`${end_point}/image`, {
      method: "POST",
      headers: {Authorization: "evolution"},
      body: convertBase64,
    }).then((res) => res.json()).then(x => console.log(x));
  };

  return (
    <StyledMain>
      <form>
        <div>
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
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeImageFile}
          />
        </div>
        <textarea
          name="text"
          ref={inputRef}
          placeholder="今なにしてる？"
          rows={4}
          cols={50}
          value={value.text}
          onChange={e => onChange({...value, text: e.target.value})}
        />
        <FontAwesomeIcon
          className="clickable"
          icon={faPaperPlane}
          title="post"
          onClick={(e) => {e.preventDefault();setSend(true);}}
        />
      </form>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  height: ${composeHeight};
`;