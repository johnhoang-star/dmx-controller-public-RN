import {
  SCAN_CONNECT_BLE,
  CONNECTED_DEVICE,
  UPDATE_STATUS,
  CLEAR_BLE_LIST,
  PRINT_CONSOLE,
} from '../../constants/actionTypes.js';
import { CONNECTED } from '../../constants/bleManagerStatus.js';

const initialState = {
  bleList: [],
  connectedDevice: {},
  status: 'disconnected',
  console: '',
};

// export async function scanAndConnectBle(state) {
//   console.log('Running scanAndConnectBle...');
//   await requestBlePermission();
//   console.log('State before scanAndConnectBle:');
//   console.log(state);
//   if (state.device) {
//     return state;
//   }
//   primaryBleManager.startDeviceScan(null, null, (error, device) => {
//     if (state.device) {
//       return state;
//     }
//     console.log('Attempting to connect...');

//     console.log('Device name: ' + device.name);

//     if (device.name === 'MVHS DMX') {
//       console.log('Found Bluetooth device to connect to.');
//       device.connect().then((device) => {
//         console.log('Is device connected:');
//         console.log(primaryBleManager.isDeviceConnected(device.id));
//         console.log('Connected to device.');
//         // console.log('Device:');
//         // console.log(device);
//         primaryBleManager.stopDeviceScan();
//         const newState = {
//           device: device.id,
//           loading: false,
//           errorMessage: 'stuff',
//         };
//         console.log('Device ID:');
//         console.log(device.id);
//         if (!device.id) {
//           return state;
//         }
//         bleManagerReducer(
//           state,
//           (action = { type: SCAN_CONNECT_BLE_FULFILLED, payload: newState })
//         );
//       });
//     }

//     // Continuously scan until connected
//     if (error) {
//       console.log(error);
//       console.log('Switch: error, unable to connect');
//     }
//   });
//   console.log('Returning regular state...');
//   return state;
// }

export default function bleManagerReducer(state = initialState, action) {
  switch (action.type) {
    case SCAN_CONNECT_BLE:
      if (
        state.bleList.some((device) => device.id === action.device.id) ||
        action.device.name === null
      ) {
        return state;
      } else {
        const newBle = [...state.bleList, action.device];
        return {
          ...state,
          bleList: newBle,
          connectedDevice: state.connectedDevice,
          status: action.status,
        };
      }

    case CONNECTED_DEVICE:
      return {
        ...state,
        bleList: state.bleList,
        connectedDevice: action.connectedDevice,
        status: CONNECTED,
      };

    case UPDATE_STATUS:
      if (state.status === action.status) {
        return state;
      }
      return {
        ...state,
        bleList: state.bleList,
        connectedDevice: action.connectedDevice,
        status: action.status,
      };

    case CLEAR_BLE_LIST:
      return {
        ...state,
        bleList: [],
        connectedDevice: {},
        status: state.status,
      };

    case PRINT_CONSOLE:
      return {
        ...state,
        console: action.payload,
      };

    default:
      return state;
  }
}
