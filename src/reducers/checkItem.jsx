import {
  REQUEST_CHECKITEM_SUCCESS,
  ADD_CHECKITEM,
  DELETE_CHECKITEM,
  UPDATE_CHECKBOX
} from '../constant';

const initialState = {
  checkItems: []
};

export const CheckItem = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CHECKITEM_SUCCESS:
      return { ...state, checkItems: action.payload };
    case ADD_CHECKITEM:
      return { ...state, checkItems: state.checkItems.concat(action.payload) };
    case DELETE_CHECKITEM:
      return {
        ...state,
        checkItems: state.checkItems.filter(item => item.id !== action.payload)
      };
    case UPDATE_CHECKBOX:
      return {
        ...state,
        checkItems: state.checkItems.map(item => {
          if (item.id === action.payload.id) {
            item.state = action.payload.state;
          }
          return item;
        })
      };
    default:
      return state;
  }
};
