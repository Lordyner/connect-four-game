import { useState, useEffect } from 'react';
import logo from './images/logo.svg'
import avatarPlayerOne from './images/player-one.svg'
import avatarPlayerTwo from './images/player-two.svg'
import playerOneTurn from './images/turn-background-red.svg'
import playerTwoTurn from './images/turn-background-yellow.svg'
import whiteBoard from './images/board-layer-white-small.svg'
import blackBoard from './images/board-layer-black-small.svg'
import { Link } from 'react-router-dom';
import RowBoard from './RowBoard';
import useData from './Hooks/useData';

const Ingame = () => {


    const { timer, setTimer } = useData();
    const { playerTurn, setPlayerTurn } = useData();
    const { board, setBoard } = useData();
    const [scorePlayerOne, setScorePlayerOne] = useState(0);
    const [scorePlayerTwo, setScorePlayerTwo] = useState(0);

    let timerInterval = null;
    useEffect(() => {

        if (timer === null) return;
        const timerEdited = timer - 1;
        const ended = timer <= 0;

        if (!ended) {
            setTimeout(
                () => setTimer(timerEdited)
                , 1000);

        }

        if (ended) {

            setTimer(null);
            onTimerResolve();
            launchTimer();
        }

    }, [timer]);

    const onTimerResolve = () => {
        playerTurn === "Player 1" ? setPlayerTurn("Player 2") : setPlayerTurn("Player 1");
    }


    function launchTimer() {
        setTimer(30);
    }



    const checkVictory = () => {
        let playerPlaying = 1;
        // Algo de victoire en row
        // Si le joueur 1 à jouer vérifier les 1, si c'est le joueur 2, vérifier les 2 (variabiliser)
        for (let i = 0; i < board.length; i++) {
            console.log("Row numéro : " + i);
            let inRowPoint = 0;
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === playerPlaying) {
                    //Si l'élément suivant de la row vaut quelque chose, on incrémente le compteur
                    inRowPoint++;
                } else {
                    //Sinon on le reset
                    inRowPoint = 0;
                }
                if (inRowPoint >= 4) {
                    console.log("Joueur x gagne");
                    return;
                }
            }
        }

        // Algo de victoire en column
        for (let i = 0; i <= board[0].length; i++) {
            console.log("Colonne numéro : " + i);
            let inColumnPoint = 0;
            for (let j = 0; j < board.length; j++) {
                if (board[j][i] === playerPlaying) {
                    inColumnPoint++;

                } else {
                    inColumnPoint = 0;
                }

                if (inColumnPoint >= 4) {
                    console.log("Joueur x gagne");
                    return;
                }
                //console.log(board[j][i]);

            }
        }

        //TODO algo de vérif pas de puissance 4 en diag 
    }

    return (
        <>
            <div className='ingame-container'>
                <div className="ingame-header">
                    <Link to='/' className='primary-button'>MENU</Link>
                    <img src={logo} alt="" />
                    <a className='primary-button'>RESTART</a>
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
                    <img src={playerTurn === "Player 1" ? playerOneTurn : playerTwoTurn} alt='' />
                    <div className="turn-infos">
                        <span className='turn-text heading-xs'>{playerTurn} TURN</span>
                        <span className='turn-chrono heading-l'>{timer}s</span>
                    </div>
                </div>
                <footer className='ingame-footer'></footer>
            </div>
        </>
    );
};

export default Ingame;