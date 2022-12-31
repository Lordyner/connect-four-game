import React from 'react';
import { useState } from 'react';
import DiscSlot from './DiscSlot';
import useData from './Hooks/useData';

const RowBoard = ({ row, rowIndex }) => {

    const [nbTokenPlayerOne, setNbTokenPlayerOne] = useState(0);
    const [nbTokenPlayerTwo, setNbTokenPlayerTwo] = useState(0);

    return (
        <div key={rowIndex} className='row-board'>
            {row.map((cell, columnIndex) => (
                <DiscSlot key={columnIndex} rowIndex={rowIndex} cell={cell} columnIndex={columnIndex}
                    setNbTokenPlayerOne={setNbTokenPlayerOne} nbTokenPlayerOne={nbTokenPlayerOne}
                    setNbTokenPlayerTwo={setNbTokenPlayerTwo} nbTokenPlayerTwo={nbTokenPlayerTwo}
                />
            ))
            }
        </div >
    );
};
export default RowBoard;