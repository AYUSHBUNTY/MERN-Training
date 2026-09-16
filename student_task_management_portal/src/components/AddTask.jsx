import { useState } from "react";

function AddTask({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle || !trimmedDescription) return;

        const newTask = {
            title: trimmedTitle,
            description: trimmedDescription,
            status: "Pending"
        };

        try {
            await onAddTask(newTask);
            setTitle("");
            setDescription("");
        } catch (error) {
            // The values remain in the form so the user can retry.
            console.error("Error submitting task:", error);
        }
    }

    return (
        <div className="add-task-panel">
            <h2>Add New Task</h2>

            <form className="task-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <button className="primary-btn" type="submit">
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default AddTask;
