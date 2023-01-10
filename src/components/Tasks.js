import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Tasks = ({ onDelete }) => {
  const [updateState, setUpdateState] = useState(-1);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks');
    const data = await res.json();
    console.log(data);
    return data;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {tasks.map((task) =>
          updateState === task._id ? (
            <Update
              task={task}
              key={task._id}
              tasks={tasks}
              setTasks={setTasks}
            />
          ) : (
            <h3 key={task._id}>
              {task.text}

              <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onDelete(task._id)}
              />
              <button onClick={() => handleEdit(task._id)}>update</button>
            </h3>
          )
        )}
      </div>
    </form>
  );
  function handleEdit(_id) {
    setUpdateState(_id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.elements.text.value;
    console.log(name)
    const newList = tasks.map((li) =>
      li._id === updateState ? { ...li, text: name } : li
    );
    setTasks(newList);
    setUpdateState(-1);
  }
};

const Update = ({ task, tasks, setTasks }) => {
  function handInput(e) {
    
    const value = e.target.value;
    const newList = tasks.map((li) =>
      li._id === task._id ? { ...li, text: value } : li
    );
    setTasks(newList);
  }
  return (
    <h3>
      <input
        type="text"
        name="text"
        value={task.text}
        onChange={handInput}
        className="input"
      />
      <button>Update..</button>
    </h3>
  );
};

export default Tasks;
