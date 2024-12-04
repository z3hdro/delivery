import { TextStyle, ViewStyle } from 'react-native';

import { NavigationState, SceneRendererProps } from 'react-native-tab-view';
import { Ref } from 'react';

export type Route = {
  index: number;
  key: string;
  title?: string;
  screen: JSX.Element;
};

export type TabBarRef = {
  switchTab: (index: number) => void;
  getCurrentIndex: () => number;
}

export type TabBarRoutes = {
  tabBarRef: Ref<TabBarRef>
  firstScreen: JSX.Element;
  secondScreen: JSX.Element;
  firstLabel: string;
  secondLabel: string;
  thirdScreen?: JSX.Element;
  thirdLabel?: string;
  fourthScreen?: JSX.Element;
  fourthLabel?: string;
  tabsContainerStyle?: ViewStyle;
  labelTextStyle?: TextStyle;
  tabStyle?: ViewStyle;
  displayIcons?: boolean;
};

export type RenderTabBarProps = SceneRendererProps & {
  navigationState: NavigationState<Route>;
};
