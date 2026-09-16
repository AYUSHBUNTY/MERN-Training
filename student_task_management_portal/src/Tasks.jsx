import { Link } from "react-router-dom";

function Tasks(props){
    return (
        <main className="tasks-page">
            <div className="tasks-heading">
                <div>
                    <p className="tasks-eyebrow">Student task portal</p>
                    <h1>All Tasks</h1>
                </div>
                <span className="task-count">{props.tasks.length} tasks</span>
            </div>

            <div className="all-tasks-container">
            {
                props.tasks.map((task)=>(
                    <article className="all-task-card" key={task.id}>
                        <div className="all-task-content">
                            <span className="task-number">Task {task.id}</span>
                            <Link className="all-task-title" to={`/tasks/${task.id}`}>
                                {task.title}
                            </Link>
                        </div>
                        <p>{task.description}</p>
                        <span className={`task-status ${task.status.toLowerCase()}`}>
                            {task.status}
                        </span>
                    </article>
                ))
            }
            </div>
        </main>
    );
}

export default Tasks;