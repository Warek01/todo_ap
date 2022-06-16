import React, { useRef, KeyboardEventHandler, FC } from 'react';
import { nanoid } from 'nanoid';
import plus_src from '../../img/plus.svg';
import './AppInput.scss';
import { addTask } from '../../features/TasksSlice';
import { useAppDispatch } from '../../app/hooks';

const AppInput: FC = () => {
	const input = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	
	const onAddButtonClick = (): void => {
		dispatch(addTask({
			id: `task-${ nanoid() }`,
			text: input.current!.value,
			done: false,
			date: Date.now(),
			important: false
		}));
		
		input.current!.value = '';
	};
	
	const onEnterClick: KeyboardEventHandler<HTMLInputElement>  = event => {
		if (event.key !== 'Enter') return;
		onAddButtonClick();
	};
	
	return (
		<div className={ 'main-input-wrapper' }>
			<input
				type={ 'text' }
				placeholder={ 'Add a task' }
				id={ 'main-input' }
				name={ 'main-input' }
				ref={ input }
				onKeyUp={ onEnterClick }
			/>
			<button
				id={ 'add-button' }
				name={ 'add-button' }
				autoCorrect={ 'false' }
				aria-autocomplete={ 'none' }
				onClick={ onAddButtonClick }
			>
				<img src={ plus_src } alt={ 'add' }/>
			</button>
		</div>
	);
}

export default AppInput;
