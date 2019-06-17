import qs from 'qs';
import { get } from '../api';
import {
  GET_TASKS_ERROR,
  GET_TASKS_START,
  GET_TASKS_SUCCESS
} from '../constants/tasks';


const getTasksStart = () => ({
  type: GET_TASKS_START
});

const getTasksSuccess = data => ({
  type: GET_TASKS_SUCCESS,
  payload: data
});

const getTasksFailed = error => ({
  type: GET_TASKS_ERROR,
  payload: error
});

export const getTasks = (page, field, direction) => async (dispatch) => {
  dispatch(getTasksStart());
  try {
    const urlParams = {
      page,
    };
    if (field) {
      urlParams.field = field;
    }
    if (direction) {
      urlParams.sort_direction = direction;
    }
    const urlStringify = qs.stringify(urlParams);
    const result = await get(`/?developer=alexandr&${urlStringify}`);
    dispatch(getTasksSuccess(result.data.message));
  } catch (e) {
    dispatch(getTasksFailed(e.message));
  }
};
