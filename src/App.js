import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
function App() {
  const [tasks, setTasks] = useState([
    {
      _id: 1,
      text: 'bassem',
    },
    {
      _id: 2,
      text: 'omar',
    },
    {
      _id: 3,
      text: 'soliman',
    },
  ]);

  //add task
  const addTask = (task) =>{
    console.log(task)
    const _id = Math.floor(Math.random() * 10000) + 1
    const newTask = { _id, ...task }
    setTasks([...tasks, newTask])
    console.log(_id)
  }

  //delete task
  const deleteTask = (_id) => {
    console.log('delete', _id);
    setTasks(tasks.filter((task) => task._id !== _id));
  };

  return (
    <div className="container">
    <AddTask onAdd={addTask}/>
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} />
      ) : (
        <h2>No tasks to show</h2>
      )}
    </div>
  );
}

export default App;
