import { SET_NICKNAME } from '../../constants/actionTypes.js';

export default function setGroupNickname(payload) {
  return {
    type: SET_NICKNAME,
    payload: payload,
  };
}
