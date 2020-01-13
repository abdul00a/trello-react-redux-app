import {
  REQUEST_LIST_SUCCESS,
  TOGGLE_MODAL,
  ADD_LIST,
  DELETE_LIST,
  ADD_CARD,
  DELETE_CARD,
  CLOSE_MODAL
} from '../constant';

const initialState = {
  allList: [],
  open: false,
  cardID: '',
  cardName: ''
};

export const Lists = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LIST_SUCCESS:
      return { ...state, allList: action.payload };
    case TOGGLE_MODAL:
      return {
        ...state,
        open: action.bool,
        cardID: action.id,
        cardName: action.name
      };

    case CLOSE_MODAL:
      return { ...state, open: action.bool };

    case ADD_LIST:
      return { ...state, allList: state.allList.concat(action.payload) };
    case DELETE_LIST:
      return {
        ...state,
        allList: state.allList.filter(li => li.id !== action.payload.id)
      };
    case ADD_CARD:
      return {
        ...state,
        allList: state.allList.map(ele => {
          if (ele.id === action.payload.idList) {
            ele.cards = ele.cards.concat(action.payload);
          }
          return ele;
        })
      };
    case DELETE_CARD:
      return {
        ...state,
        allList: state.allList.map(ele => {
          if (ele.id === action.listID) {
            ele.cards = ele.cards.filter(ele => ele.id !== action.payload);
          }
          return ele;
        })
      };
    default:
      return state;
  }
};
