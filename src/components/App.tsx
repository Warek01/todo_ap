import React, {useEffect, useState} from "react";
import AppHeader from "./AppHeader";
import AppInput from "./AppInput";
import TaskContainer from "./TaskContainer";
import {TaskStructure} from "../TaskStructure";
import TaskSort from "./TaskSort";

interface AppProps {
}

export default function App(props: AppProps) {
	const [allTasks, setAllTasks] =
		useState(JSON.parse(localStorage.getItem("tasks") || "[]") as TaskStructure[]);

	const arrangeTasks = (tasks: TaskStructure[]): TaskStructure[] => {
		const newArr = new Array<TaskStructure>(tasks.length);
		let i = 0;
		let j = tasks.length - 1;

		tasks.forEach(t => {
			if (t.important)
				newArr[i++] = t;
			else
				newArr[j--] = t;
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

	const deleteTask = (id: string) => {
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

	return (
		<div className={"app"}>

			<AppHeader/>
			<TaskSort />
			<AppInput
				addTask={(task: TaskStructure) => {
					localStorage.setItem("tasks", JSON.stringify([...allTasks, task]));
					setAllTasks([...allTasks, task]);
				}}
			/>
			<TaskContainer
				deleteTask={deleteTask}
				allTasks={allTasks}
				updateTask={updateTask}
			/>

		</div>
	);
}
