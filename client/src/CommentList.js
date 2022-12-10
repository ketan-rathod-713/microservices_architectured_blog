import React, { useState, useEffect } from "react";
// import axios from "axios";

export default function CommentList({ comments }) {
  // const [comments, setComments] = useState([]);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://posts.com/posts/${postId}/comments`
  //   );
  //   console.log(res.data);

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "Pending") {
      content = "This comment is awaiting moderation";
    }
    if (comment.status === "rejected") {
      content = "This comment had been rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <div className="container p-3">{renderedComments}</div>;
}
