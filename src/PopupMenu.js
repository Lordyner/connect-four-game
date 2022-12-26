import React from 'react';
import { Link } from 'react-router-dom';

const PopupMenu = ({ showPopup, setShowPopup, restartGame, resumeTimer }) => {


    return (
        <>
            <div id='popup-overlay'></div>
            <div className="popup-menu">
                <span className='heading-l'>PAUSE</span>
                <button onClick={() => {
                    resumeTimer();
                    setShowPopup(!showPopup);
                }} className='interactive-button secondary heading-m jusitify-center'>CONTINUE GAME</button>
                <button onClick={() => {
                    setShowPopup(!showPopup);
                    restartGame();
                }} className='interactive-button secondary heading-m jusitify-center'>RESTART</button>
                <Link to='/' onClick={() => {
                    setShowPopup(!showPopup);
                    restartGame();
                }} className='interactive-button tertiary heading-m jusitify-center'>QUIT GAME</Link>
            </div >
        </>
    );
};

export default PopupMenu;