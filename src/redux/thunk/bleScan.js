import {
  updateStatus,
  scanConnectBle,
  clearBleList,
  printConsole,
} from '../actions/bleManagerActions.js';
import { SCANNING, BLE_ERROR } from '../../constants/bleManagerStatus.js';
import { connectDevice } from '../../redux/thunk/connectDevice.js';
import { waitToScanAlert } from '../../components/alertDialogues/waitToScanAlert.js';

export const bleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    // If scan already happens to be in progress, stop it before starting it again.
    DeviceManager.stopDeviceScan();
    DeviceManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        dispatch(updateStatus(BLE_ERROR));
        console.log('error in scanning: ' + error.reason);
        waitToScanAlert();
      }
      if (device !== null) {
        dispatch(updateStatus(SCANNING));
        dispatch(scanConnectBle(device));
      }
      // Automatically connect to hardware with the controllers name.
      if (device != null && device.name === 'MVHS DMX 1') {
        dispatch(connectDevice(device));
      }
    });
  };
};
