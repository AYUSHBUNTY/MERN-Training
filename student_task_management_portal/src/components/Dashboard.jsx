import StatCard from "./statcard";
import TaskCard from "./TaskCard";
function Dashboard(){
    const tasks=[{title={"Learn React"},description="Understand the basics of React and its core concepts.",status="In progress"},{title="Build a simple app", description="Create a basic react application with multiple components.",status="Completed"},{title="Deplot the app", description="Deploy the react application to a hosting service.",status="Pending"}];
    return(
        <main>
            <div className="stat-container">
                <StatCard title="Total Tasks" value={10}/>
                <StatCard title="completed" value={6}/>
                    <StatCard title="Pending" value={4}/>
            </div>

            <h2>Recent Tasks</h2>
            <div className="task-container">
                {tasks.map((task) => (
                    <TaskCard title={task.title} description={task.description} status={task.status} />
                ))};
            </div>
        </main>
    );
}

export default Dashboard;