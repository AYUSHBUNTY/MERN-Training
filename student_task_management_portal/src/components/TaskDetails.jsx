import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function TaskDetails({ tasks }){
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:5050/api/tasks/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setTask(data))
            .catch((error) => {
                console.error("Error fetching task:", error);
            }).finally(() => {
                setLoading(false);
            })
            
            },[id]);
    
    if (loading) {
        return <h1>Loading...</h1>;
    }

    if(!task) {

        return <h1>Task not found</h1>;
    }
    return (
        <div>
            <h1>Task Details</h1>
            <h2>{task.title}</h2>
            <h2>{task.description}</h2>
            <h2>Status:{task.status}</h2>
        </div>
    );
}
export default TaskDetails;