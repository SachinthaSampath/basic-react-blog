import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getPosts } from '../../api/posts';
import { getTodos } from '../../api/todos';
import { getUser } from '../../api/users';

const User = () => {
  const { user, todos, posts } = useLoaderData();

  return (
    <>
      <h1 class="page-title">{user.name}</h1>
      <div class="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {`${user.address.street} ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
      </div>

      <h3 class="mt-4 mb-2">Posts</h3>
      <div class="card-grid">
        {posts.map((post) => (
          <div class="card" key={post.id}>
            <div class="card-header">{post.title}</div>
            <div class="card-body">
              <div class="card-preview-text">{post.body}</div>
            </div>
            <div class="card-footer">
              <Link class="btn" to={`/posts/${post.id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h3 class="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'strike-through' : ''}>
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};

const loader = async ({ params, request: { signal } }) => {
  const user = getUser(params.userId, { signal });
  const posts = getPosts({ signal, params: { userId: params.userId } });
  const todos = getTodos({ signal, params: { userId: params.userId } });

  return { user: await user, posts: await posts, todos: await todos };
};

export const UserRoute = {
  element: <User />,
  loader,
};
