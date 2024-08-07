import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

import { ScreenHeader } from 'components/ScreenHeader';
import { InfoSection } from 'components/InfoSection';
import { Screen } from 'components/Screen';
import { RoundButton } from 'components/RoundButton';
import { SelectedImage } from 'components/SelectedImage';
import { Checkbox } from 'components/Checkbox';
import { Button } from 'components/Button';
import { Preloader } from 'components/Preloader';
import { JobPositionPicker } from 'components/JobPositionPicker';
import { networkService } from 'services/network';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import {
  createCompanyInitialState,
  createDrivingLicenseInitialState,
  createPassportInitialState,
  createPersonInitialState,
  selectCompanyType,
  selectEmploymentType
} from './UserViewScreen.utils';
import { useStyles } from './UserViewScreen.styles';
import {
  COMPANY_KEYS,
  COMPANY_TYPE,
  COMPANY_TYPE_VALUES,
  DRIVING_LICENSE_KEYS,
  EMPLOYMENT,
  EMPLOYMENT_VALUES,
  PASSPORT_KEYS,
  PERSON_KEYS
} from './UserViewScreen.consts';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { CompanyData, DrivingLicense, ImageFile, PassportData, PersonData } from './UserViewScreen.types';
import { Option } from 'types/picker';

import { BackIcon } from 'src/assets/icons';
import { AxiosError } from 'axios';
import { USER } from 'constants/user';

