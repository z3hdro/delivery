import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './appStorage.consts';

const storeData = async (key: STORAGE_KEYS, value: string) => {
  await AsyncStorage.setItem(key, value);
};

const removeData = async (key: STORAGE_KEYS) => {
  await AsyncStorage.removeItem(key);
};

const removeMultipleData = async (keys: Array<STORAGE_KEYS>) => {
  await AsyncStorage.multiRemove(keys);
};

const getData = (key: STORAGE_KEYS) => AsyncStorage.getItem(key);

export const appStorage = {
  storeData,
  removeData,
  removeMultipleData,
  getData,
};