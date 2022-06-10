import React, {useEffect, useRef} from "react";
import classNames from "classnames";


interface MenuProps {
    hidden: boolean;
}

const Menu: React.FC<MenuProps> = ({hidden}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <div
            id={"menu"}
            className={classNames("menu", {"collapsed": hidden})}
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
