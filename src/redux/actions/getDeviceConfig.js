import { READ_GROUP_CONFIG } from '../../constants/actionTypes.js';

export default function setGroupCircuits(payload) {
  return {
    type: READ_GROUP_CONFIG,
    payload: payload,
  };
}