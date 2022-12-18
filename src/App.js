import { useState, useEffect } from 'react';

import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import Filter from './components/Filter';
import Footer from './components/Footer';



function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    console.log(data)
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (_id) => {
    const res = await fetch(`http://localhost:5000/tasks/${_id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task._id !== _id))
      : alert('Error Deleting This Task')
  }
  //filteration
  const filterNames = (name)=>{
    setFilter(name)
  }
 const nameHandler =()=>{
  if(filter.length !==0){
    return tasks.filter((task)=>task.text.includes(filter))
  }
  return tasks
  
 }

  return (
   
    <div className="container">
    
    <AddTask onAdd={addTask}/>
    <Filter filteration={filterNames}/>
      {tasks.length > 0 ? (
        <Tasks tasks={nameHandler()} onDelete={deleteTask} />
      ) : (
        <h2>No tasks to show</h2>
      )}
      
      <Footer/>
    </div>
    
  );
}

export default App;
