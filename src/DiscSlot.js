import { useState } from 'react';
import useData from './Hooks/useData';

const DiscSlot = ({ idRow, idColumn }) => {


    const { board, setBoard } = useData();
    const { timer, setTimer } = useData();
    const { isGameFinished, setIsGameFinished } = useData();
    const { winner, setWinner } = useData();
    const { playerTurn, setPlayerTurn } = useData();
    const { scorePlayerOne, setScorePlayerOne } = useData();
    const { scorePlayerTwo, setScorePlayerTwo } = useData();


    const playDisc = (e) => {
        if (isGameFinished) {
            return;
        }
        let columnPlayed = e.target.id.split(",")[0];
        //e.target.style.zIndex = '2';
        for (let i = columnPlayed; i <= columnPlayed; i++) {
            for (let j = 0; j < board.length; j++) {

                if (board[j][i] == null) {
                    // Pose jeton côté IHM
                    playerTurn === "Player 1" ?
                        document.getElementById(i + "," + j).classList.add('player-one-active')
                        : document.getElementById(i + "," + j).classList.add('player-two-active');

                    // Pose jeton dans tableau
                    board[j][i] = playerTurn === "Player 1" ? 1 : 2;
                    checkVictory();
                    setTimer(0);
                    return;
                }
            }
        }
    }

    const checkVictory = () => {
        let playerPlaying = playerTurn === "Player 1" ? 1 : 2;
        // Algo de victoire en row
        for (let i = 0; i < board.length; i++) {
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
                    setIsGameFinished(true);
                    setTimer(0);
                    setWinner(playerTurn);
                    playerTurn === "Player 1" ? setScorePlayerOne(scorePlayerOne + 1) : setScorePlayerTwo(scorePlayerTwo + 1);
                    return;
                }
            }
        }

        // Algo de victoire en column
        for (let i = 0; i <= board[0].length; i++) {
            let inColumnPoint = 0;
            for (let j = 0; j < board.length; j++) {
                if (board[j][i] === playerPlaying) {
                    inColumnPoint++;

                } else {
                    inColumnPoint = 0;
                }

                if (inColumnPoint >= 4) {
                    setIsGameFinished(true);
                    setTimer(0);
                    setWinner(playerTurn);
                    playerTurn === "Player 1" ? setScorePlayerOne(scorePlayerOne + 1) : setScorePlayerTwo(scorePlayerTwo + 1);
                    return;
                }
            }
        }

        // algo de vérif pas de puissance 4 en diag partant du bas
        let scoreDiag = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                //Slot où l'on se trouve contient un jeton du joueur
                if (board[i][j] === playerPlaying) {
                    // On incrémente le score
                    scoreDiag++;
                    let nextRow = i + 1;
                    let nextColumn = j + 1;

                    for (nextColumn; nextColumn < board[0].length; nextColumn++) {
                        if (nextRow < 6 && board[nextRow][nextColumn] === playerPlaying) {
                            scoreDiag++;
                            nextRow++;
                            if (scoreDiag >= 4) {
                                setIsGameFinished(true);
                                setTimer(0);
                                setWinner(playerTurn);
                                playerTurn === "Player 1" ? setScorePlayerOne(scorePlayerOne + 1) : setScorePlayerTwo(scorePlayerTwo + 1);
                                return;
                            }
                        } else {
                            scoreDiag = 0;

                            break;
                        }
                    }

                }
            }
        }

        // algo de vérif pas de puissance 4 en diag partant du haut
        for (let i = board.length - 1; i > 0; i--) {
            for (let j = 0; j < board[i].length; j++) {
                //Slot où l'on se trouve contient un jeton du joueur
                if (board[i][j] === playerPlaying) {
                    // On incrémente le score
                    scoreDiag++;
                    let nextRow = i - 1;
                    let nextColumn = j + 1;

                    for (nextColumn; nextColumn < board[0].length; nextColumn++) {
                        if (board[nextRow][nextColumn] === playerPlaying) {
                            scoreDiag++;
                            nextRow--;
                            if (scoreDiag >= 4) {
                                setIsGameFinished(true);
                                setTimer(0);
                                setWinner(playerTurn);
                                playerTurn === "Player 1" ? setScorePlayerOne(scorePlayerOne + 1) : setScorePlayerTwo(scorePlayerTwo + 1);
                                return;
                            }
                            if (nextRow < 0) {
                                scoreDiag = 0;
                                break;
                            }
                        } else {
                            scoreDiag = 0;
                            break;
                        }
                    }

                } else {
                    scoreDiag = 0;
                }

            }
        }
    }

    return (
        <div className='disc-slot' id={`${idColumn},${idRow}`} onClick={playDisc} ></div>
    );
};
export default DiscSlot;