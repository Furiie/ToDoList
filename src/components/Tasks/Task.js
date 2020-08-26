import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Task = ({ id, label, done, onChangeTaskDone }) => {
  // © Thiéfaine traiter les noms de classe à insérer avant le JSX
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
  done: PropTypes.bool.isRequired,
  onChangeTaskDone: PropTypes.func.isRequired,
};

export default Task;

// version return implicite pour classNames
// tasks.map((task) => (
//   <li className={`${classNames('task', { 'task--done': task.done })}`} key={task.id}>
//     <input
//       checked={task.done}
//       type="checkbox"
//       className="task__checkbox"
//       id={task.id}
//     />
//     <label
//       className="task__label"
//       htmlFor={task.id}
//     >
//       {task.label}
//     </label>
//   </li>
// ))
