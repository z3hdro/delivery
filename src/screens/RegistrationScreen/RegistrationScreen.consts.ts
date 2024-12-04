import { ErrorMap } from './RegistrationScreen.types';

export enum REGISTRATION_ERROR_TEXT {
  PASSWORD_LENGTH = 'Registration_error_password_length',
  PHONE_CONTAIN_WORDS = 'Registration_error_contain_words',
  PHONE_LENGTH = 'Registration_error_phone_length',
  USER_EXISTS = 'Registration_error_user_already_exists',
}

export const INITIAL_ERROR_MAP: ErrorMap = {
  phone: false,
  password: false
};

export const NETWORK_ERROR_TEXT = {
  USER_ALREADY_EXISTS: 'User already registered'
};
