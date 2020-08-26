import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Title = () => {
  const titre = 'TO DO LIST';

  return (
    <h1 className="title"> {titre} </h1>
  );
};

export default Title;
