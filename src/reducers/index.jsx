import { combineReducers } from 'redux';
import { Boards } from './boards';
import { Lists } from './lists';
import { CheckLists } from './checklist';
import { CheckItem } from './checkItem';
import { addForm } from './addForm';

export default combineReducers({
  Boards,
  Lists,
  CheckLists,
  CheckItem,
  addForm
});
