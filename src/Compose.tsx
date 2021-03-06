import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import { User } from "./Api";
import {ComposeValue, ImageMapContext, initialComposeValue} from "./MainPage";
import {faCog, faPaperPlane, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { DragDropOverlay } from "./DragDropOverlay";
import {asyncConvertBase64} from "./Util";

export const composeHeight = 100;

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
  const [sendStatus, setSendStatus] = useState<'waiting' | 'send' | 'sending'>('waiting');

  const { fireNotificationContent, openSettingsOverlay } =  useContext(ImageMapContext);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyup = useCallback((e: KeyboardEvent) => {
    // Ctrl + Enterで送信
    if (e.ctrlKey && e.key === 'Enter' && sendStatus === 'waiting') {
      // ここで送信処理はせず、sendフラグの変更をuseEffectで察知させて、送ることで、古いデータを送らないようにする
      setSendStatus('send');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropFiles = async (files: File[]) => {
    await Promise.all(files.map(async (file) => {
      const base64 = await asyncConvertBase64(file);
      if (!base64) {
        console.error('画像が大きすぎます');
        fireNotificationContent({text: '画像が大きすぎます', type: "error"});
      }
    }));
    onChange({...value, files: [...(value.files || []), ...files]});
  };

  useEffect(() => {
    (async () => {
      if (sendStatus === 'send' && value.text.trim()) {
        // 他と競合して、同時に発火するのを防ぐため、一番先に実行されたものはステータスを変更しておく。
        setSendStatus('sending');
        try {
          await onSubmit(value);
          onChange(initialComposeValue);
        } catch (e) {
          fireNotificationContent({text: 'エラー発生'});
          console.error(e);
        } finally {
          setSendStatus('waiting');
        }
      }
    })();
  }, [sendStatus, value, onChange, onSubmit, fireNotificationContent]);

  useEffect(() => {
    if (inputRef.current) {
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

  const loading = sendStatus !== 'waiting';

  return (
    <StyledMain>
      <StyledForm>
        <div className="flex">
          <input
            type="text"
            name="replyToTextId"
            placeholder="ツイートへの返信"
            value={value.replyToTextId}
            onChange={handleChangeComposeValue}
            disabled={loading}
          />
          <select
            name="replyToUserId"
            value={value.replyToUserId}
            onChange={handleChangeComposeValue}
            disabled={loading}
          >
            <option value="">-</option>
            {userList.map(user => (
              <option key={user.id} value={user.id}>
                {user.name || `匿名(${user._user_id.slice(0, 2)})`}
              </option>
            ))}
          </select>
          <StyledTextCounter error={value.text.trim().length > 280}>
            {`${value.text.trim().length}/280`}
          </StyledTextCounter>
        </div>
        <div className="flex">
          <textarea
            name="text"
            ref={inputRef}
            placeholder="今なにしてる？"
            rows={4}
            cols={50}
            value={value.text}
            onChange={e => onChange({...value, text: e.target.value})}
            disabled={loading}
          />
          <FontAwesomeIcon
            className={!loading ? 'clickable' : ''}
            icon={faPaperPlane}
            title="post"
            onClick={(e) => {e.preventDefault();!loading && setSendStatus('send');}}
          />
          <div>
            {value.files?.map((file, index) => (
              <div key={file.name}>
                {`${file.name}(${Math.floor(file.size / 1024)}kb)`}
                <FontAwesomeIcon
                  className="clickable ml1"
                  icon={faTimesCircle}
                  onClick={() => onChange({...value, files: value.files?.filter((_, i) => i !== index)})}
                />
              </div>
            ))}
          </div>
        </div>
      </StyledForm>
      <FontAwesomeIcon className="clickable ml1" icon={faCog} onClick={() => openSettingsOverlay()}/>
      <DragDropOverlay onDropFiles={handleDropFiles}/>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  height: ${composeHeight}px;
  display: flex;
`;

const StyledForm = styled.form`
  width: 500px;
`;

const StyledTextCounter = styled.div<{error: boolean}>`
  color: ${(x) => x.error ? 'red': 'black'};
`;
