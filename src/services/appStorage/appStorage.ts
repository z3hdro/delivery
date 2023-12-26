import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

const removeData = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

const removeMultipleData = async (keys: Array<string>) => {
  await AsyncStorage.multiRemove(keys);
};

const getData = (key: string) => AsyncStorage.getItem(key);

export const appStorage = {
  storeData,
  removeData,
  removeMultipleData,
  getData,
};