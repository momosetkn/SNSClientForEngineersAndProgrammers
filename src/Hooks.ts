import {useEffect, useState} from "react";

export const useDocumentKeyboardEventCallback = (type: keyof DocumentEventMap, eventHandler: (e: KeyboardEvent) => void) => {
  const [trigger, setTrigger] = useState<{count: number, event?: KeyboardEvent}>({count: Number.MIN_SAFE_INTEGER});
  useEffect(() => {
    const handleKeyup = (event: KeyboardEvent) => {
      event.preventDefault();
      setTrigger(prev => ({count: prev.count + 1, event}));
    };
    // @ts-ignore
    document.addEventListener(type, handleKeyup, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(!trigger.event) return;

    eventHandler(trigger.event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger.count]);
};
