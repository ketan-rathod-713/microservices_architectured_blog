const express = require("express");
const app = express();
const axios = require("axios");
// const cors = require('cors')

app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // replace it with the clusterIp name
  axios
    .post("http://posts-clusterip-srv:4000/events", event) 
    .catch((err) => console.log(err));
  axios
    .post("http://comments-srv:4001/events", event)
    .catch((err) => console.log(err));
  axios
    .post("http://query-srv:4002/events", event)
    .catch((err) => console.log(err));
  axios
    .post("http://moderation-srv:4003/events", event)
    .catch((err) => console.log(err));

  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("server is listening on port 4005 by latest 11 decemeber");
});
