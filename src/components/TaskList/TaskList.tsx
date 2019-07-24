import React from "react";
import './TaskList.css';

import TaskListHeader from "../TaskListHeader/TaskListHeader";
import { Task } from "../../types/task";
import TaskListItem from "../Task/TaskListItem";

const TaskList = (props: {title:string ,tasks: Task[], onClickTask: (task: Task) => void}) => {
    return(<>
        <TaskListHeader title={props.title} />
        <div className="task-list">
            {props.tasks.map((task: Task, index: number) => 
                <TaskListItem key={index} task={task} onClickTask={props.onClickTask} />
            )}
        </div>
    </>);
}

export default TaskList;