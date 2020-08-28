import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Task = ({ id, label, done, onChangeTaskDone }) => {
  
  const classTaskDone = classNames('task', { 'task--done': done });

  const handleOnChange = (taskId) => {
    onChangeTaskDone(taskId);
  };

  return (
    <li className={classTaskDone}>
      <input
        onChange={() => handleOnChange(id)}
        checked={done}
        type="checkbox"
        className="task__checkbox"
        id={id}
      />
      <label
        className="task__label"
        htmlFor={id}
      >
        {label}
      </label>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.string.isRequired,
  onChangeTaskDone: PropTypes.func.isRequired,
};

export default Task;

