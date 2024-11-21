import React, { FC, useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RoundButton } from 'components/RoundButton';
import { Preloader } from 'components/Preloader';
import { PhotoPreviewProps } from './PhotoPreview.types';

import { useStyles } from './PhotoPreview.styles';

export const PhotoPreview: FC<PhotoPreviewProps> = ({ isVisible, selectedImage, closePhotoView }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onLoadStart = useCallback(() => {
    setIsLoading(true);
  }, []);

  const onLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <Modal style={{ margin: 0 }} isVisible={isVisible} onBackdropPress={closePhotoView}>
      <View style={styles.modalContent}>
        {isLoading && (
          <Preloader style={styles.preloader} />
        )}
        <Image
          source={{ uri: selectedImage ?? '' }}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          style={styles.fullImage}
          resizeMode={'contain'}
        />
        <RoundButton
          style={styles.previewButton}
          textStyle={styles.previewButtonText}
          title={t('Close_photo_preview')}
          onPress={closePhotoView}
        />
      </View>
    </Modal>
  );
};
