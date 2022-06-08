import React from "react";

interface HeaderProps {
	title: string;
	userName: string;
}

export default function AppHeader(props: HeaderProps) {
	return (
		<header className={"app-header"}>
			<div className={"l-half"}>
				<span className={"app-title"}>
				{props.title}
				</span>
			</div>
			<div className={"r-half"}>
				<div className={"dropdown"}>
					<span className={"user-name"}>
						{props.userName}
					</span>
				</div>
			</div>
		</header>
	);
};
