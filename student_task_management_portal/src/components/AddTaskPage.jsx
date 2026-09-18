import AddTask from "./AddTask";

const API_URL = "http://localhost:5050/api/tasks";

function AddTaskPage({ setTasks }) {
    async function handleAddTask(task) {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                status: "Pending",
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create task");
        }

        const savedTask = await response.json();
        setTasks((currentTasks) => [savedTask, ...currentTasks]);
    }

    return (
        <main className="dashboard-shell">
            <div className="tasks-header">
                <h2>Add Task</h2>
            </div>
            <AddTask onAddTask={handleAddTask} />
        </main>
    );
}

export default AddTaskPage;