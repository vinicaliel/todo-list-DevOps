import React from 'react';

function TaskList({ tasks, onDelete, onEdit }) {
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const API_URL = window.location.hostname === 'localhost'
                ? 'http://localhost:5000'
                : `http://${window.location.hostname}:5000`;

            await fetch(`${API_URL}/api/tasks/${id}`, { method: 'DELETE' });
            onDelete();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="task-list">
            {tasks.length === 0 ? <p>No tasks found.</p> : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <div className="task-info">
                                <h3>{task.title}</h3>
                                <p>{task.date} at {task.time}</p>
                            </div>
                            <div className="task-actions">
                                <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;
