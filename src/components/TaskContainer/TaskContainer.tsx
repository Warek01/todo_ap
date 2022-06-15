import React from 'react';
import TaskStructure from '../../TaskStructure';
import Task from '../Task/Task';
import './TaskContainer.scss';
import { useSelector } from 'react-redux';
import { AppStoreStates } from '../../app/store';
import { Filter } from '../../features/FiltersSlice';

const TaskContainer: React.FC = () => {
	const tasks: TaskStructure[] = useSelector((state: AppStoreStates) => state.tasks.value);
	const filter: Filter = useSelector((state: AppStoreStates) => state.filters.value);
	
	const arrangedTasks: TaskStructure[] = [];
	
	tasks.forEach(task => {
		if (task.important) arrangedTasks.push(task);
	});
	
	tasks.forEach(task => {
		if (!task.important) arrangedTasks.push(task);
	});
	
	const taskElements: JSX.Element[] = [];
	
	arrangedTasks.forEach(task => {
		if (filter === 'all' ||
			(filter === 'important' && task.important) ||
			(filter === 'complete' && task.done) ||
			(filter === 'active' && !task.done)
		)
			taskElements.push(<Task
				text={ task.text }
				done={ task.done }
				date={ task.date }
				id={ task.id }
				key={ task.id }
				important={ task.important }
			/>);
	});
	
	
	const emptyList: JSX.Element = <h1 className={ 'tasks-empty' }>nothing here</h1>;
	const tasksContainer: JSX.Element = <div className={ 'task-container' }>{ taskElements }</div>;
	
	return (
		<>
			{ taskElements.length ? tasksContainer : emptyList }
		</>
	);
};

export default TaskContainer;
