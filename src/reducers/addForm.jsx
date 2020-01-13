import {
  HANDLE_CHANGE,
  HANDLE_BTN_DISPLAY,
  HANDLE_CARD_DISPLAY
} from '../constant';

const initialState = {
  name: '',
  show: false
};

export const addForm = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_CHANGE:
      return { ...state, name: action.name };
    case HANDLE_BTN_DISPLAY:
      return { ...state, show: action.show };
    case HANDLE_CARD_DISPLAY:
      return { ...state, show: action.show };
    default:
      return state;
  }
};
