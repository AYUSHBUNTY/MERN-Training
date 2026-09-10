import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import { useState } from "react";
import AddTask from "./AddTask";

function Dashboard() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Learn React",
            description: "Understand the basics of React and its core concepts.",
            status: "In progress"
        },
        {
            id: 2,
            title: "Build a simple app",
            description: "Create a basic React application with multiple components.",
            status: "Completed"
        },
        {
            id: 3,
            title: "Deploy the app",
            description: "Deploy the React application to a hosting service.",
            status: "Pending"
        }
    ]);

    function toggleTask(id) {
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        status:
                            task.status === "Completed"
                                ? "Pending"
                                : "Completed"
                    };
                }

                return task;
            })
        );
    }

    function addTask(newTask) {
        console.log("New Task", newTask);
    }

    return (
        <main>
            <div className="stat-container">
                <StatCard title={"Total tasks"} value={10} />
                <StatCard title={"Completed tasks"} value={5} />
                <StatCard title={"Pending tasks"} value={8} />
            </div>

            <AddTask onAddTask={AddTask}/>

            <h2>Recent Tasks</h2>

            <div className="task-container">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        onToggle={() => toggleTask(task.id)}
                    />
                ))}
            </div>
        </main>
    );
}

export default Dashboard;