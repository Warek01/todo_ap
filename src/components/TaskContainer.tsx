import React, {Fragment} from "react";
import {TaskStructure} from "./Task/TaskStructure";
import Task from "./Task/Task";

interface TaskContainerProps {
	tasks: TaskStructure[];
	updateTask(task: TaskStructure): void;
	deleteTask(id: string): () => void;
}

export default function TaskContainer(props: TaskContainerProps) {
	const taskElements = props.tasks.map((task, index) => {
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
				hasBorder={index < props.tasks.length - 1}
			/>
		);
	});

	const emptyList = <h1 className={"tasks-empty"}>nothing here</h1>;

	const tasksContainer = (
		<div className={"task-container"}>
			{taskElements}
		</div>
	);

	return (
		<Fragment>
			{taskElements.length !== 0 ? tasksContainer : emptyList}
		</Fragment>
	);
}
