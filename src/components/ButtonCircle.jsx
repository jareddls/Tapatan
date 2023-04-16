import React from "react";

function ButtonCircle(props) {
  const { color, onClick } = props;


  return (
    <button
      className={`button-circle ${color}`}
      onClick={onClick}
    />
  );
}

export default ButtonCircle;
