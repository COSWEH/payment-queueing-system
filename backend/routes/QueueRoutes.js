const express = require("express");

const {
  getLatestQueueNumber,
  getAllQueues,
  createQueue,
  updateQueue,
  deleteQueue,
} = require("../controllers/QueueController");

const routes = express.Router();

routes.get("/number", getLatestQueueNumber);
routes.get("/", getAllQueues);
routes.post("/", createQueue);
routes.put("/", updateQueue);
routes.delete("/:id", deleteQueue);

module.exports = routes;
