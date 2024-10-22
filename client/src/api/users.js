import { baseApi } from './base';

export const getUsers = async (options) => {
  return baseApi.get('/users', options).then((res) => res.data);
};

export const getUser = async (userId, options) => {
  return baseApi.get(`/users/${userId}`, options).then((res) => res.data);
};
