import {end_point, httpToJson, Text} from "./Api";
import React, {useEffect, useState} from "react";
import {Log} from "./Log";
import styled from "styled-components";
import {composeHeight} from "./Compose";
import {PainValue} from "./MainPage";

const titleHeaderHeight = 22;

export const Logs = ({
  value,
  onChangePainValue,
  loadLogTrigger,
} : {
  value: PainValue,
  onChangePainValue: (value: PainValue) => void,
  loadLogTrigger?: number,
}) => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [limit, setLimit] = useState(20);
  const [pollingIntervalTime, setPollingIntervalTime] = useState(20);
  const [editingPainValue, setEditingPainValue] = useState(value);
  // Logs個別のトリガー
  const [internalLoadLogTrigger, setInternalLoadLogTrigger] = useState(Number.MIN_SAFE_INTEGER);
  const [openTitle, setOpenTitle] = useState(false);

  const titleHeight = (openTitle ? 300 : 0 ) + titleHeaderHeight;

  const loadLog = () => {
    fetch(`${end_point}/text/all?${value.query}&$limit=${limit}`)
      .then(httpToJson)
      .then(setTexts).catch(console.error);
  };

  const handleClickLoadMore = () => {
    setLimit(prev => prev + 20);
  };

  useEffect(() => {
    const id = setInterval(() => setInternalLoadLogTrigger(prev => prev + 1), pollingIntervalTime * 1_000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollingIntervalTime]);

  useEffect(() => loadLog(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadLogTrigger, internalLoadLogTrigger, limit]);

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
          onClick={() => {
            setOpenTitle(prev => !prev);
          }}
        >
          {value.name}
        </StyledTitleHeader>
        <StyledForm className="p2">
          <div>
            <label htmlFor="Logs_name">name</label>
            <input
              name="name"
              id="Logs_name"
              type="text"
              value={editingPainValue.name}
              onChange={e => {
                setEditingPainValue(prev => ({...prev, name: e.target.value}));
              }}
              onBlur={() => onChangePainValue(editingPainValue)}
            />
          </div>
          <div>
            <label htmlFor="Logs_query">query</label>
            <textarea
              name="query"
              id="Logs_query"
              cols={30}
              rows={5}
              value={editingPainValue.query}
              onChange={e => {
                setEditingPainValue(prev => ({...prev, query: e.target.value}));
              }}
              onBlur={() => onChangePainValue(editingPainValue)}
            />
          </div>
          <div>
            <label htmlFor="Logs_limit">limit</label>
            <input
              name="limit"
              id="Logs_limit"
              type="number"
              value={limit}
              onChange={e => setLimit(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="Logs_polling_interval_time">polling interval time</label>
            <input
              name="polling_interval_time"
              id="Logs_polling_interval_time"
              type="number"
              value={pollingIntervalTime}
              onChange={e => setPollingIntervalTime(Number(e.target.value))}
            />
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

const StyledLogs = styled.div`
  width: 320px;
`;

const StyledLogsTitle = styled.div<{titleHeight: number}>`
  height: ${(x) => x.titleHeight}px;
  overflow: hidden;
  transition: all 300ms 0s ease;
`;

const StyledTitleHeader = styled.div`
  height: ${titleHeaderHeight}px;
`;

const StyledForm = styled.div`
  & label {
    display: block;
    margin-top: 8px;
  }
`;

const StyledTexts = styled.div<{titleHeight: number}>`
  height: calc(100vh - ${(x) => composeHeight + x.titleHeight}px);
  overflow-y: auto;
`;
