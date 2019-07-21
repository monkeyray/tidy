import React from "react";
import './TaskListHeader.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

const TaskListHeader = (props: {title:string}) => {
    return(
        <div className="list-header">
            <div className="icon">
                <FontAwesomeIcon icon={faList} />
            </div>
            <div className="title">
                {props.title}
            </div>
        </div>
    );
}

export default TaskListHeader;