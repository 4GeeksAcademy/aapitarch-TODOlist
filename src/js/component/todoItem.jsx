import React from "react";

const TodoItem = ({text, onDelete}) => {
    return (
        <div className="todo-item">
            <span>{text}</span>
            <button onClick={onDelete} className="delete-button"><i className="fa-solid fa-trash-can"></i></button>
        </div>
        
    );
}

export default TodoItem;