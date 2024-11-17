import React, {useState} from "react";
import TodoList from "./todoList";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
      		<h1 className="text-center mt-5">TODO list</h1>
     		<TodoList />
    	</div>
	);
};

export default Home;
