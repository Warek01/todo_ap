import React, {createContext} from "react";
import AppHeader from "./AppHeader";

interface AppProps {}

export default function App(props: AppProps) {
	let appTitle = "To Do";

	return (
		<AppHeader userName={"Test user"} title={appTitle}/>
	);
}
