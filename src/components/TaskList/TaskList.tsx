import React from "react";
import './TaskList.css';

import TaskListHeader from "../TaskListHeader/TaskListHeader";
import { Task } from "../../types/task";
import TaskListItem from "../Task/TaskListItem";

const TaskList = (props: {title:string ,tasks: Task[], onClickTask: (task: Task) => void, onComplete: (task: Task) => void}) => {
    console.log('TaskList',props.title,props.tasks);

    return(<>
        <TaskListHeader title={props.title} />
        <div className="task-list">
            {props.tasks.map((task: Task, index: number) => 
                <TaskListItem key={task.id} task={task} onClickTask={props.onClickTask} onComplete={props.onComplete} />
            )}
        </div>
    </>);
}

export default TaskList;