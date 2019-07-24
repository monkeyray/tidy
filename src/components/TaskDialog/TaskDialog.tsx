import React, { useState, useEffect } from 'react';
import './TaskDialog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCalendarCheck, faClipboardList, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

export const TaskDialog = (props: any) => {
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        if(props.task) {
            setTaskName(props.task.name);
            setTaskDeadline(new Date(props.task.deadline).toISOString().substr(0,10));
            setTaskDescription(props.task.description);

            if(props.task.id >= 0) {
                setEditMode(true);
            }
        } else {    
            setTaskName('');
            setTaskDeadline('');
            setTaskDescription('');
            setEditMode(false);
        }
    }, [props.task]);

    return (
    <div className={'dialog-container' + (props.task ? ' open' : '')}>
        <div className="task-dialog">
            <div className="dialog-header">
                { editMode ? 'Adjust task' : 'Add task' }
                <div className="spacer"></div>
                { editMode ? <div onClick={()=> props.onDelete(props.task)}><FontAwesomeIcon icon={faTrash} /></div> : ''}
            </div>
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
                <button disabled={taskName === '' || taskDescription === ''} onClick={() => {
                        const task = props.task.setDetails(taskName, taskDescription, +new Date(taskDeadline));
                        props.onSubmit(task);
                    }} className="button--type-success">
                    <FontAwesomeIcon icon={faCheck} />
                    <div className="button__text">Accept</div>
                </button>
            </div>
        </div>
    </div>) 
}