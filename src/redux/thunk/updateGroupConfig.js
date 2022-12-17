import charBase64 from '../../helpers/charBase64.js';
import { updateStatus } from '../actions/bleManagerActions.js';
import { setGroupConfig } from '../actions/setGroupConfig.js';
import {SERVICE_UUID, CHARACTERISTIC_OPERATION_UUID} from '../../constants/microControllerUuid.js'

export const updateGroupConfig = (groupInfo) => {
  return (dispatch, getState, DeviceManager) => {
    const state = getState();
    const groupInfoBase64 = charBase64.btoa(
      groupInfo.operation.toString() + ',' + groupInfo.id + ',' + groupInfo.nickname + ',' + groupInfo.intensity.toString() + ',' + groupInfo.circuits.toString()
    );
    try {
      let dmxControllerResponse = state.bleManager.connectedDevice.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_OPERATION_UUID,
        groupInfoBase64
      );
      dispatch(setGroupConfig(groupInfo));
      return true;
    } catch (error) {
      console.log('Update Error: ', error);
      return false;
    }
  };
};