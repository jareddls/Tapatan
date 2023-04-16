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
                <button className="my-button middle-top left" onClick={() => handleOnClick('/minmax')}>
                    MinMax
                </button>
                <button className="my-button middle-top right" onClick={() => handleOnClick('/random_move')}>
                    Random
                </button>
                <button className="my-button middle-bottom left" onClick={() => handleOnClick('/dfs')}>
                    DFS
                </button>
                <button className="my-button middle-bottom right" onClick={() => handleOnClick('/bfs')}>
                    BFS
                </button>
        </div>
    );
};
export default Difficulty