import initGroupCreation from '../../helpers/initGroupCreation.js';
import {
  SET_INTENSITY,
  SET_NICKNAME,
  SET_CIRCUITS,
  SET_GROUP_CONFIG,
  READ_GROUP_CONFIG,
  CREATE_GROUP,
} from '../../constants/actionTypes.js';
import { MAX_GROUPS } from '../../constants/groups.js';
import { groupCreator } from '../../helpers/groupCreator.js';

const initialState = {
  groups: initGroupCreation(1),
};

function replaceGroupInfo(state, action) {
  let newState = [];
  state.groups.map((obj) => {
    if (obj.id === action.payload.id) {
      newState = [...newState, action.payload];
    } else {
      newState = [...newState, obj];
    }
  });
  return newState;
}

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INTENSITY:
      const newIntensityState = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: newIntensityState,
      });

    case SET_NICKNAME:
      const newNicknameState = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: newNicknameState,
      });

    case SET_CIRCUITS:
      const newCircuitsState = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: newCircuitsState,
      });

    case SET_GROUP_CONFIG:
      const newGroupConfig = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: newGroupConfig,
      });

    case READ_GROUP_CONFIG:
      const readGroupConfig = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: readGroupConfig,
      });

    // Not currently implemented.
    case CREATE_GROUP:
      let numOfGroups = Object.keys(state.groups).length;
      if (numOfGroups < MAX_GROUPS) {
        let newGroup = groupCreator(numOfGroups);
        let newState = [...state];
        newState.groups.push(newGroup);
        return newState;
      }

    default:
      return state;
  }
}
