import { createContext, useState } from 'react';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [playerTurn, setPlayerTurn] = useState("Player 1");
    const [timer, setTimer] = useState(30);
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
            timer, setTimer
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;