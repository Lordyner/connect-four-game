import React from 'react';
import DiscSlot from './DiscSlot';

const RowBoard = ({ idRow }) => {
    return (
        <div className='row-board'>
            <DiscSlot idRow={idRow} idColumn="0" />
            <DiscSlot idRow={idRow} idColumn="1" />
            <DiscSlot idRow={idRow} idColumn="2" />
            <DiscSlot idRow={idRow} idColumn="3" />
            <DiscSlot idRow={idRow} idColumn="4" />
            <DiscSlot idRow={idRow} idColumn="5" />
            <DiscSlot idRow={idRow} idColumn="6" />
        </div>
    );
};

export default RowBoard;