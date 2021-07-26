import React, { ChangeEvent, useContext, useEffect, useMemo } from 'react';
import { useState } from "react";
import {Text, end_point, uploadImages, Like} from "./Api";
import {faHeart, faImages, faReply, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import styled from "styled-components";
import {
  ComposeContext,
  ImageMapContext,
  LoadImagesContext,
  SetPreviewImagesContext
} from "./MainPage";

export const Log = ({
  text,
  onClose,
}: {
  text: Text;
  onClose?: () => void
}) => {
  const [updateTimeTrigger, setUpdateTimeTrigger] = useState(Number.MIN_SAFE_INTEGER);
  const [replyDestination, setReplyDestination] = useState<{
    text?: Text;
    open: boolean;
  }>({open: false});
  const [likeCount, setLikeCount] = useState(0);

  const { composeValue, setComposeValue } = useContext(ComposeContext);
  const {imageMap, likeMap, userMap} = useContext(ImageMapContext);
  const loadImages = useContext(LoadImagesContext);
  const setPreviewImages = useContext(SetPreviewImagesContext);

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

  useEffect(() => {
    setLikeCount(likeMap[text.id]?.like_count || 0);
  }, [likeMap, text.id]);

  const getUser = (userId: string) => {
    return userMap[userId]?.name || `匿名(${userId.slice(0, 2)})`;
  };

  const handleReplyTo = (x: { textId: string, userId: string }) => {
    setComposeValue({...composeValue, replyToTextId: x.textId,  replyToUserId: x.userId})
  };

  const handleClickFavorite = async ({textId}: { textId: string }) => {
    const like: Like | undefined = await fetch(`${end_point}/like/${textId}`)
      .then((res) => res.json()).catch(err => {
        if (err?.response?.status === 404) {
          // 0件なので無視
        } else {
          throw err;
        }
      });

    const nextLikeCount = (like?.like_count || 0) + 1;
    const params = {
      like_count: nextLikeCount
    };
    await fetch(`${end_point}/like/${textId}`, {
      method: "PUT",
      headers: {Authorization: "LOVE"},
      body: JSON.stringify(params),
    }).then((res) => res.json())
      .then((_) => {
        setLikeCount(nextLikeCount);
      });
  };

  const handleChangeImageFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    await uploadImages({files: e.target.files, bindTextId: text.id});

    loadImages();
  };

  const handleClickReply = async () => {
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
        <StyledReplyTo onClick={handleClickReply} >
          {text.in_reply_to_text_id ? `To: ${text.in_reply_to_text_id} `: ''}
        </StyledReplyTo>
        <div>
          {text.in_reply_to_user_id ? `@${getUser(text.in_reply_to_user_id)} `: ''}
        </div>
        <StyledText>
          {text.text}
        </StyledText>
      </div>
      {imageMap[text.id]?.length ?
        imageMap[text.id].map((image, index) => (
          <div key={image.id}>
            <StyledImg
              className="clickable"
              src={image.base64}
              alt={`${getUser(text._user_id)}さんが貼り付けた画像`}
              title={`${getUser(image._user_id)}さんが貼り付けた画像`}
              onClick={() => setPreviewImages({images: imageMap[text.id].map(x => x.base64), index})}
            />
          </div>
        ))
        : null
      }
      <div className="flex mt1">
        <FontAwesomeIcon
          className="clickable"
          icon={faReply}
          title="reply"
          onClick={() => handleReplyTo({textId: text.id, userId: text._user_id})}
        />
        <FontAwesomeIcon
          className="clickable ml2"
          icon={faHeart}
          title="favorite"
          onClick={() => handleClickFavorite({textId: text.id})}
        />
        {likeCount}
        <label htmlFor={`image_upload_${text.id}`}>
          <FontAwesomeIcon
            className="clickable ml2"
            icon={faImages}
            title="images"
          />
          <input
            id={`image_upload_${text.id}`}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleChangeImageFile}
          />
        </label>
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

const StyledReplyTo = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledText = styled.div`
  word-wrap: break-word;
  white-space: pre-wrap;
  padding-top: 2px;
`;

const StyledImg = styled.img`
  width: 100%;
`;

const StyledReplyDestinationText = styled.div<{x: number, y: number}>`
  margin-left: ${({x}) => x}px;
  margin-top: ${({y}) => y}px;
`;
