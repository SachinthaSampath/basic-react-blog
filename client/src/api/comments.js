import { baseApi } from './base';

export const getComments = async (postId, options) => {
  return baseApi.get(`/posts/${postId}/comments`, options).then((res) => res.data);
};
