import React, { useState, useEffect } from "react";
import TodoItem from "./todoItem";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/users/aapitarch')
      .then(resp => resp.json())
      .then(respJson => {
        console.log(respJson)
        console.log(respJson.todos)
        const serverTasks = respJson.todos;
        setTasks(serverTasks);
      })
  }, [])

  const AddTask = async (task) => {
    await fetch('https://playground.4geeks.com/todo/todos/aapitarch', {
      method: 'POST',
      body: JSON.stringify({
        "label": task,
        "is_done": false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json()).then(() => {
      fetch('https://playground.4geeks.com/todo/users/aapitarch')
        .then(resp => resp.json())
        .then(respJson => {
          setTasks(respJson.todos);
        })
    })
  }

  const deleteTask = async (taskId) => {
        await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE",
        });
        setTasks((newTasks) => newTasks.filter((task) => task.id !== taskId));
};

  const deleteAllTasks = async () => {
    for(const task of tasks) {
      await fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
      method: "DELETE",
      });
    }
    setTasks([]);
  }

    const handleAddTask = (e) => {
		if(e.key === "Enter" && e.target.value.trim() !== "") {
			AddTask(e.target.value);
      e.target.value = "";
		}
	};

  const handleRemoveTask = (index) => {
    const taskToDelete = tasks[index];
		deleteTask(taskToDelete.id);
	};

    return (
        <div>
        <input
            type="text"
            className="task-input"
            placeholder="Añadir una tarea..."
            onKeyDown={handleAddTask}
        />
        <div className="todo-list">{tasks.length === 0 ? (
            <p>No hay tareas, añadir tareas</p>) : (tasks.map((task, index) => (
                <TodoItem key={task.id} text={task.label} onDelete={() => handleRemoveTask(index)} />
          ))
        )}
      </div>
      <button onClick={deleteAllTasks}>Eliminar todas las tareas</button>
    </div>
    );
}
export default TodoList;