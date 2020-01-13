import {
  REQUEST_CHECKLIST_SUCCESS,
  ADD_CHECKLIST,
  DELETE_CHECKLIST
} from '../constant';

const initialState = {
  checkList: []
};

export const CheckLists = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CHECKLIST_SUCCESS:
      return { ...state, checkList: action.payload };
    case ADD_CHECKLIST:
      return { ...state, checkList: state.checkList.concat(action.payload) };
    case DELETE_CHECKLIST:
      return {
        ...state,
        checkList: state.checkList.filter(
          checklist => checklist.id !== action.payload
        )
      };
    default:
      return state;
  }
};
