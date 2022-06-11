import React, {createContext, useEffect, useState} from "react";
import AppHeader from "./AppHeader/AppHeader";
import AppInput from "./AppInput/AppInput";
import TaskContainer from "./TaskContainer/TaskContainer";
import {TaskStructure} from "./Task/TaskStructure";

type Filter = "important" | "complete" | "all" | "active";

export const TaskContext = createContext({
	filter: "all" as Filter,
	clearTasks(): void {
	},
	updateFilter(filter: Filter): void {
	}
});

const App: React.FC = () => {
	const [allTasks, setAllTasks] =
		useState<TaskStructure[]>(JSON.parse(localStorage.getItem("tasks") || "[]"));
	const [visibleTasks, setVisibleTasks] = useState(allTasks);
	const [filter, setFilter] = useState<Filter>("all");

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

	const sort = (tasks: TaskStructure[]): void => {
		setVisibleTasks(allTasks.filter(t => {
			switch (filter) {
				case "all":
					return true;
				case "important":
					return t.important;
				case "active":
					return !t.done;
				case "complete":
					return t.done;
			}
		}));
	};

	const updateFilter = (filter: Filter): void => {
		setFilter(filter);
	};

	const updateTask = (task: TaskStructure) => {
		setAllTasks(tasks => arrangeTasks(
			tasks.map(t => {
				if (t.id !== task.id) return t;
				return task;
			}))
		);
	};

	const deleteTask = (id: string): void => {
		setAllTasks(tasks => tasks.filter(t => t.id !== id));
	};

	const clearTasks = (): void => {
		setAllTasks([]);
	};

	// Updating tasks in db
	useEffect(() => {
		localStorage.removeItem("tasks");
		localStorage.setItem("tasks", JSON.stringify(allTasks));
		sort(allTasks);
	}, [allTasks, filter]);

	useEffect(() => {
		window.addEventListener("keydown", event => {
			if (event.altKey && event.key === "c") {
				event.preventDefault();
				clearTasks();
			}
		});
	}, []);

	const addTask = (task: TaskStructure) => {
		if (task.text.length === 0) return;
		localStorage.setItem("tasks", JSON.stringify([...allTasks, task]));
		setAllTasks([...allTasks, task]);
	};

	return (
		<div className={"app"}>
			<TaskContext.Provider value={{updateFilter, clearTasks, filter}}>
				<AppHeader/>
				<AppInput addTask={addTask}/>
				<TaskContainer
					deleteTask={deleteTask}
					tasks={visibleTasks}
					updateTask={updateTask}
				/>
			</TaskContext.Provider>
		</div>
	);
};

export default App;
