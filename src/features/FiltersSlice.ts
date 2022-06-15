import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: Filter } = {
	value: 'all'
};

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilter(state, action: {payload: Filter}) {
			state.value = action.payload;
		}
	}
});

export type Filter = 'important' | 'complete' | 'all' | 'active';
export default filtersSlice.reducer;
export const { setFilter } = filtersSlice.actions;
