import React from 'react';
import logo from './images/logo.svg'
import playerVsPlayer from './images/player-vs-player.svg'
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <>
            <div className='menu-container'>
                <div className='logo-container'>
                    <img src={logo} alt="" />
                </div>
                <div className='interactive-buttons-container'>
                    <Link to='/ingame' className='interactive-button primary'>
                        <span className='label-interactive-button heading-m'>PLAY VS PLAYER</span>
                        <img src={playerVsPlayer} alt="" />
                    </Link>
                    <Link to='/rules' className='interactive-button secondary' >
                        <span className='label-interactive-button heading-m'>GAME RULES</span>
                    </Link>
                </div>
            </div>
        </>

    );
};

export default Menu;