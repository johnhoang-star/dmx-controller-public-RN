import charBase64 from '../../helpers/charBase64.js';
import { updateStatus } from '../actions/bleManagerActions.js';
import { setGroupIntensity } from '../actions/setGroupIntensity.js';
import {SERVICE_UUID, CHARACTERISTIC_OPERATION_UUID} from '../../constants/microControllerUuid.js';

export const updateIntensity = (groupInfo) => {
  return (dispatch, getState, DeviceManager) => {
    const state = getState();
    const groupInfoBase64 = charBase64.btoa(
      groupInfo.operation.toString() + ',' + groupInfo.id + ',' + groupInfo.nickname + ',' + groupInfo.intensity.toString()
    );
    try {
      let dmxControllerResponse = state.bleManager.connectedDevice.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_OPERATION_UUID,
        groupInfoBase64
      );
      dispatch(setGroupIntensity(groupInfo));
      return true;
    } catch (error) {
      console.log('Update Intensity Error: ', error);
      return false;
    }
  };
};
