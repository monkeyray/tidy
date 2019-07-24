import React, { useState, SyntheticEvent } from 'react';
import './TaskDialog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCalendarCheck, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { Task } from '../../types/task';

export const TaskDialog = (props: any) => {
    const [taskName, setTaskName] = useState('');
    const [taskDeadline, setTaskDeadline] = useState(new Date().toISOString().substr(0,10));
    const [taskDescription, setTaskDescription] = useState('');

    return (
    <div className={'dialog-container' + (props.open ? ' open' : '')}>
        <div className="task-dialog">
            <div className="dialog-header">Create a new task</div>
            <div className="dialog-content">
                <div className="input-container">
                    <div className="input-title">
                        <FontAwesomeIcon icon={faPen} />
                    </div>
                    <div className="input-field">
                        <input type="text" placeholder="Task name.." value={taskName} onChange={event => {
                            setTaskName((event.target as HTMLInputElement).value);
                        }}></input>
                        
                    </div>
                </div>
                <div className="input-container">
                    <div className="input-title">
                        <FontAwesomeIcon icon={faCalendarCheck} />
                    </div>
                    <div className="input-field">
                        <input type="date" placeholder="Task deadlvine.." value={taskDeadline} onChange={event => {
                            setTaskDeadline((event.target as HTMLInputElement).value);
                        }}></input>
                    </div>
                </div>
                <div className="input-container">
                    <div className="input-title">
                        <FontAwesomeIcon icon={faClipboardList} />
                    </div>
                    <div className="input-field">
                        <input type="text" placeholder="Task description.." value={taskDescription} onChange={event => {
                            setTaskDescription((event.target as HTMLInputElement).value);
                        }}></input>
                    </div>
                </div>
            </div>
            <div className="dialog-actions">
                <button onClick={() => props.onClose()}>Cancel</button>
                <button onClick={() => props.onSubmit(new Task(taskName, taskDescription, +new Date(taskDeadline)))} className="button--type-success">Accept</button>
            </div>
        </div>
    </div>) 
}