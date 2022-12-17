import { SET_CIRCUITS } from '../../constants/actionTypes.js';

export default function setGroupCircuits(payload) {
  return {
    type: SET_CIRCUITS,
    payload: payload,
  };
}
