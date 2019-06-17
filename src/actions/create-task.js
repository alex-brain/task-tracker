import {
  CREATE_TASK_ERROR,
  CREATE_TASK_START,
  CREATE_TASK_SUCCESS
} from '../constants/task';

import { post } from '../api';

const createTaskStart = () => ({
  type: CREATE_TASK_START
});

const createTaskSuccess = data => ({
  type: CREATE_TASK_SUCCESS,
  payload: data
});

const createTaskFailed = error => ({
  type: CREATE_TASK_ERROR,
  payload: error
});

export const createTask = (data) => async (dispatch) => {
  dispatch(createTaskStart());
  const taskData = new FormData();
  taskData.append('username', data.username);
  taskData.append('email', data.email);
  taskData.append('text', data.text);
  try {
    const result = await post('/create?developer=alexandr', taskData);
    if (result.data.status === 'error') {
      throw new Error(JSON.stringify(result.data.message));
    }
    dispatch(createTaskSuccess(result.data));
  } catch (e) {
    dispatch(createTaskFailed(JSON.parse(e.message)));
  }
};
