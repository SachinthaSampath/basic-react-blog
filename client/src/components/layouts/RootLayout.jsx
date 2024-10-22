import React from 'react';
import { Link, Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';

const RootLayout = () => {
  const { state } = useNavigation();
  const isLoading = state === 'loading';

  return (
    <>
      <nav class="top-nav">
        <div class="nav-text-large">React Routing Blog</div>
        <ul class="nav-list">
          <li>
            <Link to={'/posts'}>Posts</Link>
          </li>
          <li>
            <Link to={'/users'}>Users</Link>
          </li>
          <li>
            <Link to={'/todos'}>Todos</Link>
          </li>
        </ul>
      </nav>
      <ScrollRestoration />
      {isLoading ? <div class="loading-spinner"></div> : <> </>}
      <div class={`container ${isLoading ? 'loading' : ''}`}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
