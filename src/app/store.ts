import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksSlice from '../features/TasksSlice';
import filtersSlice from '../features/FiltersSlice';

const store = configureStore({
	reducer: {
		tasks: tasksSlice,
		filters: filtersSlice
	}
});

// export interface AppStoreStates {
// 	tasks: { value: TaskStructure[] };
// 	filters: { value: Filter };
// }

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
