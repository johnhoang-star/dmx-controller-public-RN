export const disconnectBleDevice = (device) => {
  return (dispatch, getState, DeviceManager) => {
    DeviceManager.cancelDeviceConnection(device.id);
  };
};
