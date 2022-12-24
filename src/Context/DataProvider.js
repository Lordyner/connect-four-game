import { createContext, useState } from 'react';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [playerTurn, setPlayerTurn] = useState("Player 1");
    const [timer, setTimer] = useState(30);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [winner, setWinner] = useState(null);
    const [scorePlayerOne, setScorePlayerOne] = useState(0);
    const [scorePlayerTwo, setScorePlayerTwo] = useState(0);
    const [board, setBoard] = useState([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]);


    return (
        <DataContext.Provider value={{
            board, setBoard,
            playerTurn, setPlayerTurn,
            timer, setTimer,
            isGameFinished, setIsGameFinished,
            winner, setWinner,
            scorePlayerOne, setScorePlayerOne,
            scorePlayerTwo, setScorePlayerTwo
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;