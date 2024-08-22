import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { CompletionTabBar } from 'components/CompletionTabBar';
import { WaitingApprovalList, InProgressList, AvailableList, CompletedList } from './components';

import { useStyles } from './CargoListScreen.styles';

export const CargoListScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('CargoList_title')}
        />
      }>
      <View style={styles.container}>
        <CompletionTabBar
          tabsContainerStyle={styles.tabBar}
          firstLabel={t('CargoList_tab_one_label')}
          secondLabel={t('CargoList_tab_two_label')}
          thirdLabel={t('CargoList_tab_three_label')}
          firstScreen={<WaitingApprovalList />}
          secondScreen={<InProgressList />}
          thirdScreen={<AvailableList />}
          fourthScreen={<CompletedList />}
          displayIcons
        />
      </View>
    </Screen>
  );
};
