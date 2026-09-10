import { useState } from "react";

function AddTask(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form Submitted!");
    }

    return (
        <div>
            <label>Add Task</label>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p>Current title: {title}</p>
                <br></br>

                <label>Add Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /><br></br>
                <button type="submit">Add Task</button>
                <p>Current description: {description}</p>
            </form>
        </div>
    );
}

export default AddTask;