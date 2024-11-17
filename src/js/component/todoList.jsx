import React, { useState } from "react";
import TodoItem from "./todoItem";

const TodoList = () => {

    const [tasks, setTasks] = useState([]);

    const handleAddTask = (e) => {
		if(e.key === "Enter" && e.target.value.trim() !== "") {
			setTasks([...tasks, e.target.value.trim()]);
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
                <TodoItem key={index} text={task} onDelete={() => handleRemoveTask(index)} />
          ))
        )}
      </div>
    </div>
    );
}

export default TodoList;