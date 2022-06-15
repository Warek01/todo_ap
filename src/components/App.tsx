import React, { useEffect } from 'react';
import AppHeader from './AppHeader/AppHeader';
import AppInput from './AppInput/AppInput';
import TaskContainer from './TaskContainer/TaskContainer';
import { useDispatch } from 'react-redux';
import { uploadTasks } from '../features/TasksSlice';


const App: React.FC = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		window.addEventListener('beforeunload', event => {
			dispatch(uploadTasks({}));
		});
	}, []);
	
	return (
		<div className={ 'app' }>
			<AppHeader/>
			<AppInput/>
			<TaskContainer/>
		</div>
	);
};

export default App;
