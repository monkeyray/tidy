import React from "react";
import './Header.css';

const Header = (props: {onAddTask: () => void}) => {
    return(
        <div className="header">
            <div>Tidy</div>
            <div className="version">0.1.0</div>
            <div className="spacer"></div>
            <button className="button" onClick={props.onAddTask}>+Add Task</button>
        </div>
    );
}

export default Header;