import { startBleScan } from './startBleScan.js';
import { clearBleList } from '../actions/bleManagerActions.js';

export const onDeviceDisconnect = (device) => {
  return (dispatch, getState, DeviceManager) => {
    const checkDisconnectSubscription = device.onDisconnected((device) => {
      dispatch(clearBleList());
      dispatch(startBleScan());
      // Not sure if this line is needed or not 10/18/21
      // checkDisconnectSubscription.remove();
    });
  }
}