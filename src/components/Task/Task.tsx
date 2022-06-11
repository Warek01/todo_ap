import React, {useCallback, useEffect, useRef, useState} from "react";
import {TaskStructure} from "./TaskStructure";
import classNames from "classnames";
import "./Task.scss";
import done_src from "../../img/done.svg";
import star_src from "../../img/star.svg";
import bin_src from "../../img/bin.svg";
import pen_src from "../../img/pen.svg";

interface TaskProps extends TaskStructure {
	updateTask(task: TaskStructure): void;
	deleteTask(id: string): () => void;
	hasBorder: boolean;
}

const Task: React.FC<TaskProps> = (props) => {
	const [done, setDone] = useState<boolean>(props.done);
	const [text, setText] = useState<string>(props.text);
	const [important, setImportant] = useState<boolean>(props.important);
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const textRef = useRef<HTMLSpanElement>(null);

	const handleSetDone = () => {
		setDone(prevState => !prevState);
	};

	const handleOnKeyDown = (event: React.KeyboardEvent) => {
		if (!isEditing || event.key !== "Enter") return;
		event.preventDefault();
		changeText();
	};

	const handleOnBlur = (event: React.FocusEvent) => {
		if (!isEditing) return;
		changeText();
	};

	const changeText = useCallback(() => {
		textRef.current!.contentEditable = "false";
		setIsEditing(false);

		if (textRef.current!.innerText.trim() === "" || textRef.current!.innerText === props.text) {
			textRef.current!.innerText = text;
			setText(prev => prev);
			return;
		}

		setText(textRef.current!.innerText);
	}, [text, textRef, isEditing]);

	const onInputClick = () => {
		textRef.current!.contentEditable = "true";
		textRef.current!.focus();
		setIsEditing(true);
	};

	const onSetImportant = () => {
		setImportant(prev => !prev);
	};

	useEffect(() => {
		props.updateTask({
			done, text, important,
			date: props.date,
			id: props.id
		});
	}, [text, done, important]);

	let dateString: string;

	{
		const date = new Date(props.date);
		const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
		const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
		const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDay();

		const ymd =
			year === new Date().getFullYear() && month === new Date().getMonth() && day === new Date().getDay() ?
				"Today" : `${year}/${month}/${day}`;

		dateString = `${hours}:${minutes}:${seconds} ${ymd}`;
	}

	return (
		<div
			className={classNames("task", {"done": props.done, "important": important})}
			data-id={props.id}
			data-important={important}
		>
			<div className={"text-wrap"}>
				<button
					className={classNames("checkbox", {checked: done})}
					onClick={handleSetDone}
				>
					<img src={done_src} alt={"check"} hidden={!done}/>
				</button>
				<span
					className={"text"}
					ref={textRef}
					onKeyDown={handleOnKeyDown}
					onBlur={handleOnBlur}
				>
					{text}
				</span>
			</div>
			<span className={"section"}>
				<span className={"date"}>
					{dateString}
				</span>
				<button
					name={"edit-button"}
					className={"edit-button"}
					style={{marginLeft: "20px"}}
					onClick={onInputClick}
				>
					<img src={pen_src} alt={"edit"}/>
				</button>
				<button
					name={"delete-button"}
					className={"delete-button"}
					onClick={props.deleteTask(props.id)}
				>
					<img src={bin_src} alt={"edit"}/>
				</button>
				<button
					name={"important-button"}
					className={classNames("important-button", {"active": important})}
					onClick={onSetImportant}
				>
					<img src={star_src} alt={"edit"}/>
				</button>
			</span>
			<div className={"border"} hidden={!props.hasBorder}/>
		</div>
	);
};

export default Task;
