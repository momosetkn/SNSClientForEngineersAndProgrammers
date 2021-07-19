import React, { useEffect, useMemo } from 'react';
import { useState } from "react";
import { User, Text } from "./Api";
import styled from "styled-components";

export const Log = ({
  text,
  userMap,
  onReplyTo
}: {
  text: Text;
  userMap: Record<string, User>,
  onReplyTo: (value:{textId: string; userId: string}) => void
}) => {
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
        <div>
          {text.in_reply_to_text_id ? `ReplyTo: ${text.in_reply_to_text_id} `: ''}
        </div>
        <div>
          {text.in_reply_to_user_id ? `@${getUser(text.in_reply_to_user_id)} `: ''}
        </div>
        <pre>
          {text.text}
        </pre>
      </div>
      <StyledControlContainer>
        <button onClick={() => onReplyTo({textId: text.id, userId: text._user_id})}>↩</button>
      </StyledControlContainer>
    </div>
  );
};

const StyledControlContainer = styled.div`
  display: flex;
`;

