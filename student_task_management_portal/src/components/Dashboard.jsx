import StatCard from "./statcard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard(props) {

    const totalTasks = props.tasks.length;
    const completedTasks = props.tasks.filter(
        (task) => task.status.toLowerCase() === "completed"
    ).length;
    const pendingTasks = props.tasks.filter(
        (task) => task.status.toLowerCase() === "pending"
    ).length;

    async function toggleTask(id){
        const task = props.tasks.find((task) => task.id === id);
        if (!task) return;
        const newStatus = task.status === "Completed" ? "Pending" : "Completed";
        try {
            const response = await fetch(`http://localhost:5050/api/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) throw new Error("Could not update task");

            const updatedTask = await response.json();
            props.setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask.id === id ? updatedTask : currentTask
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    async function addTask(newTask){
        try {
            const response = await fetch("http://localhost:5050/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newTask.title,
                    description: newTask.description,
                    status: newTask.status,
                }),
            });
            if (!response.ok) throw new Error("Could not add task");

            const savedTask = await response.json();
            props.setTasks((currentTasks) => [...currentTasks, savedTask]);
        } catch (error) {
            console.error("Error adding task:", error);
            throw error;
        }
    }

    async function deleteTask(id){
        try {
            const response = await fetch(`http://localhost:5050/api/tasks/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Could not delete task");

            const deletedTask = await response.json();
            props.setTasks((currentTasks) =>
                currentTasks.filter((task) => task.id !== id)
            );
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    return (
        <main>
        
            <div className="stack-container">
                <StatCard title="Total Tasks" value={totalTasks}/>
                <StatCard title="Completed" value={completedTasks}/>
                <StatCard title="Pending" value={pendingTasks}/>
                
            </div>

            <AddTask  onAddTask={addTask}/>

            <h2>Recent Tasks</h2>

            <div className="task-container">
                {props.tasks.map((task)=>(
                    <TaskCard 
                        key={task.id} 
                        id ={task.id}
                        title={task.title} 
                        description={task.description} 
                        status={task.status}
                        onToggle={()=>toggleTask(task.id)} 
                        onDelete={()=>deleteTask(task.id)}
                    />
                ))}
            </div>

        </main>
    );
}

export default Dashboard;
