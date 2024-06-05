import React, { useState } from "react";

const Task = ({ task, updateTask, removeTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task.label);
    const [isChecked, setIsChecked] = useState(task.is_done);

    const handleUpdate = () => {
        updateTask(task.id, { ...task, label: editedTask, is_done: isChecked });
        setIsEditing(false);
    };

    return (
        <li className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <input
				className="me-3"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                    />
                ) : (
                    <span>{task.label}</span>
                )}
            </div>
            <div>
                {isEditing ? (
                    <button onClick={handleUpdate}>
                        <i className="fa-solid fa-check"></i>
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                )}
                <button onClick={() => removeTask(task.id)}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </li>
    );
};

export default Task;