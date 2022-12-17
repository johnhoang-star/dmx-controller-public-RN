import {
  SCAN_CONNECT_BLE,
  CONNECTED_DEVICE,
  UPDATE_STATUS,
  CLEAR_BLE_LIST,
  PRINT_CONSOLE,
} from '../../constants/actionTypes.js';

export const scanConnectBle = (device) => {
  return {
    type: SCAN_CONNECT_BLE,
    device,
  };
};

export const connectedDevice = (device) => {
  return {
    type: CONNECTED_DEVICE,
    connectedDevice: device,
  };
};

export const updateStatus = (status) => {
  return {
    type: UPDATE_STATUS,
    status: status,
  };
}

export const clearBleList = () => {
  return {
    type: CLEAR_BLE_LIST
  };
}

export const printConsole = (console) => {
  return {
    type: PRINT_CONSOLE,
    payload: console
  }
}