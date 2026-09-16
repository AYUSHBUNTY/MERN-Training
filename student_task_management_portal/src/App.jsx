import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Tasks from "./Tasks";
import AddTaskPage from "./components/AddTaskPage";
import { useState, useEffect } from "react";
import TaskDetails from "./components/TaskDetails";

function App() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5050/api/tasks")
            .then((response) => {
                if (!response.ok) throw new Error("Could not load tasks");
                return response.json();
            })
            .then((data) => setTasks(data))
            .catch((error) => console.error("Error loading tasks:", error));
    }, []);
    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
                <Route path="/tasks" element={<Tasks tasks={tasks} />} />
                <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
                <Route path="/add-task" element={<AddTaskPage />} />
            </Routes>
        </div>
    );
}

export default App;
