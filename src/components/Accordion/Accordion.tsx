import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useStyles } from './Accordion.styles';
import { Props } from './Accordion.types';
import { colors } from 'constants/colors';

import { ArrowDownCircleIcon, ArrowUpCircleIcon } from 'assets/images';

export const Accordion: FC<Props> = ({
  label,
  isExpanded,
  onPress,
  content,
  disabled = false,
  style,
}) => {
  const styles = useStyles();

  return (
    <View style={[styles.container, isExpanded && styles.expandedContainer, style]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => onPress(!isExpanded)}
        style={styles.labelContainer}>
        <Text style={[styles.labelText, disabled && styles.disabledLabelText]}>
          {label}
        </Text>
        {isExpanded ? (
          <ArrowDownCircleIcon
            height={20}
            width={20}
            color={disabled ? colors.color5 : colors.red}
          />
        ) : (
          <ArrowUpCircleIcon
            height={20}
            width={20}
            color={disabled ? colors.color5 : colors.red}
          />
        )}
      </TouchableOpacity>
      {isExpanded && content}
    </View>
  );
};