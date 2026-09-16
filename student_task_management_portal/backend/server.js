require("dotenv").config();

// bring express in node.js
const express = require("express");

// installing cors middleware
const cors = require("cors");

// create an express app
const app = express();


app.get("/", (req, res) => {
    res.send("Back-end server is running");
});

const mongoose = require("mongoose");

app.use(cors());// use cors middleware to handle requests from different origins
app.use(express.json());// use express.json() middleware to parse incoming JSON requests

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const tasks =[
        {
              id:1,
              title:"Learn React",
              description:"Understanding Components",
              status: "Completed"
        },
        {
              id:2,
              title:"Learn JavaScript",
              description:"Understanding Variables, Functions",
              status: "Pending"
        }
    ];

//read operation  in backend
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
    });

app.get("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});

// create operation in backend
app.post("/api/tasks", (req, res) => {
    const nextId = tasks.reduce(
        (highestId, task) => Math.max(highestId, Number(task.id) || 0), 0) + 1;
    const newTask = { ...req.body, id: nextId };
    tasks.push(newTask);
    res.json(newTask);
});

// update operation in backend
app.put("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    task.status = req.body.status;
    res.json(task);
});

// delete operation in backend
app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask[0]);
});

//our api route (testing)
app.listen(5050, () => {
    console.log("Server is running on port 5050");
});