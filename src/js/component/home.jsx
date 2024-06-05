import React, { useEffect, useState } from "react";
import Header from "./Header";
import InputTask from "./InputTask";
import List from "./List";
import Alert from "./Alert";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '' });

    const addTask = async (inputValue) => {
        const tarea = {
            label: inputValue,
            is_done: false
        };
        try {
            const resp = await fetch('https://playground.4geeks.com/todo/todos/Angelika', {
                method: "POST",
                body: JSON.stringify(tarea),
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                }
            });
            if (resp.ok) {
                const newTask = await resp.json();
                setTodos([...todos, newTask]);
                setAlert({ type: 'success', message: 'Tarea creada correctamente' });
            } else {
                setAlert({ type: 'danger', message: 'Error al intentar añadir una tarea' });
            }
        } catch (err) {
            setAlert({ type: 'danger', message: 'Error al intentar añadir una tarea' });
        }
    };

    const updateTask = async (taskId, updatedTask) => {
        try {
            const resp = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(updatedTask),
            });
            if (resp.ok) {
                setTodos(todos.map(task => task.id === taskId ? updatedTask : task));
                setAlert({ type: 'success', message: 'Tarea actualizada correctamente' });
            } else {
                setAlert({ type: 'danger', message: 'Error al intentar actualizar la tarea' });
            }
        } catch (err) {
            setAlert({ type: 'danger', message: 'Error al intentar actualizar la tarea' });
        }
    };

    const removeTask = async (taskId) => {
        try {
            const resp = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                }
            });
            if (resp.ok) {
                setTodos(todos.filter(task => task.id !== taskId));
                setAlert({ type: 'success', message: 'Tarea eliminada correctamente' });
            } else {
                setAlert({ type: 'danger', message: 'Error al intentar eliminar la tarea' });
            }
        } catch (err) {
            setAlert({ type: 'danger', message: 'Error al intentar eliminar la tarea' });
        }
    };

    const getTasks = async () => {
        try {
            const resp = await fetch('https://playground.4geeks.com/todo/users/Angelika', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                }
            });
            const data = await resp.json();
            setTodos(data.todos || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="container d-flex align-items-center justify-content-center p-8">
            <div className="todo card p-5">
                <Header />
                {alert.message && (
                    <Alert type={alert.type} message={alert.message} />
                )}
                <div className="container-sm">
                    <InputTask addTask={addTask} />
                    <List todos={todos} updateTask={updateTask} removeTask={removeTask} />
                </div>
            </div>
        </div>
    );
};

export default Home;