import React, { useState } from "react";
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            description: 'This is a task'
        },
        {
            description: 'This is also a task'
        },
        {
            description: 'Check this task out!'
        }
    ]);

    return(
        <div className="task__list">
            {tasks.map(
                task => <div className="task">
                            <div className="task__state">
                                <input type="checkbox" />
                            </div>
                            <div className="task__description">{task.description}</div>
                        </div>
            )}
        </div>
    );
}

export class Task {
    description: string= 'Example task description';
}

export default TaskList;