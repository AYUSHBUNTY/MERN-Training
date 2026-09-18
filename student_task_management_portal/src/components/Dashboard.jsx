import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

const API_URL = "http://localhost:5050/api/tasks";

function Dashboard({ tasks = [], setTasks }) {
    const completedTasks = tasks.filter(
        (task) => task.status?.toLowerCase() === "completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status?.toLowerCase() === "pending"
    ).length;

    async function addTask(newTask) {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: newTask.title,
                    description: newTask.description,
                    status: "Pending",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            const savedTask = await response.json();
            setTasks((currentTasks) => [savedTask, ...currentTasks]);
        } catch (error) {
            console.error("Create error:", error);
        }
    }

    async function toggleTask(id) {
        const task = tasks.find(
            (item) => String(item._id) === String(id)
        );

        if (!task) return;

        const newStatus =
            task.status?.toLowerCase() === "completed"
                ? "Pending"
                : "Completed";

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            const updatedTask = await response.json();

            setTasks((currentTasks) =>
                currentTasks.map((item) =>
                    String(item._id) === String(id)
                        ? updatedTask
                        : item
                )
            );
        } catch (error) {
            console.error("Update error:", error);
        }
    }

    async function deleteTask(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            await response.json();

            setTasks((currentTasks) =>
                currentTasks.filter(
                    (item) => String(item._id) !== String(id)
                )
            );
        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    return (
        <main>
            <div className="stack-container">
                <StatCard title="Total Tasks" value={tasks.length} />
                <StatCard title="Completed" value={completedTasks} />
                <StatCard title="Pending" value={pendingTasks} />
            </div>

            <AddTask onAddTask={addTask} />

            <h2>Recent Tasks</h2>

            <div className="task-container">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        onToggle={() => toggleTask(task._id)}
                        onDelete={() => deleteTask(task._id)}
                    />
                ))}
            </div>
        </main>
    );
}

export default Dashboard;