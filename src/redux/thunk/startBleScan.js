import { PermissionsAndroid, Platform } from 'react-native';

import { bleScan } from './bleScan.js';
import { updateStatus, clearBleList } from '../actions/bleManagerActions.js';
import {
  INITIALIZED,
  MISSING_BLE_PERMISSION,
} from '../../constants/bleManagerStatus.js';
import { requestBlePermission } from '../../helpers/requestBlePermission.js';
import { waitToScanAlert } from '../../components/alertDialogues/waitToScanAlert.js';

export const startBleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        if (Platform.OS === 'android') {
          const blePermissionGranted = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Bluetooth (location) Permission',
              message:
                'Permission for Bluetooth (required for app to work) is located under Location Services. This app does not use GPS.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositve: 'OK',
            }
          ).then(() => {
            dispatch(updateStatus(INITIALIZED));
            dispatch(clearBleList());
            dispatch(bleScan());
            subscription.remove();
          });
        } else {
          const blePermissionGranted = requestBlePermission()
            .then(() => {
              dispatch(updateStatus(INITIALIZED));
              dispatch(clearBleList());
              dispatch(bleScan());
              subscription.remove();
            })
            .catch(() => {
              console.log('error in startBleScan: ' + error.reason);
              waitToScanAlert();
            });
        }
      }
    }, true);
  };
};
