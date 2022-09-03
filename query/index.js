const express = require("express");
const app = express();
const cors = require("cors");

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

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log(data);

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("server is listening on port 4002 ");
});
