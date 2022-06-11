import React, {useRef} from "react";
import {TaskStructure} from "./Task/TaskStructure";
import {nanoid} from "nanoid";
import plus_src from "../img/plus.svg";

interface InputProps {
	addTask(task: TaskStructure): void;
}

export default function AppInput(props: InputProps) {
	const input = useRef<HTMLInputElement>(null);

	const onClick = () => {
		props.addTask({
			id: `task-${nanoid()}`,
			text: input.current!.value,
			done: false,
			date: Date.now(),
			important: false
		});

		input.current!.value = "";
	};

	const onEnter = (event: React.KeyboardEvent) => {
		if (event.key !== "Enter") return;
		onClick();
	};

	return (
		<div className={"main-input-wrapper"}>
			<input
				type={"text"}
				placeholder={"Add a task"}
				id={"main-input"}
				name={"main-input"}
				ref={input}
				onKeyUp={onEnter}
			/>
			<button
				id={"add-button"}
				name={"add-button"}
				autoCorrect={"false"}
				aria-autocomplete={"none"}
				onClick={onClick}
			>
				<img src={plus_src} alt={"add"}/>
			</button>
		</div>
	);
}
