import React, {Fragment} from "react";
import AppHeader from "./AppHeader";
import AppInput from "./AppInput";

interface AppProps {
}

export default function App(props: AppProps) {
	let appTitle = "To Do";

	return (
		<Fragment>

			<AppHeader userName={"Test user"} title={appTitle}/>
			<AppInput/>

		</Fragment>
	);
}
