import React from "react";

function ButtonCircle(props) {
  const { color, onClick } = props;
  
  let emoji = ''
  
  if (color == 'white') {
    emoji = ''
  }
  else if (color == 'red') {
    emoji = '🤠'
  }
  else {
    emoji = '🤖'
  }
  

  return (
    <button
      className={`button-circle ${color}`}
      onClick={onClick}
    >
      {emoji}
    </button>  
  );
}

export default ButtonCircle;