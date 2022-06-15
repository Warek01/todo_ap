import { createSlice } from '@reduxjs/toolkit';
import TaskStructure from '../TaskStructure';

const initialState: { value: TaskStructure[] } = {
	value: JSON.parse(localStorage.getItem('tasks') || '[]')
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask(state, action: { payload: TaskStructure }) {
			state.value.push(action.payload);
		},
		
		removeTask(state, action: { payload: string }) {
			state.value = state.value.filter(task => task.id !== action.payload);
		},
		
		updateTask(state, action: { payload: TaskStructure }) {
			const { id, text, date, done, important } = action.payload;
			state.value = state.value.map(task => {
				if (task.id === id)
					return { id, important, text, done, date };
				return task;
			});
		},
		
		clearTasks(state, action) {
			state.value = [];
		},
		
		uploadTasks(state, action) {
			localStorage.removeItem('tasks');
			localStorage.setItem('tasks', JSON.stringify(state.value));
		}
	}
});

export default tasksSlice.reducer;
export const { addTask, removeTask, updateTask, clearTasks, uploadTasks } = tasksSlice.actions;
