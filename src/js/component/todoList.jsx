import React, { useState, useEffect } from "react";
import TodoItem from "./todoItem";
import { getTasks, addTask, deleteTask } from "./apiService";

const TodoList = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const fetchTasks = async () => {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      };
      fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
		if(e.key === "Enter" && e.target.value.trim() !== "") {
			const newTask = e.target.value.trim();
			e.target.value = "";

      const addedTask = await addTask({
        label: newTask,
        done: false
      });
      if(addedTask) {
        setTasks([...tasks, addTask]);
      }
		}
	};

    const handleRemoveTask = async (index) => {
      const removeTask = tasks[index];
      const success = await deleteTask(removeTask.id);

      if(success) {
        setTasks(tasks.filter((_, i) => i !== index));
      }
	};

  return (
    <div>
      <input
        type="text"
        className="task-input"
        placeholder="Añadir una tarea..."
        onKeyDown={handleAddTask}
      />
      <div className="todo-list">
        {tasks.length === 0 ? (
          <p>No hay tareas, añadir tareas</p>
        ) : (
          tasks.map((task, index) => (
            <TodoItem
              key={index}
              text={task.label}
              onDelete={() => handleRemoveTask(index)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;