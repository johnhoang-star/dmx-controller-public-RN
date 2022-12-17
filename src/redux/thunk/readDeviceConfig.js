import {
  SERVICE_UUID,
  CHARACTERISTIC_INFO_UUID,
} from '../../constants/microControllerUuid.js';
import { setGroupConfig } from '../actions/setGroupConfig.js';
import charBase64 from '../../helpers/charBase64.js';
import {
  group,
  GROUP_POSITION,
  NICKNAME_POSITION,
  INTENSITY_POSITION,
  CHANNEL_START_POSITION,
  MAX_CHANNELS,
  MAX_GROUPS,
} from '../../constants/groups.js';

export const readDeviceConfig = () => {
  return (dispatch, getState, DeviceManager) => {
    const state = getState();
    console.log('Reading device config');
    state.bleManager.connectedDevice.monitorCharacteristicForService(
      SERVICE_UUID,
      CHARACTERISTIC_INFO_UUID,
      (error, controllerResponse) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Been notified.');
          updateGroupConfig(controllerResponse.value);
        }
      }
    );

    state.bleManager.connectedDevice.readCharacteristicForService(
      SERVICE_UUID,
      CHARACTERISTIC_INFO_UUID
    );

    function updateGroupConfig(controllerResponse) {
      console.log('notifying');
      console.log('dmxControllerResponse: ', controllerResponse);
      let responseValue = charBase64.atob(controllerResponse);
      console.log('reponseValue: ');
      console.log(responseValue);
      let rawArray = responseValue.split(',');

      // Position subtracted by 1 due to no operation being sent with data.
      let newNickname = '';
      if (rawArray[NICKNAME_POSITION - 1]) {
        newNickname = rawArray[NICKNAME_POSITION - 1];
      }

      let newGroup = {
        operation: 0,
        id: rawArray[GROUP_POSITION - 1],
        nickname: newNickname,
        intensity: Number(rawArray[INTENSITY_POSITION - 1]),
        circuits: [],
      };

      let newCircuits = [];
      for (let j = 0; j < MAX_CHANNELS; j++) {
        newCircuits[j] = Number(rawArray[CHANNEL_START_POSITION + j - 1]);
      }
      newGroup.circuits = newCircuits;
      dispatch(setGroupConfig(newGroup));
    }

    // for (let i = 0; i < MAX_GROUPS; i++) {
    //   let dmxControllerResponse =
    //     state.bleManager.connectedDevice.readCharacteristicForService(
    //       SERVICE_UUID,
    //       CHARACTERISTIC_INFO_UUID
    //     );
    //   dmxControllerResponse.then(() => {
    //     console.log('dmxControllerResponse: ', dmxControllerResponse);
    //     let responseValue = charBase64.atob(dmxControllerResponse._W.value);
    //     console.log('reponseValue: ');
    //     console.log(responseValue);
    //     let rawArray = responseValue.split(',');

    //     // Position subtracted by 1 due to no operation being sent with data.
    //     let newNickname = '';
    //     if (rawArray[NICKNAME_POSITION - 1]) {
    //       newNickname = rawArray[NICKNAME_POSITION - 1];
    //     }

    //     let newGroup = {
    //       operation: 0,
    //       id: rawArray[GROUP_POSITION - 1],
    //       nickname: newNickname,
    //       intensity: Number(rawArray[INTENSITY_POSITION - 1]),
    //       circuits: [],
    //     };

    //     let newCircuits = [];
    //     for (let j = 0; j < MAX_CHANNELS; j++) {
    //       newCircuits[j] = Number(rawArray[CHANNEL_START_POSITION + j - 1]);
    //     }
    //     newGroup.circuits = newCircuits;
    //     dispatch(setGroupConfig(newGroup));
    //     // console.log("Read value from CHARACTERISTIC_INFO_UUID: ", newGroup.circuits);
    //   });
    // }
  };
};
