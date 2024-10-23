import { createBrowserRouter, redirect } from 'react-router-dom';
import { TodoListRoute } from './components/pages/TodoList';

import NewTodo from './components/pages/NewTodo';

export const router = createBrowserRouter([
  {
    index: true,
    ...TodoListRoute,
  },
  {
    path: '/new',
    element: <NewTodo />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const title = formData.get('title');

      if (!title) {
        return 'Title is required!';
      }

      const newTodo = await fetch(`http://localhost:3000/todos`, {
        signal: request.signal,
        method: 'POST',
        body: JSON.stringify({ title, completed: false }),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json());

      console.log('new todo ', newTodo);

      return redirect('/');
    },
  },
]);
