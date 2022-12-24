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

                console.log("x : " + i);
                console.log("y : " + j)
                console.log("Board : " + board[j][i])
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
            console.log("Colonne numéro : " + i);
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
                //console.log(board[j][i]);

            }
        }

        //TODO algo de vérif pas de puissance 4 en diag 
    }

    return (
        <div className='disc-slot' id={`${idColumn},${idRow}`} onClick={playDisc} ></div>
    );
};
export default DiscSlot;