import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './index.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {
        try {
            // Dynamically determine API URL based on current hostname
            const API_URL = window.location.hostname === 'localhost'
                ? 'http://localhost:5000'
                : `http://${window.location.hostname}:5000`;

            const response = await fetch(`${API_URL}/api/tasks`);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskCreated = () => {
        fetchTasks();
    };

    const handleTaskUpdated = () => {
        setEditingTask(null);
        fetchTasks();
    };

    const handleTaskDeleted = () => {
        fetchTasks();
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Todo List DevOps</h1>
            </header>
            <main className="app-content">
                <section className="form-section">
                    <h2>{editingTask ? 'Edit Task' : 'New Task'}</h2>
                    <TaskForm
                        onTaskCreated={handleTaskCreated}
                        onTaskUpdated={handleTaskUpdated}
                        editingTask={editingTask}
                        setEditingTask={setEditingTask}
                    />
                </section>
                <section className="list-section">
                    <h2>All Tasks</h2>
                    <TaskList
                        tasks={tasks}
                        onDelete={handleTaskDeleted}
                        onEdit={handleEditClick}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;
