import {end_point, Text, User} from "./Api";
import React, {useEffect, useState} from "react";
import {Log} from "./Log";
import styled from "styled-components";
import {composeHeight} from "./Compose";

export const Logs = ({
  name,
  query,
  userMap,
  loadLogTrigger,
} : {
  name: string,
  query: string,
  userMap: Record<string, User>,
  loadLogTrigger?: number,
}) => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [limit, setLimit] = useState(20);
  // TODO: 命名…
  const [loadLogTrigger2, setLoadLogTrigger2] = useState(Number.MIN_SAFE_INTEGER);

  const loadLog = () => {
    fetch(`${end_point}/text/all?${query}&$limit=${limit}`)
      .then((res) => (res.json()))
      .then(setTexts);
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

  return (
    <StyledLogs>
      <StyledLogsTitle>
        {name}
      </StyledLogsTitle>
      <StyledTexts>
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

const styledLogsTitleHeight = 22;

const StyledLogsTitle = styled.div`
  height: ${styledLogsTitleHeight}px;
`;

const StyledTexts = styled.div`
  height: calc(100vh - ${composeHeight + styledLogsTitleHeight}px);
  overflow-y: auto;
`;
