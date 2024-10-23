import React, { useEffect, useRef } from 'react';
import { Form, Link, useLoaderData, useNavigation } from 'react-router-dom';
import { getTodos } from '../../api/todos';

const TodoList = () => {
  const {
    todos,
    searchParams: { query },
  } = useLoaderData();

  const { state } = useNavigation();

  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  return (
    <div className="container">
      <h1 class="page-title mb-2">
        Todos
        <div className="title-btns">
          <Link to="/new" className="btn">
            New
          </Link>
        </div>
      </h1>

      <Form className="form" method="get" action="/">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Search</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <button className="btn">Search</button>
        </div>
      </Form>
      {state === 'loading' && <div class="loading-spinner"></div>}
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

const loader = async ({ params, request: { signal, url } }) => {
  const urlTemp = new URL(url);
  const searchParams = urlTemp.searchParams;
  const query = searchParams.get('query');

  return { searchParams: { query }, todos: await fetch(`http://localhost:3000/todos?q=${query ?? ''}`, { signal }).then((res) => res.json()) };
};

export const TodoListRoute = {
  element: <TodoList />,
  loader,
};
