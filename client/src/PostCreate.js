import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault(); // prevennt default action by browser

    await axios.post("http://posts.com/posts/create", { // here we are requesting to the load balancer ingress nginx, we also need to make cluster ip service so that it can redirect request to this pod and so that we can server html css and js
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
