import React, { useState, useEffect } from 'react';

function TaskForm({ onTaskCreated, onTaskUpdated, editingTask, setEditingTask }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDate(editingTask.date);
            setTime(editingTask.time);
        } else {
            clearForm();
        }
    }, [editingTask]);

    const clearForm = () => {
        setTitle('');
        setDate('');
        setTime('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, date, time };

        try {
            const API_URL = window.location.hostname === 'localhost'
                ? 'http://localhost:5000'
                : `http://${window.location.hostname}:5000`;

            if (editingTask) {
                await fetch(`${API_URL}/api/tasks/${editingTask.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });
                onTaskUpdated();
            } else {
                await fetch(`${API_URL}/api/tasks`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });
                onTaskCreated();
            }
            clearForm();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleCancel = () => {
        setEditingTask(null);
        clearForm();
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="form-actions">
                <button type="submit" className="submit-btn">
                    {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                {editingTask && (
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                )}
            </div>
        </form>
    );
}

export default TaskForm;
