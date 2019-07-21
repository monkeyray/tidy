import React from 'react';
import './TaskDialog.css';

export const TaskDialog = (props: any) => {
    return (
    <div className={'dialog-container' + (props.open ? ' open' : '')}>
        <div className="task-dialog">
            <button onClick={props.onClose}>Close Dialog</button>
        </div>
    </div>) 
}