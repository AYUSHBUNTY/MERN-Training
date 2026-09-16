import AddTask from "./AddTask";

function AddTaskPage() {
    function handleAddTask(task) {
        console.log("New task added:", task);
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