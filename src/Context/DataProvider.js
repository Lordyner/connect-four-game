import { createContext, useState } from 'react';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [timer, setTimer] = useState(30);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [winner, setWinner] = useState(null);
    const [scorePlayerOne, setScorePlayerOne] = useState(0);
    const [scorePlayerTwo, setScorePlayerTwo] = useState(0);
    const [showPopup, setShowPopup] = useState();
    const [isHover, setIsHover] = useState();
    let [nbTokenPlayerOne, setNbTokenPlayerOne] = useState();
    let [nbTokenPlayerTwo, setNbTokenPlayerTwo] = useState();

    // Can't use fill method because it creates one row that's internally referenced many times
    // So when we try to update a value, it updates the whole column.
    const [board, setBoard] = useState([
        [{ tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }],
        [{ tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }],
        [{ tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }],
        [{ tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }],
        [{ tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }],
        [{ tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }, { tokenPlayer: null, winningToken: false, mouseHover: false }],
    ]);

    return (
        <DataContext.Provider value={{
            board, setBoard,
            currentPlayer, setCurrentPlayer,
            timer, setTimer,
            isGameFinished, setIsGameFinished,
            winner, setWinner,
            scorePlayerOne, setScorePlayerOne,
            scorePlayerTwo, setScorePlayerTwo,
            showPopup, setShowPopup,
            nbTokenPlayerOne, setNbTokenPlayerOne,
            nbTokenPlayerTwo, setNbTokenPlayerTwo,
            isHover, setIsHover,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;