import { ViewStyle } from 'react-native';

import { NavigationState, SceneRendererProps } from 'react-native-tab-view';

export type Route = {
  index: number;
  key: string;
  title?: string;
  screen: JSX.Element;
};

export type TabBarRoutes = {
  firstScreen: JSX.Element;
  secondScreen: JSX.Element;
  firstLabel: string;
  secondLabel: string;
  thirdScreen?: JSX.Element;
  thirdLabel?: string;
  tabsContainerStyle?: ViewStyle;
};

export type RenderTabBarProps = SceneRendererProps & {
  navigationState: NavigationState<Route>;
};
