import React from 'react';

function TaskList({ tasks, onDelete, onEdit }) {
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
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
                        <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <div className="task-info">
                                <h3>{task.title}</h3>
                                <p>{task.date} at {task.time}</p>
                            </div>
                            <div className="task-actions">
                                <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;
