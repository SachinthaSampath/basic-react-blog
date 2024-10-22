import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getTodos } from '../../api/todos';

const TodoList = () => {
  const todos = useLoaderData();
  return (
    <div>
      <h1 class="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'strike-through' : ''}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

const loader = async ({ params, request: { signal } }) => {
  return getTodos({ signal });
};

export const TodoListRoute = {
  element: <TodoList />,
  loader,
};
