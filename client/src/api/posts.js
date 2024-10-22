import { baseApi } from './base';

export function getPosts(options) {
  console.log('getPosts options', options);
  // NOTE: { signal, params: { userId: params.userId } } => options

  // NOTE: data formats
  // loader options = request, params, context
  // getPosts options = signal, params
  // axios receives = signal, params

  return baseApi.get('/posts', options).then((res) => res.data);
}

export const getPost = async (postId, options) => {
  return baseApi.get(`/posts/${postId}`, options).then((res) => res.data);
};
