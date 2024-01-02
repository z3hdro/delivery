import React, { FC } from 'react';
import { View, Image, Pressable } from 'react-native';
import { useStyles } from './SelectedImage.styles';
import { Props } from './SelectedImage.types';

import { CloseIcon } from 'assets/icons';

export const SelectedImage: FC<Props> = ({
  imageSrc,
  onPress,
  style
}) => {
  const styles = useStyles();

  return (
    <View style={style}>
      <Pressable style={styles.buttonContainer} onPress={onPress}>
        <View style={styles.deleteButton}>
          <CloseIcon height={20} width={20} />
        </View>
      </Pressable>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageSrc }} style={styles.selectedImage}/>
      </View>
    </View>
  );
};