import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

import './styles.scss';

const Tasks = ({ tasks, onChangeTaskDone }) => {
  return (
    <ul className="tasks">
    {
      tasks.map((task) => (
        <Task
         // id={task.id}
         // label={task.label}
         // done={task.done}
         {...task}
         onChangeTaskDone={onChangeTaskDone}
        key={task.id}
        />
       ))
    }
    </ul>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onChangeTaskDone: PropTypes.func.isRequired,
};

export default Tasks;
