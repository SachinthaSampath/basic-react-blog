import { baseApi } from './base';

export const getTodos = async (options) => {
  return baseApi.get('/todos', options).then((res) => res.data);
};
