import { combineReducers } from 'redux';
import createTask from './create-task';
import updateTask from './update-task';
import tasks from './tasks';
import auth from './auth';

const combinedReducers = combineReducers({
  createTask,
  updateTask,
  tasks,
  auth
});

const rootReducer = (state, action) => combinedReducers(state, action);

export default rootReducer;
