import React from "react";
import Task from "./Task";

const List = ({ todos, updateTask, removeTask }) => {
	return (
		<ul className="list-group">
			{todos.length === 0 ? (
				<li className="list-group-item text-center text-muted">
					No hay tareas, añadir tareas
				</li>
			) : (
				todos.map((task) => (
					<Task key={task.id} task={task} updateTask={updateTask} removeTask={removeTask} />
				))
			)}
		</ul>
	);
};

export default List;