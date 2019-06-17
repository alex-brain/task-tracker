import {
  GET_TASKS_START,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
} from '../constants/tasks';

import {
  UPDATE_TASK_SUCCESS,
} from '../constants/task';

let initialState = {
  tasks: [],
  totalTaskCount: '0',
  getTasksLoading: false,
  getTasksError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TASKS_START:
      return {
        ...state,
        getTasksLoading: true,
        getTasksError: false
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload.tasks,
        totalTaskCount: payload.total_task_count,
        getTasksLoading: false
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        getTasksError: payload,
        getTasksLoading: false
      };
    case UPDATE_TASK_SUCCESS:
      const tasks = state.tasks.map((item) => {
        if (item.id === payload.itemId) {
          item.text = payload.text;
          item.status = payload.status;
        }
        return item;
      });
      return {
        ...state,
        tasks
      };
    default:
      return { ...state };
  }
};
