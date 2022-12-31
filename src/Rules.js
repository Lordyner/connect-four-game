import React from 'react';
import checkImage from '../src/images/icon-check.svg';
import { Link } from 'react-router-dom';

const Rules = () => {
    return (
        <div className='rules-container'>
            <div className='rules'>
                <span className='rules-main-title heading-l'>RULES</span>
                <div className='rules-content'>
                    <span className='rules-title heading-s'>OBJECTIVE</span>
                    <span className='mb-1'>Be the first player to connect 4 of the same colored discs in a row
                        (either vertically, horizontally, or diagonally). </span>

                    <span className='rules-title heading-s'>HOW TO PLAY</span>
                    <ol className='rules-list'>
                        <li className='rules-list-element'>Red goes first in the first game.</li>
                        <li className='rules-list-element'>Players must alternante turns, and only one disc can be dropped in each turn.</li>
                        <li className='rules-list-element'>The game ends when there is a 4-in-a-row or a stalemate.</li>
                        <li className='rules-list-element'>The starter of the previous game goes second on the next game.</li>
                    </ol>
                </div>
            </div>
            <Link to='/' className='rules-check'>
                <img src={checkImage} alt="" />
            </Link>
        </div>
    );
};

export default Rules;