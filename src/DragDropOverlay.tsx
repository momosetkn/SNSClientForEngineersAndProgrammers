import styled from "styled-components";
import {useEffect, useState} from "react";

export const DragDropOverlay = ({onDropFile}:{onDropFile: (file: File) => void}) => {
  const [drag, setDrag] = useState(false);
  // addEventListenerを都度貼り替えるのが面倒なため、state経由でuseEffectを発火させ、onDropFileさせる
  const [file, setFile] = useState<File | undefined>();

  useEffect(() => {
    if(file){
      onDropFile(file);
      setFile(undefined);
    }
  }, [file, onDropFile]);

  useEffect(() => {
    const handleDrop =  (ev: any) => {
      setDrag(false);
      ev.preventDefault();

      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === 'file') {
            const file = ev.dataTransfer.items[i].getAsFile();
            setFile(file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
          console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
      }
    };

    const dragEnterHandler = (ev: any) =>  {
      ev.preventDefault();
      setDrag(true);
    };

    const dragOverHandler = (ev: any) =>  ev.preventDefault();

    const handleDragLeave = (ev: any) =>  {
      ev.preventDefault();
      console.log('leave', ev);
      if (!ev.fromElement){
        setDrag(false);
      }
    };

    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragenter', dragEnterHandler);
    document.addEventListener('dragover', dragOverHandler);//kesu nokosu
    document.addEventListener('dragleave', handleDragLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledMain enabled={drag} />
  );
};

const styledDragDropOverlayMargin = 16;
const styledDragDropOverlayBorderSize = 4;

const StyledMain = styled.div<{enabled: boolean}>`
  position: absolute;
  width: calc(100vw - ${(styledDragDropOverlayMargin + styledDragDropOverlayBorderSize) * 2}px);
  height: calc(100vh - ${(styledDragDropOverlayMargin + styledDragDropOverlayBorderSize) * 2}px);
  top: 0px;
  margin: ${styledDragDropOverlayMargin}px;
  border-radius: 32px;
  background: gray;
  border: ${styledDragDropOverlayBorderSize}px dashed black;
  opacity: 0.5;
  display:   ${(x) =>  x.enabled ? 'block' : 'none'};
`;
