import { useState, useEffect, useRef } from 'react';
import logo from './images/logo.svg'
import avatarPlayerOne from './images/player-one.svg'
import avatarPlayerTwo from './images/player-two.svg'
import playerOneTurn from './images/turn-background-red.svg'
import playerTwoTurn from './images/turn-background-yellow.svg'
import smallWhiteBoard from './images/board-layer-white-small.svg'
import smallBlackBoard from './images/board-layer-black-small.svg'
import whiteBoard from './images/board-layer-white-large.svg'
import blackBoard from './images/board-layer-black-large.svg'
import RowBoard from './RowBoard';
import useData from './Hooks/useData';
import PopupMenu from './PopupMenu';
import Board from './Board';

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

const Ingame = () => {


    const { timer, setTimer } = useData();
    const { currentPlayer, setCurrentPlayer } = useData();
    const { board } = useData();
    const { winner, setWinner } = useData();
    const { isGameFinished, setIsGameFinished } = useData();
    const { scorePlayerOne } = useData();
    const { scorePlayerTwo } = useData();
    const { showPopup, setShowPopup } = useData();
    const [gamePaused, setGamePaused] = useState(null);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const tabletSize = { width: 768, height: 1024 };

    var timeOutID = useRef(null);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

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
        currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
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
        for (let i = 0; i <= board[0].length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[j][i] !== null && board[j][i] !== undefined) {
                    board[j][i].tokenPlayer = null;
                    board[j][i].mouseHoverr = false;
                }

            }
        }
    }

    return (
        <>
            <div className='ingame-container'>

                <div className="grid-container">
                    <div className="ingame-header">
                        <a className='primary-button' onClick={() => {
                            setShowPopup(!showPopup);
                            pauseTimer();
                        }}>MENU</a>
                        <img src={logo} alt="" />
                        <a onClick={restartGame} className='primary-button'>RESTART</a>
                    </div>
                    <div className="score-board-player-one">
                        <div className="interactive-button first-player player-panel secondary">
                            <span className="player-name">PLAYER 1</span>
                            <span className="score">{scorePlayerOne}</span>
                        </div>
                        <img src={avatarPlayerOne} className='avatar-player-one' alt='' />
                    </div>
                    <div className="score-board-player-two">
                        <div className="interactive-button second-player player-panel secondary">
                            <span className="player-name">PLAYER 2</span>
                            <span className="score">{scorePlayerTwo}</span>
                        </div>
                        <img src={avatarPlayerTwo} className='avatar-player-two' alt='' />
                    </div>
                    <div className="game-board">
                        <img src={windowSize.innerWidth >= tabletSize.width ? blackBoard : smallBlackBoard} className='board-img black-board no-select' alt='' />
                        <img src={windowSize.innerWidth >= tabletSize.width ? whiteBoard : smallWhiteBoard} className='board-img white-board no-select' alt='' />
                        <Board />
                    </div>
                </div>

                <div className="game-messages-container">
                    {!isGameFinished && <><img src={currentPlayer === 1 ? playerOneTurn : playerTwoTurn} alt='' />
                        <div className={currentPlayer === 1 ? "turn-infos playerOne" : "turn-infos playerTwo"}>
                            <span className='turn-text heading-xs'>{currentPlayer === 1 ? "Player 1" : "Player 2"}'S TURN</span>
                            <span className='turn-chrono heading-l'>{timer}s</span>
                        </div> </>}
                    {isGameFinished && <>
                        <div className="win-message-container">
                            <span className='text-transform-up'>{winner === 1 ? "Player 1" : "Player 2"}</span>
                            <span className='heading-l'>WINS</span>
                            <button className='primary-button' onClick={restartGame}>PLAY AGAIN</button>
                        </div>
                    </>}
                </div>
                <footer className={winner !== null ? winner === 1 ? "ingame-footer winner playerOneWin" : "ingame-footer winner playerTwoWin" : "ingame-footer"}></footer>
            </div>
            {showPopup ? <PopupMenu showPopup={showPopup} setShowPopup={setShowPopup} restartGame={restartGame} resumeTimer={resumeTimer} /> : null}
        </>
    );
};

export default Ingame;