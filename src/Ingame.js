import { useState } from 'react';
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


    const [chrono, setChrono] = useState(30);
    const [columnPlayed, setColumnPlayed] = useState();

    const { board, setBoard } = useData();



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
                            <span className="score">12</span>
                        </div>
                        <img src={avatarPlayerOne} className='avatar-player-one' alt='' />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="interactive-button player-panel secondary">
                            <span className="player-name heading-xs">PLAYER 2</span>
                            <span className="score">23</span>
                        </div>
                        <img src={avatarPlayerTwo} className='avatar-player-two' alt='' />
                    </div>
                </div>
                <div className="game-board">
                    <img src={blackBoard} className='board-img black-board' alt='' />

                    <img src={whiteBoard} className='board-img white-board' alt='' />
                    <div className='board'>
                        <RowBoard />
                        <RowBoard />
                        <RowBoard />
                        <RowBoard />
                        <RowBoard />
                        <RowBoard />
                    </div>
                </div>
                <div className="game-messages-container">
                    <img src={playerOneTurn} alt='' />
                    <div className="turn-infos">
                        <span className='turn-text heading-xs'>PLAYER 1'S TURN</span>
                        <span className='turn-chrono heading-l'>{chrono}s</span>
                    </div>
                </div>
            </div>
            <footer className='ingame-footer'></footer>
        </>
    );
};

export default Ingame;