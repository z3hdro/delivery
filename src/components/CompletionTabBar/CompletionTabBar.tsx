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
import { PointMarkerIcon, RecyclingTimeIcon, TrackFilledIcon, TrackFinishedIcon } from 'assets/icons';

export const CompletionTabBar: React.FC<TabBarRoutes> = ({
  tabsContainerStyle,
  firstScreen,
  secondScreen,
  thirdScreen,
  fourthScreen,
  firstLabel,
  secondLabel,
  thirdLabel,
  fourthLabel,
  labelTextStyle,
  tabStyle,
  displayIcons = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const routes = useTabRoutes(
    firstScreen,
    secondScreen,
    firstLabel,
    secondLabel,
    thirdScreen,
    thirdLabel,
    fourthScreen,
    fourthLabel,
  );
  const styles = useStyles();

  const renderIcon = useCallback((index: number, isActive: boolean) => {
    const color = isActive ? colors.white : colors.color7;

    switch (index) {
      case 0:
        return <RecyclingTimeIcon width={27} height={27} color={color} />;
      case 1:
        return <TrackFilledIcon width={34} height={25} color={color} />;
      case 2:
        return <PointMarkerIcon width={18} height={26} color={color} />;
      case 3:
        return <TrackFinishedIcon width={37} height={29} color={color} />;
      default:
        return null;
    }
  }, []);

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
                && styles.tabItemActive,
                tabStyle,
              ]}
              renderLabel={({
                route: { title },
                focused,
              }) => displayIcons ?
                renderIcon(tabItemProps.route.index, tabItemProps.route.index === currentIndex)
                : <Text style={[styles.tabText, focused && styles.tabTextActive, labelTextStyle]}>
                  {title}
                </Text>}
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
