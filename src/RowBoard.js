import React from 'react';
import { useState } from 'react';
import DiscSlot from './DiscSlot';

const RowBoard = ({ row, rowIndex, windowSize }) => {

    const [nbTokenPlayerOne, setNbTokenPlayerOne] = useState(0);
    const [nbTokenPlayerTwo, setNbTokenPlayerTwo] = useState(0);

    return (
        <div key={rowIndex} className='row-board'>
            {row.map((cell, columnIndex) => (
                <DiscSlot key={columnIndex} rowIndex={rowIndex} cell={cell} columnIndex={columnIndex}
                    setNbTokenPlayerOne={setNbTokenPlayerOne} nbTokenPlayerOne={nbTokenPlayerOne}
                    setNbTokenPlayerTwo={setNbTokenPlayerTwo} nbTokenPlayerTwo={nbTokenPlayerTwo}
                    windowSize={windowSize}
                />
            ))
            }
        </div>
    );
};
export default RowBoard;