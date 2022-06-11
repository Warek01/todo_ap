import React, {useContext, useEffect, useRef} from "react";
import classNames from "classnames";
import {TaskContext} from "../App";

interface MenuProps {
	hidden: boolean;
}

const Menu: React.FC<MenuProps> = ({hidden}) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const context = useContext(TaskContext);

	return (
		<div
			id={"menu"}
			className={classNames("menu", {"collapsed": hidden})}
			ref={menuRef}
		>
			<button onClick={context.clearTasks}>
				Clear all
			</button>
			<button onClick={() => context.updateFilter("all")} className={context.filter === "all" ? "active" : ""}>
				Show all
			</button>
			<button onClick={() => context.updateFilter("complete")} className={context.filter === "complete" ? "active" : ""}>
				Show completed
			</button>
			<button onClick={() => context.updateFilter("important")} className={context.filter === "important" ? "active" : ""}>
				Show important
			</button>
			<button onClick={() => context.updateFilter("active")} className={context.filter === "active" ? "active" : ""}>
				Show active
			</button>
		</div>
	);
};

export default Menu;
