import { useState } from 'react';

const Filter = ({filteration}) => {
  const [filter, setFilter] = useState('');

  const filterHandler = (e) => {
    const name = e.target.value
    setFilter(name)
    filteration(name)
  };

  return (
    <div>
      <input
        type="text"
        placeholder="filter for text"
        className="input"
        value={filter}
        onChange={filterHandler}
      />
    </div>
  );
};

export default Filter;
