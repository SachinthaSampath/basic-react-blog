import { createBrowserRouter, Navigate, useRouteError } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import { PostRoute } from './components/pages/Post';
import { PostListRoute } from './components/pages/PostList';
import { TodoListRoute } from './components/pages/TodoList';

import { UserRoute } from './components/pages/User';
import { UserListRoute } from './components/pages/UserList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to={'/posts'} />,
          },
          {
            path: 'posts',
            children: [
              {
                index: true,
                ...PostListRoute,
              },
              {
                path: ':postId',
                ...PostRoute,
              },
            ],
          },
          {
            path: 'users',
            children: [
              {
                index: true,
                ...UserListRoute,
              },
              {
                path: ':userId',
                ...UserRoute,
              },
            ],
          },
          {
            path: 'todos',
            children: [
              {
                index: true,
                ...TodoListRoute,
              },
            ],
          },
          {
            path: '*',
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <h1>Error - Something went wrong.</h1>
      {import.meta.env.MODE !== 'production' && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
