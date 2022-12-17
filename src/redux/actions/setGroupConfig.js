import { SET_GROUP_CONFIG } from '../../constants/actionTypes.js';

export function setGroupConfig(payload) {
  return {
    type: SET_GROUP_CONFIG,
    payload: payload,
  };
}