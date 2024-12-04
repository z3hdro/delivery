import React, { FC } from 'react';
import { View, Image, Pressable } from 'react-native';
import { useStyles } from './SelectedImage.styles';
import { Props } from './SelectedImage.types';

import { CloseIcon } from 'assets/icons';
import { USER } from 'constants/user';

export const SelectedImage: FC<Props> = ({
  imageSrc,
  onPress,
  type,
  style
}) => {
  const styles = useStyles();

  return type === USER.APPROVED ? (
    <Pressable onPress={onPress}>
      <View style={style}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageSrc }} style={styles.selectedImage}/>
        </View>
      </View>
    </Pressable>
  ) : (
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
  )
};
