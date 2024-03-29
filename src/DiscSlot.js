import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useData from './Hooks/useData';
import cursorRed from './images/marker-red.svg'
import cursorYellow from './images/marker-yellow.svg'

const DiscSlot = ({ rowIndex, cell, columnIndex, setNbTokenPlayerTwo, nbTokenPlayerTwo, nbTokenPlayerOne, setNbTokenPlayerOne }) => {


    const { setTimer } = useData();
    const { setIsGameFinished, isGameFinished } = useData();
    const { setWinner } = useData();
    const { scorePlayerOne, setScorePlayerOne } = useData();
    const { scorePlayerTwo, setScorePlayerTwo } = useData();
    const { currentPlayer } = useData();
    const { board, setBoard } = useData();
    const { getWindowSize } = useData()
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const resetWinningToken = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].winningToken) board[i][j].winningToken = false;
            }
        }
    }

    const checkVictory = () => {
        currentPlayer === 1 ? setNbTokenPlayerOne(nbTokenPlayerOne + 1) : setNbTokenPlayerTwo(nbTokenPlayerTwo + 1);
        // Algo de victoire en row
        for (let i = 0; i < board.length; i++) {
            let inRowPoint = 0;
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].tokenPlayer === currentPlayer) {
                    // On incrémente le compteur si le joueur a un jeton de posé.
                    inRowPoint++;
                    board[i][j].winningToken = true;
                } else {
                    //Sinon on le reset.
                    inRowPoint = 0;
                    board[i][j].winningToken = false;
                }
                if (inRowPoint >= 4) {
                    handleWinning();
                    return;
                }
            }
            resetWinningToken();
        }

        // Algo de victoire en column
        let inColumnPoint = 0;
        for (let row = 0; row < 6; row++) {
            if (board[row][columnIndex].tokenPlayer === currentPlayer) {
                inColumnPoint++
                board[row][columnIndex].winningToken = true;
            } else {
                inColumnPoint = 0;
                board[row][columnIndex].winningToken = false;

            }
            if (inColumnPoint >= 4) {
                handleWinning();
                return;
            }
        }

        // algo de vérif pas de puissance 4 en diag partant du bas
        let scoreDiagBot = 0;
        let scoreDiagTop = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                //Slot où l'on se trouve contient un jeton du joueur
                if (board[i][j].tokenPlayer === currentPlayer) {
                    // On incrémente le score
                    scoreDiagBot++;
                    board[i][j].winningToken = true;
                    let nextRow = i + 1;
                    let nextColumn = j + 1;

                    for (nextColumn; nextColumn < board[0].length; nextColumn++) {
                        if (nextRow < 6 && board[nextRow][nextColumn].tokenPlayer === currentPlayer) {
                            board[nextRow][nextColumn].winningToken = true;
                            scoreDiagBot++;
                            nextRow++;
                            if (scoreDiagBot >= 4) {
                                handleWinning();
                                return;
                            }
                        } else {
                            scoreDiagBot = 0;
                            if (nextRow < 6) {
                                board[nextRow][nextColumn].winningToken = false;
                            } else if (nextRow >= 6) {
                                board[nextRow - 1][nextColumn].winningToken = false;
                            }
                            break;
                        }
                    }
                    resetWinningToken();
                } else {
                    board[i][j].winningToken = true;
                    scoreDiagBot = 0;
                }
            }
            resetWinningToken();
        }

        // algo de vérif pas de puissance 4 en diag partant du haut
        for (let i = board.length - 1; i > 0; i--) {
            for (let j = 0; j < board[i].length; j++) {
                //Slot où l'on se trouve contient un jeton du joueur
                if (board[i][j].tokenPlayer === currentPlayer) {
                    board[i][j].winningToken = true;
                    // On incrémente le score
                    scoreDiagTop++;
                    let nextRow = i - 1;
                    let nextColumn = j + 1;
                    for (nextColumn; nextColumn < board[0].length; nextColumn++) {
                        if (board[nextRow][nextColumn].tokenPlayer === currentPlayer) {
                            board[nextRow][nextColumn].winningToken = true;
                            scoreDiagTop++;
                            nextRow--;
                            if (scoreDiagTop >= 4) {
                                handleWinning();
                                return;
                            }
                            if (nextRow < 0) {
                                board[nextRow + 1][nextColumn].winningToken = false;
                                scoreDiagTop = 0;
                                break;
                            }
                        } else {
                            board[nextRow][nextColumn].winningToken = false;
                            scoreDiagTop = 0;
                            break;
                        }
                    }
                    resetWinningToken();

                } else {
                    scoreDiagTop = 0;
                    board[i][j].winningToken = false;
                }

            }
            resetWinningToken();

        }
    }

    const handleWinning = () => {
        setIsGameFinished(true);
        setTimer(0);
        setWinner(currentPlayer);
        currentPlayer === 1 ? setScorePlayerOne(scorePlayerOne + 1) : setScorePlayerTwo(scorePlayerTwo + 1);
    }

    const playDisc = (column) => {
        if (isGameFinished) return;
        for (let row = 5; row >= 0; row--) {
            if (board[row][column].tokenPlayer === null) {
                const newBoard = [...board];
                newBoard[row][column].tokenPlayer = currentPlayer;
                setBoard(newBoard);
                checkVictory();
                setTimer(0);
                break;
            }
        }
    }

    const removePreviousCursors = () => {
        Array.from(document.querySelectorAll('.cursor')).forEach(cursor => cursor.remove());
    }

    const appendCursor = () => {
        if (windowSize.innerWidth < 1440) {
            removePreviousCursors();
            return;
        }
        removePreviousCursors();
        let indicator = document.createElement("img");
        indicator.className = 'cursor'
        indicator.src = `${currentPlayer === 1 ? cursorRed : cursorYellow}`;
        document.querySelector('.row-board').children[columnIndex].appendChild(indicator);
    }

    return (
        <div key={columnIndex}
            onMouseEnter={appendCursor}>
            {cell.tokenPlayer === null &&
                <div className='disc-slot no-select' onClick={() => playDisc(columnIndex)}></div>
            }
            {
                cell.tokenPlayer === 1 &&
                <div className='disc-slot token-player-one no-select'
                    style={{ zIndex: 2 }}>
                    {board[rowIndex][columnIndex].winningToken && isGameFinished && <div className='circle' />}
                </div>
            }
            {
                cell.tokenPlayer === 2 &&
                <div className='disc-slot token-player-two no-select'
                    style={{ zIndex: 2 }}>
                    {board[rowIndex][columnIndex].winningToken && isGameFinished && <div className='circle' />}
                </div>
            }
        </div >

    );
};
export default DiscSlot;