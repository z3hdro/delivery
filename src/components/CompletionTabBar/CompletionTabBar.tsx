import React, { useCallback, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';

import {
  TabBar as TabBarComponent, TabBarItem,
  TabView,
} from 'react-native-tab-view';


import { useTabRoutes } from './CompletionTabBar.hooks';
import { useStyles } from './CompletionTabBar.styles';
import {
  RenderTabBarProps,
  Route,
  TabBarRoutes,
} from './CompletionTabBar.types';
import { colors } from 'constants/colors';

export const CompletionTabBar: React.FC<TabBarRoutes> = ({
  tabsContainerStyle,
  firstScreen,
  secondScreen,
  thirdScreen,
  firstLabel,
  secondLabel,
  thirdLabel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const routes = useTabRoutes(
    firstScreen,
    secondScreen,
    firstLabel,
    secondLabel,
    thirdScreen,
    thirdLabel,
  );
  const styles = useStyles();

  const renderTabBar = (props: RenderTabBarProps) => {
    return (
      <View style={styles.tabBarContainer}>
        <TabBarComponent
          {...props}
          style={[styles.tabsContainer, tabsContainerStyle]}
          bounces={false}
          pressColor={colors.transparent}
          renderIndicator={() => null}
          renderTabBarItem={tabItemProps => (
            <TabBarItem
              {...tabItemProps}
              style={[
                styles.tabItem,
                tabItemProps.route.index === currentIndex
                && styles.tabItemActive
              ]}
              renderLabel={({
                route: { title },
                focused,
              }) => (
                <Text style={[styles.tabText, focused && styles.tabTextActive]}>
                  {title}
                </Text>
              )}
            />
          )}
        />
      </View>
    );
  };

  const renderScene = useCallback<
    (rendererProps: { route: Route }) => React.ReactNode
      >(
      ({ route }) =>
        route.index === currentIndex
          ? React.cloneElement(routes[currentIndex].screen)
          : null,
      [routes, currentIndex],
      );

  return (
    <TabView
      navigationState={{ index: currentIndex, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setCurrentIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      swipeEnabled={false}
      lazy
    />
  );
};
