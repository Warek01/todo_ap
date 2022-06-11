import React, {Fragment} from "react";
import {TaskStructure} from "../Task/TaskStructure";
import Task from "../Task/Task";
import "./TaskContainer.scss";

interface TaskContainerProps {
	tasks: TaskStructure[];
	updateTask(task: TaskStructure): void;
	deleteTask(id: string): () => void;
}

const TaskContainer: React.FC<TaskContainerProps> = ({deleteTask, tasks, updateTask}) => {
	const taskElements: JSX.Element[] = tasks.map((task, index) => {
		return <Task
			text={task.text}
			done={task.done}
			date={task.date}
			id={task.id}
			key={task.id}
			important={task.important}
			updateTask={updateTask}
			deleteTask={deleteTask}
			hasBorder={index < tasks.length - 1}
		/>;
	});

	const emptyList: JSX.Element = <h1 className={"tasks-empty"}>nothing here</h1>;
	const tasksContainer: JSX.Element = <div className={"task-container"}>{taskElements}</div>;

	return (
		<Fragment>
			{taskElements.length ? tasksContainer : emptyList}
		</Fragment>
	);
};

export default TaskContainer;
