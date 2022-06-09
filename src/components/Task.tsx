import React, {useEffect, useRef, useState} from "react";
import {TaskStructure} from "../TaskStructure";

interface TaskProps extends TaskStructure {
	updateTask(task: TaskStructure): void;
	deleteTask(id: string): void;
}

export default function Task(props: TaskProps) {
	const [done, setDone] = useState(props.done);
	const [text, setText] = useState(props.text);
	const [important, setImportant] = useState(props.important);

	const textRef = useRef<HTMLSpanElement>(null);

	let isEditing = false;

	const changeText = () => {
		textRef.current!.contentEditable = "false";
		isEditing = false;

		if (textRef.current!.innerText.trim() === "" || textRef.current!.innerText === props.text) {
			textRef.current!.innerText = text;
			setText(prev => prev);
			return;
		}

		setText(textRef.current!.innerText);
	};

	useEffect(() => {
		props.updateTask({
			done, text, important,
			date: props.date,
			id: props.id
		});
	}, [text, done, important]);

	const date = new Date(props.date);
	const dateString = `${date.getHours()}:${date.getMinutes()} ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

	return (
		<div
			className={"task " + (props.done ? "done " : "") + (important ? "important " : "")}
			data-id={props.id}
			data-important={important}
		>
			<div className={"text-wrap"}>
				<input
					className={"is-done"}
					type={"checkbox"}
					name={"complete"}
					checked={done}
					onChange={() => {
						setDone(prev => !prev);
					}}
				/>
				<span
					className={"text"}
					ref={textRef}
					onKeyDown={(event: React.KeyboardEvent) => {
						if (!isEditing || event.key !== "Enter") return;
						event.preventDefault();
						changeText();
					}}
					onBlur={(event: React.FocusEvent) => {
						if (!isEditing) return;
						changeText();
					}}
				>
					{text}
				</span>
			</div>
			<span className={"date"}>
				<input
					type={"button"}
					value={"Edit"}
					name={"edit-button"}
					className={"edit-button"}
					hidden={done}
					onClick={() => {
						textRef.current!.contentEditable = "true";
						textRef.current!.focus();
						isEditing = true;
					}}
				/>
				<input
					type={"button"}
					value={"Delete"}
					className={"delete-button"}
					name={"delete-button"}
					onClick={() => props.deleteTask(props.id)}
				/>
				<input
					type={"button"}
					value={important? "Not important" : "Important"}
					className={"important-button"}
					name={"important-button"}
					onClick={() => {
						setImportant(prev => !prev);
					}}
				/>
				{dateString}
			</span>
		</div>
	);
}
