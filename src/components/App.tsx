import React, {Fragment} from "react";
import AppHeader from "./AppHeader";
import AppInput from "./AppInput";
import TaskContainer from "./TaskContainer";

interface AppProps {
}

export default function App(props: AppProps) {
	let appTitle = "To Do";

	return (
		<Fragment>

			<AppHeader userName={"Test user"} title={appTitle}/>
			<AppInput/>
			<TaskContainer />

		</Fragment>
	);
}
