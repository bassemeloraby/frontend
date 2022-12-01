import { FaTimes } from 'react-icons/fa';

const Tasks = ({ tasks, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <h3 key={task._id}>
          {task.text}
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={()=>onDelete(task._id)}
          />
        </h3>
      ))}
    </div>
  );
};

export default Tasks;
