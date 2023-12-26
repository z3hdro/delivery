import React, { FC } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { colors } from 'constants/colors';
import { createStyles } from './BottomTab.styles';

export const BottomTab: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();

  const styles = createStyles(bottom);

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            accessible={false}
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={styles.tabContainer}>
              <View style={styles.content}>
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: isFocused ? colors.red : colors.color7,
                    size: 15,
                  })}
                <Text
                  style={[
                    styles.labelText,
                    isFocused ? styles.labelFocused : styles.labelBlur
                  ]}>
                  {label as string}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};
