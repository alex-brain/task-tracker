import {
  CREATE_TASK_START,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
} from '../constants/task';

let initialState = {
  createdTask: null,
  createTaskLoading: false,
  createTaskError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_TASK_START:
      return {
        ...state,
        createTaskLoading: true,
        createTaskError: null
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        createdTask: payload,
        createTaskLoading: false
      };
    case CREATE_TASK_ERROR:
      return {
        ...state,
        createTaskError: payload,
        createTaskLoading: false
      };
    default:
      return { ...state };
  }
};
