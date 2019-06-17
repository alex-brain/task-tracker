import { post } from '../api';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from '../constants/auth';

const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = userData => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const login = (formData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const loginData = new FormData();
    loginData.append('username', formData.username);
    loginData.append('password', formData.password);
    const result = await post('/login?developer=alexandr', loginData);
    const userData = {
      access_token: result.data.message.token,
      login: formData.username
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    if (result.data.status === 'error') {
      throw new Error(JSON.stringify(result.data.message));
    }
    dispatch(loginSuccess(userData));
  } catch (err) {
    dispatch(loginError(JSON.parse(err.message)));
  }
};

export const logout = () => {
  localStorage.removeItem('userData');
  return {
    type: LOGOUT
  }
};
