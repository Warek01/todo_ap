import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import logo_src from "../../img/document.svg";
import menu_src from "../../img/menu.svg";
import "./Header.scss";

const AppHeader: React.FC = () => {
	const [menuActive, setMenuActive] = useState(false);

	const toggleMenu = () => {
		setMenuActive(prev => !prev);
	};

	return (
		<header id={"header"}>
			<div className={"l-half"}>
				<div className={"logo-wrap"}>
					<img src={logo_src} alt={"to do"} className={"logo"}/>
					<h1 className={"logo-text"}>
						To Do
					</h1>
				</div>
			</div>
			<div className={"r-half"}>
				<div className={"button-container"}>
					<button
						className={"options-button"}
						name={"options-button"}
						onClick={toggleMenu}
					>
						<img src={menu_src} alt={"options"} className={"options-img"}/>
					</button>
				</div>
				<MenuElement hidden={!menuActive} />
			</div>
		</header>
	);
};

interface MenuElementProps {
	hidden: boolean;
}

const MenuElement: React.FC<MenuElementProps> = ({hidden}) => {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!hidden) {
			menuRef.current!.style.maxHeight = "800px";
		} else {
			menuRef.current!.style.maxHeight = "0";
		}
	}, [hidden]);

	return (
		<div
			id={"menu"}
			className={classNames("menu", {"hidden": hidden})}
			ref={menuRef}
		>
			<button>
				Clear all
			</button>
			<button>
				Show completed
			</button>
			<button>
				Show important
			</button>
			<button>
				Show active
			</button>
		</div>
	);
}

export default AppHeader;
