import React, { useContext, useEffect, useMemo } from 'react';
import { useState } from "react";
import { User, Text, end_point } from "./Api";
import { faReply, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import styled from "styled-components";
import { ComposeContext, ImageMapContext } from "./MainPage";

export const Log = ({
  text,
  userMap,
  onClose,
}: {
  text: Text;
  userMap: Record<string, User>,
  onClose?: () => void
}) => {
  const [updateTimeTrigger, setUpdateTimeTrigger] = useState(Number.MIN_SAFE_INTEGER);
  const [replyDestination, setReplyDestination] = useState<{
    text?: Text;
    open: boolean;
  }>({open: false});

  const { composeValue, setComposeValue } = useContext(ComposeContext);
  const imageMap = useContext(ImageMapContext);

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
  };

  const handleReplyTo = (x: { textId: string, userId: string }) => {
    setComposeValue({...composeValue, replyToTextId: x.textId,  replyToUserId: x.userId})
  };

  return (
    <StyledMain>
      <StyledMeta>
        <div
          title={userMap[text._user_id]?.description || text._user_id}>
          {getUser(text._user_id)}
        </div>
        <div>
          <time dateTime={time.time} title={time.localizedTime}>
            {time.timeDiff}
          </time>
          {onClose ?
            <FontAwesomeIcon className="clickable ml1" icon={faTimesCircle} onClick={onClose}/>
            : null
          }
        </div>
      </StyledMeta>
      <div>
        <div
          onClick={async () => {
            if(!text.in_reply_to_text_id) return;
            if(replyDestination.text){
              setReplyDestination(prev => ({
                ...prev,
                open: true,
              }))
              return;
            }
            await fetch(`${end_point}/text/${text.in_reply_to_text_id}`)
              .then((res) => (res.json()))
              .then(x => {
                setReplyDestination({
                  text: x,
                  open: true,
                })
              });
          }
        }
          >
          {text.in_reply_to_text_id ? `ReplyTo: ${text.in_reply_to_text_id} `: ''}
        </div>
        <div>
          {text.in_reply_to_user_id ? `@${getUser(text.in_reply_to_user_id)} `: ''}
        </div>
        <StyledText>
          {text.text}
        </StyledText>
      </div>
      {imageMap[text.id] ?
        <div>
          <img src={imageMap[text.id].base64} alt={text.text} />.
        </div>
        : null
      }
      <div className="flex mt1">
        <FontAwesomeIcon
          className="clickable"
          icon={faReply}
          title="reply"
          onClick={() => handleReplyTo({textId: text.id, userId: text._user_id})}
        />
      </div>
      {
        replyDestination.open && replyDestination.text?
          (
            <StyledReplyDestinationText
              x={onClose ? 0 : 8}
              y={16}
            >
              <Log
                text={replyDestination.text}
                userMap={userMap}
                onClose={() => setReplyDestination(prev => ({...prev, open: false}))}
              />
            </StyledReplyDestinationText>
          )
          : null
      }
    </StyledMain>
  );
};

const StyledMain = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
`;

const StyledMeta = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledText = styled.div`
  word-wrap: break-word;
  white-space: pre-wrap;
  padding-top: 2px;
`;

const StyledReplyDestinationText = styled.div<{x: number, y: number}>`
  margin-left: ${({x}) => x}px;
  margin-top: ${({y}) => y}px;
`;
