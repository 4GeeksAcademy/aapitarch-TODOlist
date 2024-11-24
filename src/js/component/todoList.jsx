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
    }).then(resp => resp.json()).then(/*respJson*/() => {
      fetch('https://playground.4geeks.com/todo/users/aapitarch')
        .then(resp => resp.json())
        .then(respJson => {
          setTasks(respJson.todos);
        })
      //const newTasks = [...task, respJson];
      //setTasks([...newTasks])
    })
  }

    const handleAddTask = (e) => {
		if(e.key === "Enter" && e.target.value.trim() !== "") {
			AddTask(e.target.value);
      e.target.value = "";
		}
	};

    //funcion para borrar tareas
  const handleRemoveTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
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
    </div>
    );
}
export default TodoList;