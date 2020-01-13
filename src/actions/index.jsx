import {
  REQUEST_BOARD_SUCCESS,
  REQUEST_LIST_SUCCESS,
  TOGGLE_MODAL,
  REQUEST_CHECKLIST_SUCCESS,
  REQUEST_CHECKITEM_SUCCESS,
  ADD_LIST,
  DELETE_LIST,
  ADD_CHECKLIST,
  DELETE_CHECKLIST,
  ADD_CHECKITEM,
  DELETE_CHECKITEM,
  UPDATE_CHECKBOX,
  ADD_CARD,
  DELETE_CARD,
  CLOSE_MODAL,
  HANDLE_CARD_DISPLAY,
  HANDLE_BTN_DISPLAY,
  HANDLE_CHANGE
} from '../constant';
import globalVariable from '../globalVariable';

export const reqBoards = () => dispatch => {
  fetch(
    `https://api.trello.com/1/members/me/boards?key=${globalVariable.apiKey}&token=${globalVariable.token}`
  )
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_BOARD_SUCCESS, payload: data }));
};

export const reqLists = id => dispatch => {
  const url = `https://api.trello.com/1/boards/${id}/lists?cards=open&card_fields=name&filter=open&fields=name&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  fetch(url)
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_LIST_SUCCESS, payload: data }));
};
export const showModal = (id, name) => ({
  type: TOGGLE_MODAL,
  bool: true,
  id,
  name
});

export const reqCheckLists = id => dispatch => {
  const url = `https://api.trello.com/1/cards/${id}/checklists?checkItems=none&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  fetch(url)
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_CHECKLIST_SUCCESS, payload: data }));
};

export const reqCheckItem = id => dispatch => {
  const url = `https://api.trello.com/1/checklists/${id}/checkItems?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  fetch(url)
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_CHECKITEM_SUCCESS, payload: data }));
};

export const closeModal = () => ({ type: CLOSE_MODAL, bool: false });

export const AddList = (name, id) => async dispatch => {
  const url = `https://api.trello.com/1/lists?name=${name}&idBoard=${id}&pos=bottom&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  const response = await fetch(url, {
    method: 'POST'
  });
  const data = await response.json();
  data.cards = [];
  dispatch({ type: ADD_LIST, payload: data });
};

export const DeleteList = id => async dispatch => {
  const url = `https://api.trello.com/1/lists/${id}/closed?value=true&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  const response = await fetch(url, {
    method: 'PUT'
  });
  const data = await response.json();
  dispatch({ type: DELETE_LIST, payload: data });
};

export const AddChecklist = (name, id) => async dispatch => {
  const url = `https://api.trello.com/1/cards/${id}/checklists?name=${name}&pos=bottom&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  const response = await fetch(url, {
    method: 'POST'
  });
  const data = await response.json();
  dispatch({ type: ADD_CHECKLIST, payload: data });
};

export const DeleteCheckList = id => async dispatch => {
  const url = `https://api.trello.com/1/checklists/${id}?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  await fetch(url, {
    method: 'DELETE'
  });
  dispatch({ type: DELETE_CHECKLIST, payload: id });
};

export const AddCheckItem = (name, id) => async dispatch => {
  const url = `https://api.trello.com/1/checklists/${id}/checkItems?name=${name}&nameData=null&limits=none&pos=bottom&checked=false&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  const response = await fetch(url, {
    method: 'POST'
  });
  const data = await response.json();
  dispatch({ type: ADD_CHECKITEM, payload: data });
};

export const DeleteCheckItem = (listID, id) => async dispatch => {
  const url = `https://api.trello.com/1/checklists/${listID}/checkItems/${id}?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  await fetch(url, {
    method: 'DELETE'
  });
  dispatch({ type: DELETE_CHECKITEM, payload: id });
};

export const updateCheckState = (cardID, id, state) => async dispatch => {
  const url = `https://api.trello.com/1/cards/${cardID}/checkItem/${id}?state=${state}&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  const response = await fetch(url, {
    method: 'PUT'
  });
  const data = await response.json();
  dispatch({ type: UPDATE_CHECKBOX, payload: data });
};

export const AddCard = (name, id) => async dispatch => {
  const url = `https://api.trello.com/1/cards?name=${name}&idList=${id}&pos=bottom&keepFromSource=all&key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  const response = await fetch(url, {
    method: 'POST'
  });
  const data = await response.json();
  dispatch({ type: ADD_CARD, payload: data });
};

export const delCard = (id, listID) => async dispatch => {
  const url = `https://api.trello.com/1/cards/${id}?key=${globalVariable.apiKey}&token=${globalVariable.token}`;
  await fetch(url, {
    method: 'DELETE'
  });
  dispatch({ type: DELETE_CARD, payload: id, listID: listID });
};

export const txtValue = event => {
  const { name, value } = event.target;
  return { type: HANDLE_CHANGE, [name]: value };
};

//extra feature
export const cardDisplay = () => ({ type: HANDLE_CARD_DISPLAY, show: true });

export const BtnDisplay = () => ({ type: HANDLE_BTN_DISPLAY, show: false });
