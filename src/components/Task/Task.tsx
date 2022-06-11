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
	deleteTask(id: string): void;
	hasBorder: boolean;
}

const Task: React.FC<TaskProps> = ({date, deleteTask, done, hasBorder, id, important, text, updateTask}) => {
	const [doneState, setDoneState] = useState<boolean>(done);
	const [textState, setTextState] = useState<string>(text);
	const [importantState, setImportantState] = useState<boolean>(important);
	const [isEditingState, setIsEditingState] = useState<boolean>(false);

	const taskRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLSpanElement>(null);

	const changeText = useCallback((): void => {
		textRef.current!.contentEditable = "false";
		setIsEditingState(false);

		if (textRef.current!.innerText.trim() === "" || textRef.current!.innerText === text) {
			textRef.current!.innerText = textState;
			setTextState(prev => prev);
			return;
		}

		setTextState(textRef.current!.innerText);
	}, [text, textState]);

	const handleOnKeyDown = useCallback((event: React.KeyboardEvent): void => {
		if (!isEditingState || event.key !== "Enter") return;
		event.preventDefault();
		changeText();
	}, [changeText, isEditingState]);

	const handleOnBlur = useCallback((event: React.FocusEvent): void => {
		if (!isEditingState) return;
		changeText();
	}, [isEditingState, changeText]);

	const onInputClick = useCallback((): void => {
		textRef.current!.contentEditable = "true";
		textRef.current!.focus();
		setIsEditingState(true);
	}, [textRef, setIsEditingState]);

	const onSetImportant = useCallback((): void => {
		setImportantState(prev => !prev);
	}, [setImportantState]);

	const handleSetDone = useCallback(() => {
		setDoneState(prevState => !prevState);
	}, [setDoneState]);

	const delTask = () => {
		taskRef.current!.style.maxHeight = "0";
		taskRef.current!.style.minHeight = "0";
		setTimeout(() => deleteTask(id), 500);
	}

	useEffect(() => {
		updateTask({done: doneState, text: textState, important: importantState, date, id});
	}, [textState, doneState, importantState, date, id]);

	useEffect(() => {
		setTimeout(() => {
			taskRef.current!.style.maxHeight = "1000px";
			taskRef.current!.style.minHeight = "90px";
		});
	}, []);

	return <div
		className={classNames("task", {"done": done, "important": importantState})}
		data-id={id}
		data-important={importantState}
		ref={taskRef}
	>
		<div className={"text-wrap"}>
			<button
				className={classNames("checkbox", {checked: doneState})}
				onClick={handleSetDone}
			>
				<img src={done_src} alt={"check"} hidden={!doneState}/>
			</button>
			<span
				className={"text"}
				ref={textRef}
				onKeyDown={handleOnKeyDown}
				onBlur={handleOnBlur}
			>
					{textState}
				</span>
		</div>
		<span className={"section"}>
				<span className={"date"}>
					{getDate(date)}
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
					onClick={delTask}
				>
					<img src={bin_src} alt={"edit"}/>
				</button>
				<button
					name={"important-button"}
					className={classNames("important-button", {"active": importantState})}
					onClick={onSetImportant}
				>
					<img src={star_src} alt={"edit"}/>
				</button>
			</span>
		<div className={"border"} hidden={!hasBorder}/>
	</div>;
};

const getDate = (timestamp: number): string => {
	const date = new Date(timestamp);
	const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
	const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDay();
	const ymd =
		year === new Date().getFullYear() && month === new Date().getMonth() && day === new Date().getDay() ?
			"Today" : `${year}/${month}/${day}`;

	return `${hours}:${minutes}:${seconds} ${ymd}`;
};

export default Task;
