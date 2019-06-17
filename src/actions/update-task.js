import {
  UPDATE_TASK_ERROR,
  UPDATE_TASK_START,
  UPDATE_TASK_SUCCESS
} from '../constants/task';

import { post } from '../api';

const updateTaskStart = () => ({
  type: UPDATE_TASK_START
});

const updateTaskSuccess = (text, status, itemId) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: {
    text,
    status,
    itemId
  }
});

const updateTaskFailed = error => ({
  type: UPDATE_TASK_ERROR,
  payload: error
});

export const updateTask = (text, status, itemId) => async (dispatch, getState) => {
  dispatch(updateTaskStart());
  const token = getState().auth.access_token;
  const taskData = new FormData();
  taskData.append('text', text);
  taskData.append('status', status);
  taskData.append('token', token);
  try {
    const result = await post(`/edit/${itemId}/?developer=alexandr`, taskData);
    if (result.data.status === 'error') {
      throw new Error(JSON.stringify(result.data.message));
    }
    dispatch(updateTaskSuccess(text, status, itemId));
  } catch (e) {
    dispatch(updateTaskFailed(JSON.parse(e.message)));
  }
};
