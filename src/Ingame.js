import { useState, useEffect, useRef } from 'react';
import logo from './images/logo.svg'
import avatarPlayerOne from './images/player-one.svg'
import avatarPlayerTwo from './images/player-two.svg'
import playerOneTurn from './images/turn-background-red.svg'
import playerTwoTurn from './images/turn-background-yellow.svg'
import whiteBoard from './images/board-layer-white-small.svg'
import blackBoard from './images/board-layer-black-small.svg'
import RowBoard from './RowBoard';
import useData from './Hooks/useData';
import PopupMenu from './PopupMenu';

const Ingame = () => {


    const { timer, setTimer } = useData();
    const { playerTurn, setPlayerTurn } = useData();
    const { board, setBoard } = useData();
    const { winner, setWinner } = useData();
    const { isGameFinished, setIsGameFinished } = useData();
    const { scorePlayerOne, setScorePlayerOne } = useData();
    const { scorePlayerTwo, setScorePlayerTwo } = useData();
    const { showPopup, setShowPopup } = useData();
    const [gamePaused, setGamePaused] = useState(null);
    var timeOutID = useRef(null);

    useEffect(() => {

        if (timer === null) return;
        const timerEdited = timer - 1;
        const ended = timer <= 0;
        if (!ended) {
            timeOutID.current = setTimeout(
                () => setTimer(timerEdited)
                , 1000);
        }
        if (ended) {
            clearTimeout(timeOutID.current);
            setTimer(null);
            onTimerResolve();
            launchTimer(30);
        }

    }, [timer, gamePaused]);

    const onTimerResolve = () => {
        playerTurn === "Player 1" ? setPlayerTurn("Player 2") : setPlayerTurn("Player 1");
    }


    function launchTimer(time) {
        setTimer(time);
    }

    const restartGame = () => {
        clearTimeout(timeOutID.current);
        clearBoard();
        setWinner(null);
        setIsGameFinished(false);
        setTimer(30);

    }

    const pauseTimer = function () {
        clearTimeout(timeOutID.current);
        timeOutID.current = null;
    };

    const resumeTimer = function () {
        setGamePaused(!gamePaused);
    };

    const clearBoard = () => {

        // Clear data board
        for (let i = 0; i <= board[0].length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[j][i] !== null && board[j][i] !== undefined) {
                    board[j][i] = null;
                }
            }
        }
        // Clear IHM board
        let discSlots = document.getElementsByClassName('disc-slot');
        Array.prototype.forEach.call(discSlots, function (discSlot) {
            if (discSlot.classList.contains('player-one-active') || discSlot.classList.contains('player-two-active')) {
                discSlot.classList.remove('player-one-active');
                discSlot.classList.remove('player-two-active');
                discSlot.style.zIndex = '100'
            }
        })
    }

    return (
        <>
            <div className='ingame-container'>
                <div className="ingame-header">
                    <a className='primary-button' onClick={() => {
                        setShowPopup(!showPopup);
                        pauseTimer();
                    }}>MENU</a>
                    <img src={logo} alt="" />
                    <a onClick={restartGame} className='primary-button'>RESTART</a>
                </div>
                <div className="score-board">
                    <div className="d-flex flex-column">
                        <div className="interactive-button player-panel secondary">
                            <span className="player-name heading-xs">PLAYER 1</span>
                            <span className="score">{scorePlayerOne}</span>
                        </div>
                        <img src={avatarPlayerOne} className='avatar-player-one' alt='' />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="interactive-button player-panel secondary">
                            <span className="player-name heading-xs">PLAYER 2</span>
                            <span className="score">{scorePlayerTwo}</span>
                        </div>
                        <img src={avatarPlayerTwo} className='avatar-player-two' alt='' />
                    </div>
                </div>
                <div className="game-board">
                    <img src={blackBoard} className='board-img black-board' alt='' />

                    <img src={whiteBoard} className='board-img white-board' alt='' />
                    <div className='board'>
                        <RowBoard idRow="5" />
                        <RowBoard idRow="4" />
                        <RowBoard idRow="3" />
                        <RowBoard idRow="2" />
                        <RowBoard idRow="1" />
                        <RowBoard idRow="0" />
                    </div>
                </div>

                <div className="game-messages-container">
                    {!isGameFinished && <><img src={playerTurn === "Player 1" ? playerOneTurn : playerTwoTurn} alt='' />
                        <div className={playerTurn === "Player 1" ? "turn-infos playerOne" : "turn-infos playerTwo"}>
                            <span className='turn-text heading-xs'>{playerTurn}'S TURN</span>
                            <span className='turn-chrono heading-l'>{timer}s</span>
                        </div> </>}
                    {isGameFinished && <>
                        <div className="win-message-container">
                            <span className='text-transform-up'>{winner}</span>
                            <span className='heading-l'>WINS</span>
                            <button className='primary-button' onClick={restartGame}>PLAY AGAIN</button>
                        </div>
                    </>}
                </div>
                <footer className={winner !== null ? winner === "Player 1" ? "ingame-footer winner playerOneWin" : "ingame-footer winner playerTwoWin" : "ingame-footer"}></footer>
            </div>

            {showPopup ? <PopupMenu showPopup={showPopup} setShowPopup={setShowPopup} restartGame={restartGame} resumeTimer={resumeTimer} /> : null}
        </>
    );
};

export default Ingame;