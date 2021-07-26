import styled from "styled-components";
import { useEffect, useState } from "react";
import { zIndexes } from "./Constants";

export type NotificationContent = { text: string, type?: NotificationType };

type NotificationType = 'notification' | 'warning'  | 'error';
const NotificationTypeTable: Record<NotificationType, string> = {
  notification : 'black',
  warning: 'FFA500',
  error: 'red',
}

const notificationTypeMapping: (value?: NotificationType) => string = v => NotificationTypeTable[v || 'notification'];

type Props = { content?: NotificationContent };

export const NotificationBar = ({content}: Props) => {
  const [notificationMessages, setNotificationMessages] = useState<({ id: string; content: NotificationContent })[]>([]);
  const [counter, setCounter] = useState(Number.MIN_SAFE_INTEGER);

  useEffect(() => {
    if(!content) return;

    const id = counter.toString();
    setNotificationMessages(prev => [...prev, {...{content}, id}]);

    setTimeout(() => {
      setNotificationMessages(prev => prev.filter(x => x.id !== id));
    }, 50_000);
    setCounter(p => p + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <StyledMain2>
      {notificationMessages.map((notificationMessage, index) => (
        <StyledMain key={notificationMessage.id} type={notificationMessage.content?.type} >
          {notificationMessage.content.text}
        </StyledMain>
      ))}
    </StyledMain2>
  );
};

const StyledMain2 = styled.div`
  position: absolute;
  bottom: 50px;
  left: 40px;
`;

const StyledMain = styled.div<{type?: NotificationType}>`
  z-index: ${zIndexes.notificationBar};
  background: black;
  color: white;
  border-radius: 10px;
  margin-top: 16px;
  padding: 8px 16px;
  color: ${x => notificationTypeMapping(x.type)};
`;
