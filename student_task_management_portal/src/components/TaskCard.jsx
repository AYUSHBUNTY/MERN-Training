import { Link } from "react-router-dom";

function TaskCard({ id, title, description, status, onToggle, onDelete }) {
    const statusClass = status.toLowerCase().replace(/\s+/g, "-");

    return (
        <article className="task-card">
            <div className="task-card-header">
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <span className={`status-badge ${statusClass}`}>{status}</span>
            </div>

            <div className="task-actions">
                <Link to={`/tasks/${id}`} className="view-btn">
                    View Details
                </Link>
                <button className="toggle-btn" onClick={onToggle}>
                    {status === "Completed" ? "Mark Pending" : "Mark Complete"}
                </button>
                <button className="delete-btn" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </article>
    );
}

export default TaskCard;