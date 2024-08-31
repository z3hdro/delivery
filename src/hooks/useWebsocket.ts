import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

export const useWebSocket = (websocketUrl: string) => {
  const isLoading = useRef<boolean>(true);
  const ws = useRef<WebSocket | undefined>();
  const appState = useRef(AppState.currentState);

  const handleMessage = (e: MessageEvent) => {
    console.log('e: ', e);
    // do something useful here
  };

  const attemptConnection = useCallback(
    (count: number = 0) => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        return;
      }

      ws.current = new WebSocket(websocketUrl);

      ws.current.onopen = () => {
        console.log('ws opened');
        isLoading.current = true;
      };
      ws.current.onerror = (e) => {
        console.log('ws error', e);
      };

      ws.current.onclose = () => {
        console.log('ws closed', appState.current);
        if (appState.current === 'active' && count < 5) {
          attemptConnection(count + 1);
        }
      };

      ws.current.onmessage = handleMessage;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [websocketUrl, appState.current],
  );

  useEffect(() => {
    if (isLoading.current) {
      attemptConnection(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptConnection, isLoading.current]);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change',  nextAppState => {
      console.log('j 1');
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' && isLoading.current
      ) {
        console.log('j 2');
        attemptConnection(0);
      } else if (appState.current === 'active' && (nextAppState === 'inactive' || nextAppState === 'background')) {
        ws.current?.close();
        ws.current = undefined;
      }
      appState.current = nextAppState;
    });

    return () => {
      appStateSubscription.remove();
      ws.current?.close();
      ws.current = undefined;
    };
  }, [attemptConnection]);

  return { isLoading: isLoading.current, };
};
