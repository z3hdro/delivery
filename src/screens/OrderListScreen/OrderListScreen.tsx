import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Linking, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { Preloader } from 'src/components/Preloader';
import { OrderCard } from 'components/OrderCard';
import { Button } from 'components/Button';
import { LinkButton } from 'components/LinkButton';
import { useDriverNavigator } from 'navigation/hooks';
import { INSTRUCTION_LINK } from 'constants/geolocation';
import { useStyles } from './OrderListScreen.styles';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { useAppData } from 'providers/AppProvider';
import { networkService } from 'services/network';
import { MEASURE_LIMIT } from 'constants/limit';
import { Order } from 'types/order';

export const OrderListScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { currentOrder } = useAppData();
  const { navigate } = useDriverNavigator();


  const [data, setData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true);

  const isLimitReached = useMemo(() => data.length < (offset + 1) * MEASURE_LIMIT, [data.length, offset]);

  const fetchData = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const { orders } = await networkService.getAvailableOrders(offset);
      if (orders.length) {
        setData((prevState) => offset === 0 ? orders : ([...prevState, ...orders]));
        setOffset((prevState) => prevState + 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      if (currentOrder) {
        await new Promise(resolve => setTimeout(resolve, 0));
        console.log('p1');
        navigate('OrderScreen', {
          order: currentOrder,
          onUpdate: () => {
            setShouldRefresh(true);
          }
        });
      }
      setIsInitialLoading(false);
    })();
  }, [currentOrder, navigate]);

  useEffect(() => {
    void (async () => {
      if (shouldRefresh) {
        await fetchData(0);
      }
      setShouldRefresh(false);
    })();
  }, [fetchData, shouldRefresh]);

  const onEndReached = useCallback(async () => {
    if (isLimitReached) {
      return;
    } else {
      await fetchData(offset);
    }
  }, [fetchData, isLimitReached, offset]);

  const onOpenLink = useCallback(async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      console.error(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const onCloseModal = useCallback(() => {
    setDisplayModal(false);
  }, []);

  // TODO: uncomment when sorting and filtering will be applied
  // const openFilters = useCallback(() => {
  //   console.log('open filters');
  // }, []);

  // const sortOrderList = useCallback(() => {
  //   console.log('add sorting logic');
  // }, []);

  // const renderFilter = useCallback(() => {
  //   return (
  //     <Pressable onPress={openFilters}>
  //       <View style={styles.filter}>
  //         <FilterIcon height={16} width={16} />
  //       </View>
  //     </Pressable>
  //
  //   );
  // }, [openFilters, styles]);

  const onOpenOrder = useCallback(async (order: Order) => {
    const geolocationEnabled = await appStorage.getData(STORAGE_KEYS.NOTIFICATION_PERMISSION);
    if (!geolocationEnabled) {
      setDisplayModal(true);
      return;
    }

    navigate('OrderScreen', {
      order,
      onUpdate: () => {
        setShouldRefresh(true);
      }
    });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: Order}) => (
    <OrderCard order={item} isDriver t={t} onPress={onOpenOrder} />
  ), [onOpenOrder, t]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('Orders_title')}
          // rightPart={renderFilter()}
        />
      }>
      <Modal
        isVisible={displayModal}
        swipeDirection={['up', 'down']}
        onSwipeComplete={onCloseModal}
        style={styles.modal}
      >
        <View style={styles.centeredView}>
          <View>
            <Text style={styles.modalText}>
              {t('Geolocation_modal_description')}
            </Text>
          </View>
          <View style={styles.modalControlButtons}>
            <Button
              style={styles.primaryButton}
              textStyle={styles.primaryButtonText}
              title={t('Geolocation_modal_confirm_button')}
              onPress={() => onOpenLink(INSTRUCTION_LINK)}
              disabled={isLoading}
            />
            <LinkButton
              customTextStyle={styles.secondaryButton}
              onPress={onCloseModal}
              title={t('Geolocation_modal_cancel_button')}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        {(isLoading || isInitialLoading) ? (
          <Preloader />
        ) : (
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={data}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
          />
        )}
      </View>
    </Screen>
  );
};
