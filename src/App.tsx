import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import { Task } from './types/task';
import { TaskDialog } from './components/TaskDialog/TaskDialog';

const App: React.FC = () => {
  const [editTask, setEditTask] = useState<Task>();
  const [tasks, setTasks] = useState<Task[]>([]);  

  const getNewId = () => {    
    const maxId = tasks.map((data: Task) => data.id).reduce((max: number, value: number) => Math.max(max,value), 0);
    return maxId + 1;
  }

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

      setTasks(loadedTasks);
    };
  }, []);

  useEffect(() => {
    console.log('console logging', tasks);
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
  const tasksThisWeek = tasks
                          .filter(task => task.deadline > beginOfWeek && task.deadline < endOfWeek)
                          .sort((a: Task,b: Task) => a.deadline - b.deadline);

  // Show any other tasks with deadlines after the current week
  const upcomingTasks = tasks
                        .filter(task => task.deadline >= endOfWeek)
                        .sort((a: Task,b: Task) => a.deadline - b.deadline);

  const onClickTask = (task: Task) => {
    setEditTask(task);
  }

  const onCompleteTask = (task: Task) => {
    setTasks([...(tasks.filter(t => t.id !== task.id)), task.toggleComplete()]);
  }

  return (<>
    <Header onAddTask={() => setEditTask(new Task())}></Header>
    <TaskDialog task={editTask} 
        onClose={() => setEditTask(undefined)} 
        onSubmit={(task: Task) => {   
          setEditTask(undefined);
          if(task.id >= 0) {
            setTasks([...(tasks.filter(t => t.id !== task.id)), task.setId(getNewId())]);
          } else {
            setTasks([...tasks, task.setId(getNewId())]);
          }  
        }}
        onDelete={(task: Task) => {
          setEditTask(undefined);
          setTasks([...(tasks.filter(t => t.id !== task.id))]);
        }}
      ></TaskDialog>
    
    <TaskList tasks={tasksThisWeek} title={"Tasks this week"} onClickTask={onClickTask} onComplete={onCompleteTask}></TaskList>
    <TaskList tasks={upcomingTasks} title={"Upcoming tasks"} onClickTask={onClickTask} onComplete={onCompleteTask}></TaskList>
  </>);
}

export default App;
