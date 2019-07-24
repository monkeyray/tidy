import React, { useState } from 'react';
import './App.css';

import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import { Task } from './types/task';
import { TaskDialog } from './components/TaskDialog/TaskDialog';

const App: React.FC = () => {
  const [editTask, setEditTask] = useState<Task>();

  const _ = undefined;

  const [tasks, setTasks] = useState([    
    new Task('Slaapkamer opruimen','Kleding uitzoeken en weggooien', +new Date(),_,_,_,0),
    new Task('Fiets repareren', 'Binnenband van achterwiel vervangen', +new Date() + (1000 * 60 * 60 * 24 * 2),_,_,_,1)
  ]);

  // Store length of a day (in ms), the current week day (monday = 0, sunday = 6) 
  // and the timestamp start for today
  const dayLenght = 1000 * 60 * 60 * 24;
  const weekDay = (+(new Date().getDay()) + 6) % 7;
  const startOfCurrentDay = new Date().setHours(0,0,0,0);

  // Calculate the timestamps for the start and end of the week
  const beginOfWeek = startOfCurrentDay - (weekDay * dayLenght);
  const endOfWeek = startOfCurrentDay + dayLenght;

  // Filter tasks to only show tasks from this week
  const tasksThisWeek = tasks.filter(task => task.deadline > beginOfWeek && task.deadline < endOfWeek);

  // Show any other tasks with deadlines after the current week
  const upcomingTasks = tasks.filter(task => task.deadline >= endOfWeek);

  const onClickTask = (task: Task) => {
    setEditTask(task);
  }

  return (<>
    <Header onAddTask={() => setEditTask(new Task())}></Header>
    <TaskDialog task={editTask} 
        onClose={() => setEditTask(undefined)} 
        onSubmit={(task: Task) => {   
          if(task.id >= 0) {
            
          } else {
            setTasks([...tasks, task]);
          }  
          
          setEditTask(undefined)
      }}></TaskDialog>
    
    <TaskList tasks={tasksThisWeek} title={"Tasks this week"} onClickTask={onClickTask}></TaskList>
    <TaskList tasks={upcomingTasks} title={"Upcoming tasks"} onClickTask={onClickTask}></TaskList>
  </>);
}

export default App;
