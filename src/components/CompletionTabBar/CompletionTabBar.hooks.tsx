import { useMemo } from 'react';
import { ROUTE_KEYS } from './CompletionTabBar.consts';
import { Route } from './CompletionTabBar.types';

export const useTabRoutes = (
  firstScreen: JSX.Element,
  secondScreen: JSX.Element,
  firstLabel: string,
  secondLabel: string,
  thirdScreen?: JSX.Element,
  thirdLabel?: string,
  fourthScreen?: JSX.Element,
  fourthLabel?: string,
): Array<Route> => {
  return useMemo<Array<Route>>(() => {
    const items = [
      {
        key: ROUTE_KEYS.FIRST,
        screen: firstScreen,
        title: firstLabel,
      },
      {
        key: ROUTE_KEYS.SECOND,
        screen: secondScreen,
        title: secondLabel,
      },
    ];

    if (thirdScreen) {
      items.push({
        key: ROUTE_KEYS.THIRD,
        screen: thirdScreen,
        title: thirdLabel ?? '',
      });
    }

    if (fourthScreen) {
      items.push({
        key: ROUTE_KEYS.FOURTH,
        screen: fourthScreen,
        title: fourthLabel ?? '',
      });
    }

    return items.map((item, index) => ({ ...item, index }));
  }, [firstScreen, firstLabel, secondScreen, secondLabel, thirdScreen, thirdLabel, fourthScreen, fourthLabel]);
};
