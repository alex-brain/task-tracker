import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,

} from '../constants/auth';

const initialState = {
  access_token: '',
  isLoadingLogin: false,
  errorLogin: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        isLoadingLogin: true,
        errorLogin: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoadingLogin: false,
        errorLogin: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoadingLogin: false,
        errorLogin: payload,
      };
    case LOGOUT:
      return {
        ...state,
        access_token: '',
        isLoadingLogin: false,
        errorLogin: true,
      };
    default:
      return state;
  }
};
