import React, { ReactElement } from "react";

interface PostcardProps {
  post: Post;
}

function Postman({ post }: PostcardProps): ReactElement {
  // this function will return a props which is a react element so we have to indicate it here
  return (
    <div>
      <p>{post.title}</p>
      <h2> {post.body}</h2>
    </div>
  );
}

export default Postman;
