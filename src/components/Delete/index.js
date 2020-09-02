import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Delete = ({ onsubmitClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('Cliqué');

    onsubmitClick();
  };

  return (
    <button className="button" onClick={handleClick} type="button">
      Supprimer
    </button>
  );
};

Delete.propTypes = {
  onsubmitClick: PropTypes.func.isRequired,
};

export default Delete;
