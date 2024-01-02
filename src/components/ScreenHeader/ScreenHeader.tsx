import React, { FC, useCallback } from 'react';
import { View, Text } from 'react-native';

import { useStyles } from './ScreenHeader.styles';
import { Props } from './ScreenHeader.types';

export const ScreenHeader: FC<Props> = ({ leftPart, title, rightPart, style }) => {
  const styles = useStyles();

  const renderLeftIcon = useCallback(() => {
    return leftPart ? (
      <View>
        {leftPart}
      </View>
    ) : <View style={styles.empty} />;
  }, [leftPart, styles]);

  const renderRightIcon = useCallback(() => {
    return rightPart ? (
      <View>
        {rightPart}
      </View>
    ) : <View style={styles.empty} />;
  }, [rightPart, styles]);

  return (
    <View style={[styles.container, style]}>
      {renderLeftIcon()}
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
      )}
      {renderRightIcon()}
    </View>
  );
};