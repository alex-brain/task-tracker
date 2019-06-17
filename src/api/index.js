import axios from 'axios';
import { API_URL } from '../constants/settings';

class Api {
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'content-type': `multipart/form-data;`,
      },
    });
  }

  post = async (url, data, params) => {
    const result = await this.client.post(url, data, params);
    return result;
  };

  get = async (url, params = {}) => {
    const result = await this.client.get(url, params);
    return result;
  };

  put = async (url, data, params) => {
    const result = await this.client.put(url, data, params);
    return result;
  };

  remove = async (url, params = {}) => {
    const result = await this.client.delete(url, params);
    return result;
  };
}

const api = new Api();

export const {
  post,
  get,
  put,
  remove,
} = api;

export default api;
