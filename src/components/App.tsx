import React, { useEffect } from 'react';
import AppHeader from './AppHeader/AppHeader';
import AppInput from './AppInput/AppInput';
import TaskContainer from './TaskContainer/TaskContainer';
import { uploadTasks } from '../features/TasksSlice';
import { useAppDispatch } from '../app/hooks';


const App: React.FC = () => {
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		window.addEventListener('beforeunload', event => {
			dispatch(uploadTasks({}));
		});
	}, [dispatch]);
	
	return (
		<div className={ 'app' }>
			<AppHeader/>
			<AppInput/>
			<TaskContainer/>
		</div>
	);
};

export default App;
