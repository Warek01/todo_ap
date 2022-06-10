import React, {Fragment} from "react";
import {TaskStructure} from "../TaskStructure";
import Task from "./Task";

interface TaskContainerProps {
	allTasks: TaskStructure[];
	updateTask(task: TaskStructure): void;
	deleteTask(id: string): () => void;
}

export default function TaskContainer(props: TaskContainerProps) {
	const tasks = props.allTasks.map((task, index) => {
		return (
			<Task
				text={task.text}
				done={task.done}
				date={task.date}
				id={task.id}
				key={task.id}
				important={task.important}
				updateTask={props.updateTask}
				deleteTask={props.deleteTask}
				hasBorder={index < props.allTasks.length - 1}
			/>
		);
	});

	const emptyList = <h1 className={"tasks-empty"}>nothing here</h1>;

	const tasksContainer = (
		<div className={"task-container"}>
			{tasks}
		</div>
	);

	return (
		<Fragment>
			{tasks.length !== 0 ? tasksContainer : emptyList}
		</Fragment>
	);
}
