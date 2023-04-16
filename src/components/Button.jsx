import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Button(props) {
  const { text, link } = props;
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(link);
  };

  return (
    <button className="my-button" onClick={handleOnClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Button;
