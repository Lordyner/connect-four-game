import { useState } from 'react';
import useData from './Hooks/useData';

const DiscSlot = ({ rowIndex, cell, columnIndex, setNbTokenPlayerTwo, nbTokenPlayerTwo, nbTokenPlayerOne, setNbTokenPlayerOne }) => {


    const { setTimer } = useData();
    const { setIsGameFinished, isGameFinished } = useData();
    const { setWinner } = useData();
    const { scorePlayerOne, setScorePlayerOne } = useData();
    const { scorePlayerTwo, setScorePlayerTwo } = useData();
    const { currentPlayer } = useData();
    const { board, setBoard } = useData();
    const [winningToken, setWinningToken] = useState();


    const checkVictory = () => {
        currentPlayer === 1 ? setNbTokenPlayerOne(nbTokenPlayerOne + 1) : setNbTokenPlayerTwo(nbTokenPlayerTwo + 1);
        // Algo de victoire en row
        if ((currentPlayer === 1 && nbTokenPlayerOne >= 3) || (currentPlayer === 2 && nbTokenPlayerTwo >= 3)) {
            for (let i = 0; i < board.length; i++) {
                let inRowPoint = 0;
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === currentPlayer) {
                        // On incrémente le compteur si le joueur a un jeton de posé.
                        inRowPoint++;
                        setWinningToken(true);
                    } else {
                        //Sinon on le reset.
                        inRowPoint = 0;
                        setWinningToken(false);
                    }
                    if (inRowPoint >= 4) {
                        handleWinning();
                        return;
                    }
                }
            }
        }

        // Algo de victoire en column
        if (board.indexOf(board[columnIndex]) >= 3) {
            let inColumnPoint = 0;
            for (let row = 0; row < 6; row++) {
                if (board[row][columnIndex] === currentPlayer) {
                    inColumnPoint++
                    setWinningToken(true);
                } else {
                    inColumnPoint = 0;
                    setWinningToken(false);

                }
                if (inColumnPoint >= 4) {
                    handleWinning();
                    return;
                }
            }
        }



        // algo de vérif pas de puissance 4 en diag partant du bas
        let scoreDiag = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                //Slot où l'on se trouve contient un jeton du joueur
                if (board[i][j] === currentPlayer) {
                    // On incrémente le score
                    scoreDiag++;
                    let nextRow = i + 1;
                    let nextColumn = j + 1;

                    for (nextColumn; nextColumn < board[0].length; nextColumn++) {
                        if (nextRow < 6 && board[nextRow][nextColumn] === currentPlayer) {
                            scoreDiag++;
                            nextRow++;
                            setWinningToken(true);
                            if (scoreDiag >= 4) {
                                handleWinning();
                                return;
                            }
                        } else {
                            scoreDiag = 0;
                            setWinningToken(false);
                            break;
                        }
                    }

                } else {
                    scoreDiag = 0;
                }
            }
        }

        // algo de vérif pas de puissance 4 en diag partant du haut
        for (let i = board.length - 1; i > 0; i--) {
            for (let j = 0; j < board[i].length; j++) {
                //Slot où l'on se trouve contient un jeton du joueur
                if (board[i][j] === currentPlayer) {
                    // On incrémente le score
                    scoreDiag++;
                    let nextRow = i - 1;
                    let nextColumn = j + 1;

                    for (nextColumn; nextColumn < board[0].length; nextColumn++) {
                        if (board[nextRow][nextColumn] === currentPlayer) {
                            scoreDiag++;
                            nextRow--;
                            setWinningToken(true);
                            if (scoreDiag >= 4) {
                                handleWinning();
                                return;
                            }
                            if (nextRow < 0) {
                                scoreDiag = 0;
                                setWinningToken(false);
                                break;
                            }
                        } else {
                            scoreDiag = 0;
                            setWinningToken(false);
                            break;
                        }
                    }

                } else {
                    scoreDiag = 0;
                }

            }
        }
    }

    const handleWinning = () => {
        setIsGameFinished(true);
        setTimer(0);
        setWinner(currentPlayer);
        currentPlayer === 1 ? setScorePlayerOne(scorePlayerOne + 1) : setScorePlayerTwo(scorePlayerTwo + 1);
    }

    const playDisc = (column) => {
        for (let row = 5; row >= 0; row--) {
            if (board[row][column] === null) {
                const newBoard = [...board];
                newBoard[row][column] = currentPlayer;
                setBoard(newBoard);
                checkVictory();
                setTimer(0);
                break;
            }
        }
    }

    return (
        <div key={columnIndex} >
            {cell === null && <div className='disc-slot' onClick={() => playDisc(columnIndex)}></div>}
            {cell === 1 &&

                <div className='disc-slot token-player-one' style={{ zIndex: 2 }}>
                    {winningToken && isGameFinished && <div className='circle' />}
                </div>}
            {cell === 2 &&
                <div className='disc-slot token-player-two' style={{ zIndex: 2 }}>
                    {winningToken && isGameFinished && <div className='circle' />}
                </div>}
        </div>

    );
};
export default DiscSlot;