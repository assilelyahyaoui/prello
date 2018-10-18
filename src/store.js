// Modules
import { createStore, combineReducers } from 'redux';

// Sub Reducers
// import board from './reducer/board';
// import list from './reducer/list';
import checkItem from './reducer/checkItem';
import checkList from './reducer/checklist';
import list from './reducer/list';
import lists from './reducer/lists';


export default createStore(
  combineReducers({
    // board,
    lists,
    list,
    checkItem,
    checkList,
  })
  // , require('./bootstrap.json');
);