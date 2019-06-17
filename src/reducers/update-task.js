import {
  UPDATE_TASK_START,
  UPDATE_TASK_ERROR,
} from '../constants/task';

let initialState = {
  updatedTask: null,
  updateTaskLoading: false,
  updateTaskError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_TASK_START:
      return {
        ...state,
        updateTaskLoading: true,
        updateTaskError: null
      };
    case UPDATE_TASK_ERROR:
      return {
        ...state,
        updateTaskError: payload,
        updateTaskLoading: false
      };
    default:
      return { ...state };
  }
};
