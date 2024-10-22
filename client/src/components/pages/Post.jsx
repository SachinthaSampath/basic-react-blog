import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getComments } from '../../api/comments';
import { getUser } from '../../api/users';
import { getPost } from '../../api/posts';

const Post = () => {
  const { post, comments, user } = useLoaderData();

  return (
    <div>
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${post.userId}`}>{user?.name ?? ''}</Link>
      </span>
      <div>{post.body}</div>

      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => (
          <div className="card" key={comment.id}>
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const loader = async ({ params, request: { signal } }) => {
  const post = getPost(params.postId, { signal });
  const comments = getComments(params.postId, { signal });
  const user = getUser(post.userId, { signal });

  return { comments: await comments, post: await post, user: await user };
};

export const PostRoute = {
  element: <Post />,
  loader,
};
