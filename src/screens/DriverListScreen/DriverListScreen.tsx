import React, { useRef } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { CompletionTabBar } from 'components/CompletionTabBar';
import { ApprovedList, WaitingApprovalList } from './components';

import { useStyles } from './DriverListScreen.styles';
import { TabBarRef } from 'components/CompletionTabBar/CompletionTabBar.types';

export const DriverListScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const tabBarRef = useRef<TabBarRef>(null);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('DriverList_header_title')}
        />
      }>
      <View style={styles.container}>
        <CompletionTabBar
          tabBarRef={tabBarRef}
          tabsContainerStyle={styles.tabBar}
          firstLabel={t('DriverList_tab_first_label')}
          secondLabel={t('DriverList_tab_second_label')}
          firstScreen={<WaitingApprovalList />}
          secondScreen={<ApprovedList />}
          labelTextStyle={styles.tabText}
        />
      </View>
    </Screen>
  );
};
