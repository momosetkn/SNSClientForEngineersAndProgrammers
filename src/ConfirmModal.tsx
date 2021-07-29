import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {colors, zIndexes} from "./Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export type ConfirmModalValue = {
  title: string;
  content: string;
  action: 'delete' | 'ok';
};

type Props = {
  value: ConfirmModalValue;
  onClose: () => void;
  onAccept: () => void;
};

export const ConfirmModal = ({
  value,
  onClose,
  onAccept,
}: Props) => {
  const [open, setOpen] = useState(false);

  const acceptButtonLabel = {delete: '削除', 'ok': 'OK'}[value.action];

  useEffect(() => {
    if (!value.title && !value.content) return;
    setOpen(true);
  }, [value]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleAccept = () => {
    setOpen(false);
    onAccept();
  };

  return (
    <StyledMain enabled={open}>
      <StyledBackground/>
      <StyledImageOverlay>
        <StyledHeaderContainer>
          <div>{value.title}</div>
          <FontAwesomeIcon className="clickable ml1" icon={faTimesCircle} onClick={handleClose}/>
        </StyledHeaderContainer>
        <StyledForm>
          <div>
            {value.content}
          </div>
          <div>
            <button
              onClick={handleClose}
            >
              キャンセル
            </button>
            <button
              onClick={handleAccept}
            >
              {acceptButtonLabel}
            </button>
          </div>
        </StyledForm>
      </StyledImageOverlay>
    </StyledMain>
  );
};

const StyledMain = styled.div<{ enabled: boolean }>`
  position: absolute;
  top: 0px;
  z-index: 300;
  width: 100vw;
  display: ${x => x.enabled ? 'flex' : 'none'};
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const StyledBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${zIndexes.previewImagesBackground};
  top: 0px;
  background: gray;
  opacity: 0.5;
`;

const StyledImageOverlay = styled.div`
  z-index: ${zIndexes.settings};
  background: ${colors.background};
  padding: 16px;
  border-radius: 8px;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledForm = styled.div`
  & label {
    display: block;
    margin-top: 8px;
  }
`;
