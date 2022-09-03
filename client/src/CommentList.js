import React, { useState, useEffect } from "react";
// import axios from "axios";

export default function CommentList({ comments }) {
  // const [comments, setComments] = useState([]);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );
  //   console.log(res.data);

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <div className="container p-3">{renderedComments}</div>;
}
