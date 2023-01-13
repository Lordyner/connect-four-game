import React from 'react';
import useData from './Hooks/useData';
import RowBoard from './RowBoard';

const Board = ({ windowSize }) => {

    const { board } = useData();
    return (
        <div className='board'>
            {board.map((row, rowIndex) => (
                <RowBoard key={rowIndex} row={row} rowIndex={rowIndex} windowSize={windowSize} />
            ))}
        </div>
    );
};

export default Board;