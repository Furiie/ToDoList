import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Form = ({ taskValue, onChangeTaskValue, onSubmitForm }) => {
  const handleOnChange = (event) => {
    onChangeTaskValue(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log('handleOnSubmit');

    onSubmitForm();
  };

  return (
    <form onSubmit={handleOnSubmit} className="form">
      <input
        value={taskValue}
        onChange={handleOnChange}
        className="form__input"
        type="text"
        placeholder="Ajouter une tâche"
      />
    </form>
  );
};

Form.propTypes = {
  taskValue: PropTypes.string.isRequired,
  onChangeTaskValue: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export default Form;
