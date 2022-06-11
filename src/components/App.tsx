import React, {useEffect, useState} from "react";
import AppHeader from "./AppHeader/AppHeader";
import AppInput from "./AppInput";
import TaskContainer from "./TaskContainer";
import {TaskStructure} from "./Task/TaskStructure";
import TaskSort from "./TaskSort";

const App: React.FC = () => {
	const [allTasks, setAllTasks] =
		useState<TaskStructure[]>(JSON.parse(localStorage.getItem("tasks") || "[]"));

	const arrangeTasks = (tasks: TaskStructure[]): TaskStructure[] => {
		if (!tasks.length) return [];
		const newArr = new Array<TaskStructure>();

		tasks.forEach(t => {
			if (t.important) newArr.push(t);
		});

		tasks.forEach(t => {
			if (!t.important) newArr.push(t);
		});

		return newArr;
	};

	const updateTask = (task: TaskStructure) => {
		setAllTasks(tasks => arrangeTasks(
			tasks.map(t => {
				if (t.id !== task.id) return t;
				return task;
			}))
		);
	};

	const deleteTask = (id: string) => () => {
		setAllTasks(tasks => tasks.filter(t => t.id !== id));
	};

	// Updating tasks in db
	useEffect(() => {
		localStorage.removeItem("tasks");
		localStorage.setItem("tasks", JSON.stringify(allTasks));
	}, [allTasks]);

	window.addEventListener("keydown", event => {
		if (event.altKey && event.key === "c") {
			event.preventDefault();
			setAllTasks([]);
		}
	});

	const addTask = (task: TaskStructure) => {
		if (task.text.length === 0) return;
		localStorage.setItem("tasks", JSON.stringify([...allTasks, task]));
		setAllTasks([...allTasks, task]);
	};

	return (
		<div className={"app"}>
			<AppHeader/>
			<TaskSort/>
			<AppInput addTask={addTask}/>
			<TaskContainer
				deleteTask={deleteTask}
				allTasks={allTasks}
				updateTask={updateTask}
			/>
		</div>
	);
};

export default App;
