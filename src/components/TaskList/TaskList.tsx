import React from "react";
import './TaskList.css';

import TaskListHeader from "../TaskListHeader/TaskListHeader";
import { Task } from "../../types/task";
import TaskListItem from "../Task/TaskListItem";

const TaskList = (props: {title:string ,tasks: Task[]}) => {
    return(<>
        <TaskListHeader title={props.title} />
        <div className="task-list">
            {props.tasks.map((task: Task, index: number) => 
                <TaskListItem key={index} task={task} />
            )}
        </div>
    </>);
}

export default TaskList;