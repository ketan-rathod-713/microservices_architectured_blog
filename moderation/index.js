const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    setTimeout(async () => {
      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
    }, 5000);
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("server is listening on port 4003 ");
});
