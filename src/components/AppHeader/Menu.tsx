import React, {useEffect, useRef} from "react";
import classNames from "classnames";


interface MenuProps {
    hidden: boolean;
}

const Menu: React.FC<MenuProps> = ({hidden}) => {
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

export default Menu;
