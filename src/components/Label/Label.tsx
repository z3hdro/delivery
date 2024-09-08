import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { useStyles } from './Label.styles';
import { Props } from './Label.types';

export const Label: FC<Props> = ({ qty, style = {}, textStyle = {} }) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{qty}</Text>
    </View>
  )
}
