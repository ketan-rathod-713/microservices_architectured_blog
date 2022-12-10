const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(express.json());
const posts = {};

// Quick ex. == {
//     '32872':{
//         id:
//         title:
//         comments: [
//             {id: , content: }
//         ]
//     }
// }

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    const comment = post.comments.find((comment) => {
      return comment.id == id;
    });
    // comment.status = status;
    // here the commentUpdated is generic one so
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(data);

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("server is listening on port 4002 ");

  // each time it restarts or crash it will manage to get this done atleast wow fantastic
  const res = await axios.get("http://event-bus-srv:4005/events");

  for (let event of res.data) {
    console.log("Processsing event:", event.type);
    handleEvent(event.type, event.data);
  }
});
