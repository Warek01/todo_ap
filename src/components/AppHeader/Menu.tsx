import React, { useRef } from 'react';
import classNames from 'classnames';
import { clearTasks } from '../../features/TasksSlice';
import { Filter, setFilter } from '../../features/FiltersSlice';
import './Menu.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface MenuProps {
	hidden: boolean;
}

const Menu: React.FC<MenuProps> = ({ hidden }) => {
	const dispatch = useAppDispatch();
	const filter = useAppSelector(state => state.filters.value);
	const menuRef = useRef<HTMLDivElement>(null);
	
	const onClearTasks = () => {
		dispatch(clearTasks({}));
	};
	
	const onFilterChange = (filter: Filter): () => void => {
		return () => {
			dispatch(setFilter(filter));
		};
	};
	
	return (
		<div
			id={ 'menu' }
			className={ classNames('menu', { 'collapsed': hidden }) }
			ref={ menuRef }
		>
			<button
				onClick={ onClearTasks }
			>
				Clear all
			</button>
			<button
				onClick={ onFilterChange('all') }
				className={ classNames({ 'active': filter === 'all' }) }
			>
				Show all
			</button>
			<button
				onClick={ onFilterChange('complete') } className={ classNames({ 'active': filter === 'complete' }) }
			>
				Show completed
			</button>
			<button
				onClick={ onFilterChange('important') } className={ classNames({ 'active': filter === 'important' }) }
			>
				Show important
			</button>
			<button
				onClick={ onFilterChange('active') } className={ classNames({ 'active': filter === 'active' }) }
			>
				Show active
			</button>
		</div>
	);
};

export default Menu;
