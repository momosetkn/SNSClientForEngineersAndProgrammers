import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {zIndexes} from "./Constants";

export const PreviewImagesOverlay = ({open, onClose, images, index}: {open: boolean; onClose: () => void; images: string[], index: number}) => {
  const [viewingIndex, setViewingIndex] = useState(index);
  const [imageSize, setImageSize] = useState<{width: number, height: number} | undefined>();
  const [keyup, setKeyup] = useState<string | undefined>();
  const [offsetX, setOffsetX] = useState<number>(0);
  const imgElementRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setViewingIndex(index);
  }, [index]);

  useEffect(() => {
    if (keyup === 'Escape') {
      onClose();
    } else if (keyup === 'ArrowLeft') {
      setViewingIndex(prev => Math.max(prev - 1, 0));
    } else if (keyup === 'ArrowRight') {
      setViewingIndex(prev => Math.min(prev + 1, images.length - 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyup, setViewingIndex]);

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      e.preventDefault();
      setKeyup(e.key);
    };
    document.addEventListener('keyup', handleKeyup, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageSrc = images[viewingIndex];

  useEffect(() => {
    if(imgElementRef.current && imgElementRef.current.complete ){
      setImageSize({
        width: imgElementRef.current.naturalWidth,
        height: imgElementRef.current.naturalHeight,
      });
    } else {
      setImageSize(undefined);
    }
  }, [imageSrc, imgElementRef.current?.complete]);

  useEffect(() => {
    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.style.overflow = open ? 'hidden' : 'initial';
    if(open){
      setOffsetX(window.pageXOffset);
    }
  }, [open]);

  return (
    <>
      {open ?
        <StyledMain left={offsetX}>
          <StyledBackground onClick={() => onClose()} />
          <StyledImageOverlay>
            <img ref={imgElementRef} src={imageSrc} {...imageSize}  alt="画像" />
            {images.length > 0 &&
              <StyledPoints>
                {[...Array(images.length)].map((_, i) => (
                  <StyledPoint key={i} current={i === viewingIndex} />
                ))}
              </StyledPoints>
            }
          </StyledImageOverlay>
        </StyledMain>
        : null
      }
    </>
  );
};

const StyledMain = styled.div<{left: number}>`
  position: absolute;
  top: 0px;
  z-index: 300;
  width: 100vw;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  left: ${(x) => x.left}px;
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
  z-index: ${zIndexes.previewImages};
`;

const StyledPoints = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPoint = styled.div<{current: boolean}>`
  height: 30px;
  width: 12px;
  color: ${(x) => x.current ? 'black' : '#ccc'};
  ::after {
    content: '●';
  }
`;
