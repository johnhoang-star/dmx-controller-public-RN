import AsyncStorage from '@react-native-community/async-storage';

import { STORE_GROUP } from '../constants/asyncStorageKeys.js';

export async function saveGroupData(group) {
  await AsyncStorage.setItem(STORE_GROUP, JSON.stringify(group));
}

export async function readGroupData(group) {
  const groupData = await AsyncStorage.getItem();
}
