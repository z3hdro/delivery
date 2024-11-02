import React, { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';

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
import { useAppSelector } from 'hooks/useAppSelector';
import { selectCurrentPerson } from 'store/selectors';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import {
  checkValidation,
  createCompanyInitialState,
  createDrivingLicenseInitialState,
  createManagerFullName,
  createPassportInitialState,
  createPersonInitialState,
  selectCompanyType,
  selectEmploymentType
} from './UserViewScreen.utils';
import {
  COMPANY_KEYS,
  COMPANY_TYPE,
  COMPANY_TYPE_VALUES,
  DRIVING_LICENSE_KEYS,
  EMPLOYMENT,
  EMPLOYMENT_VALUES,
  INITIAL_ERROR_MAP,
  PASSPORT_KEYS,
  PERSON_KEYS,
  USER_APPROVE_ERROR_TEXT
} from './UserViewScreen.consts';
import { USER } from 'constants/user';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { CompanyData, DrivingLicense, ErrorMap, ImageFile, PassportData, PersonData } from './UserViewScreen.types';
import { Option } from 'types/picker';
import { ExtendedPerson } from 'types/user';
import { useStyles } from './UserViewScreen.styles';

import { BackIcon } from 'src/assets/icons';
import { displayErrorMessage } from 'utils/alert';


export const UserViewScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { goBack } = useManagerNavigator();
  const { params: { user, driver, type, onUpdate } } = useManagerRoute<'UserViewScreen'>();

  const person = useAppSelector(selectCurrentPerson);

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
  const [manager, setManager] = useState<string>(
    createManagerFullName(person as ExtendedPerson)
  );
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorText, setErrorText] = useState<string | null>(null);
  const [isError, setIsError] = useState<ErrorMap>(INITIAL_ERROR_MAP);

  const isValidError = useMemo(() => {
    return Object.values(isError).some((err) => err);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(isError)]);

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
    if (isValidError) {
      setErrorText(null);
      setIsError(INITIAL_ERROR_MAP);
    }
    setPersonData(prevState => ({ ...prevState, jobPosition: item }));
  }, [isValidError]);

  const onSaveUserData = async () => {
    try {
      setIsLoading(true);

      if (isLoading) {
        return;
      }

      console.log('personData: ', personData);
      console.log('companyData: ', companyData);
      console.log('passportData: ', passportData);
      console.log('images: ', images);

      const errorMap = checkValidation({
        manager: manager.trim(),
        company: personData.company,
        companyName: companyData.name,
        companyInn: companyData.inn,
        companyKpp: companyData.kpp,
        email: personData?.email?.trim(),
        name: personData.name,
        surname: personData.surname,
        jobPosition: personData.jobPosition,
        selfEmployed: personData.self_employed,
        driverLicenseSeries: drivingLicenseData.series,
        driverLicenseNumber: drivingLicenseData.number,
        passportSeries: passportData.series,
        passportNumber: passportData.number,
        passportAuthority: passportData.authority,
        passportDateOfIssue: passportData.date_of_issue,
        passportDepartmentCode: passportData.department_code,
      });

      if (Object.values(errorMap).some((err) => err)) {
        setIsError(errorMap);
        return;
      }

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
      displayErrorMessage(e?.message as string ?? '');
    } finally {
      setIsLoading(false);
    }
  };

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

      const errorMap = checkValidation({
        manager: manager.trim(),
        company: personData.company,
        companyName: companyData.name,
        companyInn: companyData.inn,
        companyKpp: companyData.kpp,
        email: personData?.email?.trim(),
        name: personData.name,
        surname: personData.surname,
        jobPosition: personData.jobPosition,
        selfEmployed: personData.self_employed,
        driverLicenseSeries: drivingLicenseData.series,
        driverLicenseNumber: drivingLicenseData.number,
        passportSeries: passportData.series,
        passportNumber: passportData.number,
        passportAuthority: passportData.authority,
        passportDateOfIssue: passportData.date_of_issue,
        passportDepartmentCode: passportData.department_code,
      });

      if (Object.values(errorMap).some((err) => err)) {
        setIsError(errorMap);
        return;
      }

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
      displayErrorMessage(e?.message as string ?? '');
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
            editable={false}
            isRequired
          />
          <InfoSection
            style={styles.section}
            label={t('UserView_manager_second_label')}
            value={manager}
            onUpdate={(text) => {
              if (isValidError) {
                setErrorText(null);
                setIsError(INITIAL_ERROR_MAP);
              }
              setManager(text);
            }}
            isRequired
            isError={isError.manager}
            errorText={t(errorText || USER_APPROVE_ERROR_TEXT.MANAGER_EMPTY)}
          />

          <Text style={styles.sectionTitle}>
            {t('UserView_driver_section_title')}
          </Text>

          <InfoSection
            isRequired
            style={styles.section}
            label={t('UserView_driver_first_label')}
            value={personData.name}
            onUpdate={(text: string) => {
              if (isValidError) {
                setErrorText(null);
                setIsError(INITIAL_ERROR_MAP);
              }
              updatePersonData(PERSON_KEYS.NAME, text);
            }}
            isError={isError.name}
            errorText={t(errorText || 'Error_user_empty_name')}
          />
          <InfoSection
            isRequired
            style={styles.section}
            label={t('UserView_driver_second_label')}
            value={personData.surname}
            onUpdate={(text: string) => {
              if (isValidError) {
                setErrorText(null);
                setIsError(INITIAL_ERROR_MAP);
              }
              updatePersonData(PERSON_KEYS.SURNAME, text);
            }}
            isError={isError.name}
            errorText={t(errorText || 'Error_user_empty_surname')}
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
            <Text style={styles.required}>*{'  '}</Text>
            {t('UserView_driver_fifth_label')}
          </Text>
          <Checkbox
            label={t('UserView_driver_checkbox_first_label')}
            value={personData.self_employed}
            isError={isError.type}
            errorText={t(errorText || 'Error_user_empty_type')}
            onPress={() => {
              if (isValidError) {
                setErrorText(null);
                setIsError(INITIAL_ERROR_MAP);
              }
              onToggleEmployment(EMPLOYMENT.SELF_EMPLOYED);
            }}
          />
          <Checkbox
            style={styles.section}
            label={t('UserView_driver_checkbox_third_label')}
            value={personData.company}
            isError={isError.type}
            errorText={t(errorText || 'Error_user_empty_type')}
            onPress={() => {
              if (isValidError) {
                setErrorText(null);
                setIsError(INITIAL_ERROR_MAP);
              }
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
                  if (isValidError) {
                    setErrorText(null);
                    setIsError(INITIAL_ERROR_MAP);
                  }
                  updateCompanyData(COMPANY_KEYS.NAME, text);
                }}
                isRequired
                isError={isError.companyName}
                errorText={t(errorText || USER_APPROVE_ERROR_TEXT.COMPANY_NAME_EMPTY)}
              />
              <InfoSection
                style={styles.section}
                textInputStyle={styles.companySection}
                label={t('UserView_company_second_label')}
                value={companyData.inn}
                onUpdate={(text: string) => {
                  if (isValidError) {
                    setErrorText(null);
                    setIsError(INITIAL_ERROR_MAP);
                  }
                  updateCompanyData(COMPANY_KEYS.INN, text);
                }}
                keyboardType={'numeric'}
                isRequired
                isError={isError.companyInn}
                errorText={t(errorText || USER_APPROVE_ERROR_TEXT.COMPANY_INN_EMPTY)}
              />
              <InfoSection
                style={styles.section}
                textInputStyle={styles.companySection}
                label={t('UserView_company_third_label')}
                value={companyData.kpp}
                onUpdate={(text: string) => {
                  if (isValidError) {
                    setErrorText(null);
                    setIsError(INITIAL_ERROR_MAP);
                  }
                  updateCompanyData(COMPANY_KEYS.KPP, text);
                }}
                keyboardType={'numeric'}
                isError={isError.companyKpp}
                errorText={t(errorText || USER_APPROVE_ERROR_TEXT.COMPANY_KPP_ONLY_NUMBERS)}
              />
              <View style={styles.section}>
                <Text style={styles.label}>
                  <Text style={styles.required}>*</Text>
                  {' '}
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
            <Text style={styles.required}>*{'  '}</Text>
            {t('UserView_driver_sixth_label')}
          </Text>
          <JobPositionPicker
            value={personData.jobPosition}
            onChangeValue={onChangeJobPosition}
            isError={isError.jobPosition}
            errorText={t(errorText || 'Error_user_empty_job_position')}
          />

          <Text style={styles.sectionTitle}>
            {t('UserView_contact_section_title')}
          </Text>
          <InfoSection
            isRequired
            style={styles.section}
            label={t('UserView_contact_first_label')}
            value={personData.email ?? ''}
            onUpdate={(text: string) => {
              if (isValidError) {
                setErrorText(null);
                setIsError(INITIAL_ERROR_MAP);
              }
              updatePersonData(PERSON_KEYS.EMAIL, text);
            }}
            isError={isError.email}
            errorText={t(errorText || USER_APPROVE_ERROR_TEXT.INCORRECT_EMAIL)}
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
              isRequired
              style={styles.rowItem}
              label={t('UserView_driver_license_first_label')}
              value={drivingLicenseData.series}
              onUpdate={(text: string) => {
                if (isValidError) {
                  setErrorText(null);
                  setIsError(INITIAL_ERROR_MAP);
                }
                updateDriverLicenseData(DRIVING_LICENSE_KEYS.SERIES, text);
              }}
              isError={isError.driverLicenseSeries}
              errorText={t(errorText || 'Error_user_empty_driver_license_series')}
            />
            <InfoSection
              isRequired
              style={styles.rowItem}
              label={t('UserView_driver_license_second_label')}
              value={drivingLicenseData.number}
              onUpdate={(text: string) => {
                if (isValidError) {
                  setErrorText(null);
                  setIsError(INITIAL_ERROR_MAP);
                }
                updateDriverLicenseData(DRIVING_LICENSE_KEYS.NUMBER, text);
              }}
              keyboardType={'numeric'}
              isError={isError.driverLicenseNumber}
              errorText={t(errorText || 'Error_user_empty_driver_license_number')}
            />
          </View>

          <Text style={styles.sectionTitle}>
            {t('UserView_passport_section_title')}
          </Text>
          <View style={styles.row}>
            <InfoSection
              isRequired
              style={styles.rowItem}
              label={t('UserView_passport_first_label')}
              value={passportData.series}
              onUpdate={(text: string) => {
                if (isValidError) {
                  setErrorText(null);
                  setIsError(INITIAL_ERROR_MAP);
                }
                updatePassportData(PASSPORT_KEYS.SERIES, text);
              }}
              isError={isError.passportSeries}
              errorText={t(errorText || 'Error_user_empty_passport_series')}
            />
            <InfoSection
              isRequired
              style={styles.rowItem}
              label={t('UserView_passport_second_label')}
              value={passportData.number}
              onUpdate={(text: string) => {
                if (isValidError) {
                  setErrorText(null);
                  setIsError(INITIAL_ERROR_MAP);
                }
                updatePassportData(PASSPORT_KEYS.NUMBER, text);
              }}
              keyboardType={'numeric'}
              isError={isError.passportNumber}
              errorText={t(errorText || 'Error_user_empty_passport_number')}
            />
          </View>
          <InfoSection
            isRequired
            style={styles.section}
            label={t('UserView_passport_third_label')}
            value={passportData.authority}
            onUpdate={(text: string) => {
              if (isValidError) {
                setErrorText(null);
                setIsError(INITIAL_ERROR_MAP);
              }
              updatePassportData(PASSPORT_KEYS.AUTHORITY, text);
            }}
            isError={isError.passportAuthority}
            errorText={t(errorText || 'Error_user_empty_passport_authority')}
          />
          <View style={styles.row}>
            <InfoSection
              isRequired
              style={styles.rowItem}
              label={t('UserView_passport_fourth_label')}
              value={passportData.date_of_issue}
              onUpdate={(text: string) => {
                if (isValidError) {
                  setErrorText(null);
                  setIsError(INITIAL_ERROR_MAP);
                }
                updatePassportData(PASSPORT_KEYS.DATE_OF_ISSUE, text);
              }}
              type={INFO_SECTION_TYPE.DATE_PICKER}
              minimumDate={undefined}
              isError={isError.passportDateOfIssue}
              errorText={t(errorText || 'Error_user_empty_passport_date_of_issue')}
            />
            <InfoSection
              isRequired
              style={styles.rowItem}
              label={t('UserView_passport_fifth_label')}
              value={passportData.department_code}
              onUpdate={(text: string) => {
                if (isValidError) {
                  setErrorText(null);
                  setIsError(INITIAL_ERROR_MAP);
                }
                updatePassportData(PASSPORT_KEYS.DEPARTMENT_CODE, text);
              }}
              isError={isError.passportDepartmentCode}
              errorText={t(errorText || 'Error_user_empty_passport_department_code')}
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
              disabled={isLoading || isValidError}
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
