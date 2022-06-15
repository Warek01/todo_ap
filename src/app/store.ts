import {configureStore} from '@reduxjs/toolkit';
import tasksSlice from '../features/TasksSlice';
import filtersSlice, { Filter } from '../features/FiltersSlice';
import TaskStructure from '../TaskStructure';

export default configureStore({
	reducer: {
		tasks: tasksSlice,
		filters: filtersSlice
	}
});

export interface AppStoreStates {
	tasks: { value: TaskStructure[] };
	filters: { value: Filter };
}
