import React from "react";

interface InputProps {
}

export default function AppInput(props: InputProps) {


	return (
		<div className={"main-input-wrapper"}>
			<input
				type={"text"}
				placeholder={"Input here"}
				id={"main-input"}
				name={"main-input"}
			/>
			<input
				type={"button"}
				value={"Add"}
				id={"add-button"}
				name={"add-button"}
			/>
		</div>
	);
}
