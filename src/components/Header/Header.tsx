import React from "react";
import './Header.css';

const Header = (props: {onAddTask: () => void}) => {
    return(
        <div className="header">
            <span>Tidy</span>
            <div className="spacer"></div>
            <button className="button" onClick={props.onAddTask}>+Add Task</button>
        </div>
    );
}

export default Header;