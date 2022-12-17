import { READ_GROUP_CONFIG } from '../../constants/actionTypes.js';

export function readGroupConfig(payload) {
  return {
    type: READ_GROUP_CONFIG,
    payload: payload,
  };
}