export const UserViewScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { goBack } = useManagerNavigator();
  const { params: { user, driver, type, onUpdate } } = useManagerRoute<'UserViewScreen'>();

  const [personData, setPersonData] = useState<PersonData>(
    createPersonInitialState(type, driver, user)
  );
  const [passportData, setPassportData] = useState<PassportData>(
    createPassportInitialState(type, driver, user)
  );
  const [drivingLicenseData, setDrivingLicenseData] = useState<DrivingLicense>(
    createDrivingLicenseInitialState(type, driver, user)
  );
  const [companyData, setCompanyData] = useState<CompanyData>(
    createCompanyInitialState(type, driver, user)
  );
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderLeftPart = useCallback(() => {
    return (
      <Pressable onPress={goBack}>
        <View style={styles.headerButton}>
          <BackIcon height={16} width={16} />
        </View>
      </Pressable>

    );
  }, [goBack, styles]);

  const updatePersonData = useCallback((key: PERSON_KEYS, value: string) => {
    setPersonData(prevState => ({ ...prevState, [key]: value }));
  }, []);

  const updatePassportData = useCallback((key: PASSPORT_KEYS, value: string) => {
    setPassportData(prevState => ({ ...prevState, [key]: value }));
  }, []);

  const updateDriverLicenseData = useCallback((key: DRIVING_LICENSE_KEYS, value: string) => {
    setDrivingLicenseData(prevState => ({ ...prevState, [key]: value }));
  }, []);

  const updateCompanyData = useCallback((key: COMPANY_KEYS, value: string) => {
    setCompanyData(prevState => ({ ...prevState, [key]: value }));
  }, []);

  const onToggleEmployment = useCallback((selectedKey: EMPLOYMENT) => {
    setPersonData(prevState => {
      const tempData = { ...prevState };
      EMPLOYMENT_VALUES.forEach((key) => {
        tempData[key] = key === selectedKey;
      });
      return tempData;
    });
  }, []);

  const onToggleCompanyType = useCallback((selectedKey: COMPANY_TYPE) => {
    setCompanyData(prevState => {
      const tempData = { ...prevState };
      COMPANY_TYPE_VALUES.forEach((key) => {
        tempData[key] = key === selectedKey;
      });
      return tempData;
    });
  }, []);

  const onImageSelect = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      orderedSelection: true
    });

    if (!result.canceled && result?.assets[0]) {
      setImages((prevState) => ([...prevState, result.assets[0].uri ?? '']));
    }
  }, []);

  const onDeleteImage = useCallback((selectedIndex: number) => {
    setImages((prevState) =>
      prevState.filter((_, index) => index !== selectedIndex)
    );
  }, []);

  const onChangeJobPosition = useCallback((item: Option | null) => {
    setPersonData(prevState => ({ ...prevState, jobPosition: item }));
  }, []);

  const onSaveUserData = useCallback(async () => {
    try {
      setIsLoading(true);

      if (isLoading) {
        return;
      }

      console.log('personData: ', personData);
      console.log('companyData: ', companyData);
      console.log('passportData: ', passportData);
      console.log('images: ', images);

      const files: ImageFile[] = [];

      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const response = await fetch(image);
          const blob = await response.blob();
          const filename = image.split('/').pop();
          const file: ImageFile = {
            uri: image,
            name: filename,
            type: blob.type
          };
          files.push(file);
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const driverInfo: any = {
        userId: personData.id,
        name: personData.name,
        surname: personData.surname,
        patronymic: personData.patronymic,
        inn: personData.inn,
        employmentType: selectEmploymentType(personData),
        contragentName: companyData.name,
        contragentINN: companyData.inn,
        kpp: companyData.kpp,
        companyType: selectCompanyType(companyData),
        jobPositionId: personData.jobPosition?.value,
        email: personData.email,
        telegram: personData.telegram,
        passportSeries: passportData.series,
        passportNumber: passportData.number,
        passportIssuedBy: passportData.authority,
        passportIssueDate: passportData.date_of_issue,
        passportDepartmentCode: passportData.department_code,
        photos: [...files],
      };

      const formData = new FormData();

      // Append each field to the form data
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.entries(driverInfo).forEach(([key, value]) => {
        // If the value is an array (photos), append each file individually
        if (key === 'photos' && Array.isArray(value)) {
          (value as File[]).forEach((file: File) => {
            formData.append('photos', file, file?.name || '');
          });
        } else if (value) {
          formData.append(key, String(value));
        }
      });

      if (drivingLicenseData.series.trim()) {
        formData.append('drivingLicenseSerial', drivingLicenseData.series);
      }

      if (drivingLicenseData.number.trim()) {
        formData.append('drivingLicenseNumber', drivingLicenseData.number);
      }

      await networkService.confirmDriver(formData);

      onUpdate();
      goBack();
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log('e.code: ', e?.code);
        console.log('e.message: ', e?.message);
        console.log('e.status: ', e?.status);
        console.log('e.request: ', e?.request);
      }
      console.log('error on confirm driver: ', e);
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    personData,
    companyData,
    passportData,
    images,
    drivingLicenseData.series,
    drivingLicenseData.number,
    onUpdate,
    goBack
  ]);

  const onUpdateUserData = async () => {
    try {
      setIsLoading(true);

      if (isLoading) {
        return;
      }

      console.log('personData: ', personData);
      console.log('companyData: ', companyData);
      console.log('passportData: ', passportData);
      console.log('images: ', images);

      const files: ImageFile[] = [];

      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const response = await fetch(image);
          const blob = await response.blob();
          const filename = image.split('/').pop();
          const file: ImageFile = {
            uri: image,
            name: filename,
            type: blob.type
          };
          files.push(file);
        }
      }

      const formData = new FormData();

      if (personData.id) {
        formData.append('personId', String(personData.id));
      }

      if (personData.jobPosition?.value) {
        formData.append('jobPositionId', String(personData.jobPosition?.value));
      }

      if (drivingLicenseData.series.trim()) {
        formData.append('drivingLicenseSerial', drivingLicenseData.series);
      }

      if (drivingLicenseData.number.trim()) {
        formData.append('drivingLicenseNumber', drivingLicenseData.number);
      }

      await networkService.updateDriver(formData);

      onUpdate();
      goBack();
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log('e.code: ', e?.code);
        console.log('e.message: ', e?.message);
        console.log('e.status: ', e?.status);
        console.log('e.request: ', e?.request);
      }
      console.log('error on update driver data: ', e);
    } finally {
      setIsLoading(false);

    }
  };

  const onCancel = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('UserView_header_title')}
          leftPart={renderLeftPart()}
          style={styles.header}
          titleTextStyle={styles.titleText}
        />
      }>
      {isLoading && <Preloader style={styles.preloader} />}
      <KeyboardAvoidingView
        style={styles.avoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <InfoSection
            style={styles.section}
            label={t('UserView_manager_first_label')}
            value={personData.phone}
            onUpdate={(text: string) => {
              updatePersonData(PERSON_KEYS.PHONE, text);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('UserView_manager_second_label')}
            value={'Петров Петр Петрович'}
            editable={false}
          />

          <Text style={styles.sectionTitle}>
            {t('UserView_driver_section_title')}
          </Text>

          <InfoSection
            style={styles.section}
            label={t('UserView_driver_first_label')}
            value={personData.name}
            onUpdate={(text: string) => {
              updatePersonData(PERSON_KEYS.NAME, text);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('UserView_driver_second_label')}
            value={personData.surname}
            onUpdate={(text: string) => {
              updatePersonData(PERSON_KEYS.SURNAME, text);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('UserView_driver_third_label')}
            value={personData.patronymic}
            onUpdate={(text: string) => {
              updatePersonData(PERSON_KEYS.PATRONYMIC, text);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('UserView_driver_fourth_label')}
            value={personData.inn ?? ''}
            onUpdate={(text: string) => {
              updatePersonData(PERSON_KEYS.INN, text);
            }}
            keyboardType={'numeric'}
          />

          <Text style={[styles.label, styles.section]}>
            {t('UserView_driver_fifth_label')}
          </Text>
          <Checkbox
            label={t('UserView_driver_checkbox_first_label')}
            value={personData.self_employed}
            onPress={() => {
              onToggleEmployment(EMPLOYMENT.SELF_EMPLOYED);
            }}
          />
          <Checkbox
            style={styles.section}
            label={t('UserView_driver_checkbox_third_label')}
            value={personData.company}
            onPress={() => {
              onToggleEmployment(EMPLOYMENT.COMPANY);
            }}
          />

          {personData.company && (
            <View style={styles.companyContainer}>
              <InfoSection
                style={styles.section}
                textInputStyle={styles.companySection}
                label={t('UserView_company_first_label')}
                value={companyData.name}
                onUpdate={(text: string) => {
                  updateCompanyData(COMPANY_KEYS.NAME, text);
                }}
              />
              <InfoSection
                style={styles.section}
                textInputStyle={styles.companySection}
                label={t('UserView_company_second_label')}
                value={companyData.inn}
                onUpdate={(text: string) => {
                  updateCompanyData(COMPANY_KEYS.INN, text);
                }}
                keyboardType={'numeric'}
              />
              <InfoSection
                style={styles.section}
                textInputStyle={styles.companySection}
                label={t('UserView_company_third_label')}
                value={companyData.kpp}
                onUpdate={(text: string) => {
                  updateCompanyData(COMPANY_KEYS.KPP, text);
                }}
                keyboardType={'numeric'}
              />
              <View style={styles.section}>
                <Text style={styles.label}>
                  {t('UserView_company_fourth_label')}
                </Text>
                <Checkbox
                  label={t('UserView_company_checkbox_first_label')}
                  value={companyData.supplier}
                  onPress={() => {
                    onToggleCompanyType(COMPANY_TYPE.SUPPLIER);
                  }}
                />
                <Checkbox
                  style={styles.section}
                  label={t('UserView_company_checkbox_second_label')}
                  value={companyData.buyer}
                  onPress={() => {
                    onToggleCompanyType(COMPANY_TYPE.BUYER);
                  }}
                />
                <Checkbox
                  style={styles.section}
                  label={t('UserView_company_checkbox_third_label')}
                  value={companyData.transport_company}
                  onPress={() => {
                    onToggleCompanyType(COMPANY_TYPE.TRANSPORT_COMPANY);
                  }}
                />
              </View>
            </View>
          )}

          <Text style={[styles.label, styles.jobPositionSection]}>
            {t('UserView_driver_sixth_label')}
          </Text>
          <JobPositionPicker
            value={personData.jobPosition}
            onChangeValue={onChangeJobPosition}
          />

          <Text style={styles.sectionTitle}>
            {t('UserView_contact_section_title')}
          </Text>
          <InfoSection
            style={styles.section}
            label={t('UserView_contact_first_label')}
            value={personData.email ?? ''}
            onUpdate={(text: string) => {
              updatePersonData(PERSON_KEYS.EMAIL, text);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('UserView_contact_second_label')}
            value={personData.telegram ?? ''}
            onUpdate={(text: string) => {
              updatePersonData(PERSON_KEYS.TELEGRAM, text);
            }}
          />

          <Text style={styles.sectionTitle}>
            {t('UserView_driver_license_section_title')}
          </Text>
          <View style={styles.row}>
            <InfoSection
              style={styles.rowItem}
              label={t('UserView_driver_license_first_label')}
              value={drivingLicenseData.series}
              onUpdate={(text: string) => {
                updateDriverLicenseData(DRIVING_LICENSE_KEYS.SERIES, text);
              }}
            />
            <InfoSection
              style={styles.rowItem}
              label={t('UserView_driver_license_second_label')}
              value={drivingLicenseData.number}
              onUpdate={(text: string) => {
                updateDriverLicenseData(DRIVING_LICENSE_KEYS.NUMBER, text);
              }}
              keyboardType={'numeric'}
            />
          </View>

          <Text style={styles.sectionTitle}>
            {t('UserView_passport_section_title')}
          </Text>
          <View style={styles.row}>
            <InfoSection
              style={styles.rowItem}
              label={t('UserView_passport_first_label')}
              value={passportData.series}
              onUpdate={(text: string) => {
                updatePassportData(PASSPORT_KEYS.SERIES, text);
              }}
            />
            <InfoSection
              style={styles.rowItem}
              label={t('UserView_passport_second_label')}
              value={passportData.number}
              onUpdate={(text: string) => {
                updatePassportData(PASSPORT_KEYS.NUMBER, text);
              }}
              keyboardType={'numeric'}
            />
          </View>
          <InfoSection
            style={styles.section}
            label={t('UserView_passport_third_label')}
            value={passportData.authority}
            onUpdate={(text: string) => {
              updatePassportData(PASSPORT_KEYS.AUTHORITY, text);
            }}
          />
          <View style={styles.row}>
            <InfoSection
              style={styles.rowItem}
              label={t('UserView_passport_fourth_label')}
              value={passportData.date_of_issue}
              onUpdate={(text: string) => {
                updatePassportData(PASSPORT_KEYS.DATE_OF_ISSUE, text);
              }}
              type={INFO_SECTION_TYPE.DATE_PICKER}
              minimumDate={undefined}
            />
            <InfoSection
              style={styles.rowItem}
              label={t('UserView_passport_fifth_label')}
              value={passportData.department_code}
              onUpdate={(text: string) => {
                updatePassportData(PASSPORT_KEYS.DEPARTMENT_CODE, text);
              }}
            />
          </View>

          <Text style={[styles.label, styles.section]}>
            {t('UserView_passport_sixth_label')}
          </Text>
          <RoundButton
            style={styles.addPhotoButton}
            textStyle={styles.addPhotoButtonText}
            title={t('UserView_passport_add_photo_button')}
            onPress={onImageSelect}
          />

          {!!images.length && (
            <View style={styles.photoSection}>
              {images.map((image, index) => (
                <SelectedImage
                  key={`${index}_${image}`}
                  imageSrc={image}
                  onPress={() => {
                    onDeleteImage(index);
                  }}
                />
              ))}
            </View>
          )}

          <View style={styles.buttonSection}>
            <Button
              style={styles.primaryButton}
              textStyle={styles.primaryButtonText}
              title={t('UserView_save_button')}
              onPress={type === USER.WAITING_APPROVAL ? onSaveUserData : onUpdateUserData}
              disabled={isLoading}
            />
            <Button
              style={styles.secondaryButton}
              textStyle={styles.primaryButtonText}
              title={t('UserView_cancel_button')}
              onPress={onCancel}
              disabled={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};
