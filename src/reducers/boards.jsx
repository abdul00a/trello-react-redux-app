import { REQUEST_BOARD_SUCCESS } from '../constant';

const initialState = {
  allBoard: []
};

export const Boards = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BOARD_SUCCESS:
      return { ...state, allBoard: action.payload };
    default:
      return state;
  }
};
