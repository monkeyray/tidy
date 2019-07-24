import React, { useState } from 'react';
import './App.css';

import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import { Task } from './types/task';
import { TaskDialog } from './components/TaskDialog/TaskDialog';

const App: React.FC = () => {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const [tasks, setTasks] = useState([    
    new Task('Slaapkamer opruimen','Kleding uitzoeken en weggooien', +new Date()),
    new Task('Fiets repareren', 'Binnenband van achterwiel vervangen', +new Date() + (1000 * 60 * 60 * 24 * 2))
  ]);

  console.log('calculations!!!');

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

  return (<>
    <Header onAddTask={() => setTaskDialogOpen(true)}></Header>
    <TaskDialog open={taskDialogOpen} onClose={() => setTaskDialogOpen(false)} onSubmit={(task: Task) => {
        setTasks([...tasks, task]);
        setTaskDialogOpen(false);
      }}></TaskDialog>
    
    <TaskList tasks={tasksThisWeek} title={"Tasks this week"}></TaskList>
    <TaskList tasks={upcomingTasks} title={"Upcoming tasks"}></TaskList>
  </>);
}

export default App;
