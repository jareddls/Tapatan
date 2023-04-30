import React from 'react'
import { useNavigate } from 'react-router-dom';

const Difficulty = () => {
    const navigate = useNavigate();

    const handleOnClick = (link) => {
        navigate(link);
    };

    return (
        <div>
            <div className="triumph-outline top-middle" style={{fontSize:'70px', whiteSpace: 'nowrap'}}>
                CHOOSE YOUR ALGORITHM
            </div>
                <button className="my-button middle left" onClick={() => handleOnClick('/minmax')}>
                    MinMax
                </button>
                <button className="my-button middle right" onClick={() => handleOnClick('/random_move')}>
                    Random
                </button>
        </div>
    );
};
export default Difficulty