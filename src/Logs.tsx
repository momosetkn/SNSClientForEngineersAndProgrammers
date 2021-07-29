import {end_point, httpToJson, Text} from "./Api";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {Log} from "./Log";
import styled from "styled-components";
import {composeHeight} from "./Compose";
import {ImageMapContext, PainValue} from "./MainPage";
import {eq} from "./Util";
import {colors} from "./Constants";

const titleHeaderHeight = 22;

export const Logs = ({
  value,
  onChangePain,
  loadLogTrigger,
} : {
  value: PainValue,
  onChangePain: (value?: PainValue) => void,
  loadLogTrigger?: number,
}) => {
  const {fireConfirmModal} = useContext(ImageMapContext)

  const [texts, setTexts] = useState<Text[]>([]);
  const [editingPainValue, setEditingPainValue] = useState(value);
  // Logs個別のトリガー
  const [internalLoadLogTrigger, setInternalLoadLogTrigger] = useState(Number.MIN_SAFE_INTEGER);
  const [openTitle, setOpenTitle] = useState(false);

  const titleHeight = (openTitle ? 300 : 0 ) + titleHeaderHeight;

  const handleClickLoadMore = () => {
    onChangePain({...value, limit: value.limit + 20});
  };

  const loadLog = () => setInternalLoadLogTrigger(p => p + 1);

  const handleClickTitleHeader = () => {
    setOpenTitle(prev => !prev);
    if (!eq(editingPainValue, value)) onChangePain(editingPainValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditingPainValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  };

  const handleChangeInt = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditingPainValue((prev) => ({
      ...prev,
      [event.target.name]: parseInt(event.target.value),
    }))
  };

  const handleClickDeleteButton = async () => {
    const result: boolean = await fireConfirmModal({title: '', content: 'このペインを削除しますか？', action: 'delete'});
    if (result) onChangePain();
  };

  useEffect(() => {
    const id = setInterval(() => setInternalLoadLogTrigger(prev => prev + 1),
      (editingPainValue.pollingIntervalTime || 1) * 1_000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingPainValue.pollingIntervalTime]);

  useEffect(() => {
    const q = encodeURI(editingPainValue.query.trim().replaceAll('\n', ''));
    fetch(`${end_point}/text/all?${q}&$limit=${editingPainValue.limit}`)
      .then(httpToJson)
      .then(setTexts).catch(console.error);
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadLogTrigger, internalLoadLogTrigger]);

  useEffect(() => setEditingPainValue(value),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]);

  return (
    <StyledLogs>
      <StyledLogsTitle
        titleHeight={titleHeight}
      >
        <StyledTitleHeader
          className="clickable"
          onClick={handleClickTitleHeader}
        >
          {value.name}
        </StyledTitleHeader>
        <StyledForm>
          <div>
            <label htmlFor={`${value.name}_Logs_name`}>name</label>
            <input
              name="name"
              id={`${value.name}_Logs_name`}
              type="text"
              value={editingPainValue.name}
              onChange={handleChange}
              onBlur={loadLog}
            />
          </div>
          <div>
            <label htmlFor={`${value.name}_Logs_query`}>query</label>
            <textarea
              name="query"
              id={`${value.name}_Logs_query`}
              cols={30}
              rows={5}
              value={editingPainValue.query}
              onChange={handleChange}
              onBlur={loadLog}
            />
          </div>
          <div>
            <label htmlFor={`${value.name}_Logs_limit`}>limit</label>
            <input
              name="limit"
              id={`${value.name}_Logs_limit`}
              type="number"
              value={editingPainValue.limit}
              onChange={handleChangeInt}
              onBlur={loadLog}
            />
          </div>
          <div>
            <label htmlFor={`${value.name}_Logs_pollingIntervalTime`}>polling interval time</label>
            <input
              name="pollingIntervalTime"
              id={`${value.name}_Logs_pollingIntervalTime`}
              type="number"
              value={editingPainValue.pollingIntervalTime}
              onChange={handleChangeInt}
              onBlur={loadLog}
            />
          </div>
          <div>
            <button className="mt1" onClick={handleClickDeleteButton}>削除</button>
          </div>
        </StyledForm>
      </StyledLogsTitle>
      <StyledTexts titleHeight={titleHeight}>
        {texts.map(text => (
          <Log
            key={text.id}
            text={text}
          />
        ))}
        <div className="clickable" onClick={handleClickLoadMore}>load more</div>
      </StyledTexts>
    </StyledLogs>
  );
}

const margin = 8;

const StyledLogs = styled.div`
  width: 320px;
  margin: ${margin}px 0 ${margin}px ${margin}px;
  border: 1px solid ${colors.border};
`;

const StyledLogsTitle = styled.div<{titleHeight: number}>`
  height: ${(x) => x.titleHeight}px;
  overflow: hidden;
  transition: all 300ms 0s ease;
  border-bottom: 1px solid ${colors.border};
`;

const StyledTitleHeader = styled.div`
  height: ${titleHeaderHeight}px;
`;

const StyledForm = styled.div`
  padding: 8px 16px 16px 16px;
  & label {
    display: block;
    margin-top: 8px;
  }
`;

const StyledTexts = styled.div<{titleHeight: number}>`
  // margin上下とborder1px上下
  height: calc(100vh - ${(x) => composeHeight + x.titleHeight + (margin + 1) * 2}px);
  overflow-y: auto;
  ::-webkit-scrollbar{
    width: 8px;
  }
  ::-webkit-scrollbar-track{
    background: ${colors.background};
    border: none;
    // box-shadow: inset 0 0 2px #777; 
  }
  ::-webkit-scrollbar-thumb{
    background: ${colors.border};
    box-shadow: none;
  }
`;
