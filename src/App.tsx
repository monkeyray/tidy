import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import { Task } from './types/task';
import { TaskDialog } from './components/TaskDialog/TaskDialog';

const App: React.FC = () => {
  const [editTask, setEditTask] = useState<Task>();

  const _ = undefined;
  let idCounter = 0;
  const getNewId = () => idCounter++;

  const [tasks, setTasks] = useState<Task[]>([    
    // new Task('Slaapkamer opruimen','Kleding uitzoeken en weggooien', +new Date(),_,_,_,getNewId()),
    // new Task('Fiets repareren', 'Binnenband van achterwiel vervangen', +new Date() + (1000 * 60 * 60 * 24 * 2),_,_,_,getNewId())
  ]);  

  useEffect(() => {
    console.log('load from storage');
    if(localStorage.getItem('tasks')) {
      const loadedData = JSON.parse(localStorage.getItem('tasks') || '');

      const loadedTasks = loadedData.map((data: any) => new Task(
        data.name,
        data.description,
        data.deadline,
        data.repeat,
        data.completed,
        data.created,
        data.id
      ));

      const maxId = loadedData.map((data: any) => data.id).reduce((max: number, value: number) => Math.max(max,value), 0);
        console.log('max id is', maxId);
        idCounter = maxId + 1;


      console.log('loaded data', loadedTasks);
      setTasks(loadedTasks);
    };
  }, []);

  useEffect(() => {
    console.log('save to storage');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
          setEditTask(undefined);
          if(task.id >= 0) {
            setTasks([...(tasks.filter(t => t.id !== task.id)), task]);
          } else {
            setTasks([...tasks, task.setId(getNewId())]);
          }  
        }}
        onDelete={(task: Task) => {
          setEditTask(undefined);
          setTasks([...(tasks.filter(t => t.id !== task.id))]);
        }}
      ></TaskDialog>
    
    <TaskList tasks={tasksThisWeek} title={"Tasks this week"} onClickTask={onClickTask}></TaskList>
    <TaskList tasks={upcomingTasks} title={"Upcoming tasks"} onClickTask={onClickTask}></TaskList>
  </>);
}

export default App;
