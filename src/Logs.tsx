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

  const loadLog = () => {
    fetch(`${end_point}/text/all?${query}`)
      .then((res) => (res.json()))
      .then(setTexts);
  };

  useEffect(() => {
    loadLog();
    setInterval(loadLog, 10_000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => loadLog(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadLogTrigger]);

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
