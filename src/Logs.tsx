import {end_point, httpToJson, Text, User} from "./Api";
import React, {useEffect, useState} from "react";
import {Log} from "./Log";
import styled from "styled-components";
import {composeHeight} from "./Compose";
import {PainValue} from "./MainPage";

const titleHeaderHeight = 22;

export const Logs = ({
  value,
  userMap,
  onChangePainValue,
  loadLogTrigger,
} : {
  value: PainValue,
  userMap: Record<string, User>,
  onChangePainValue: (value: PainValue) => void,
  loadLogTrigger?: number,
}) => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [limit, setLimit] = useState(20);
  const [editingPainValue, setEditingPainValue] = useState(value);
  // TODO: 命名…
  const [loadLogTrigger2, setLoadLogTrigger2] = useState(Number.MIN_SAFE_INTEGER);
  const [openTitle, setOpenTitle] = useState(false);

  const titleHeight = (openTitle ? 200 : 0 ) + titleHeaderHeight;

  const loadLog = () => {
    fetch(`${end_point}/text/all?${value.query}&$limit=${limit}`)
      .then(httpToJson)
      .then(setTexts).catch(console.error);
  };

  const handleClickLoadMore = () => {
    setLimit(prev => prev + 20);
  };

  useEffect(() => {
    setInterval(() => setLoadLogTrigger2(prev => prev + 1), 10_000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => loadLog(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadLogTrigger, loadLogTrigger2, limit]);

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
        <div>
          <form>
            <div>
              <input
                name="name"
                type="text"
                value={editingPainValue.name}
                onChange={e => {
                  setEditingPainValue(prev => ({...prev, name: e.target.value}));
                }}
                onBlur={() => onChangePainValue(editingPainValue)}
              />
            </div>
            <div>
              <textarea
                name="query"
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
              <input
                name="limit"
                type="number"
                value={limit}
                onChange={e => setLimit(Number(e.target.value))}
              />
            </div>
          </form>
        </div>
      </StyledLogsTitle>
      <StyledTexts titleHeight={titleHeight}>
        {texts.map(text => (
          <Log
            key={text.id}
            text={text}
            userMap={userMap}
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
`;

const StyledTitleHeader = styled.div`
  height: ${titleHeaderHeight}px;
`;

const StyledTexts = styled.div<{titleHeight: number}>`
  height: calc(100vh - ${(x) => composeHeight + x.titleHeight}px);
  overflow-y: auto;
`;
