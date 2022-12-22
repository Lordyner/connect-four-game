import { useState } from 'react';
import useData from './Hooks/useData';

const DiscSlot = ({ idRow, idColumn }) => {


    const { board, setBoard } = useData();
    const { timer, setTimer } = useData();
    const { playerTurn, setPlayerTurn } = useData();
    var [inGame, setInGame] = useState(false);


    const startGame = () => {
        setInGame(true);
    }

    const playDisc = (e) => {
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
                    board[j][i] = 1;

                    //playerTurn === "Player 1" ? setPlayerTurn("Player 2") : setPlayerTurn("Player 1");
                    setTimer(0);
                    return;
                }
            }
        }

        console.log("You can't play here");

    }
    return (
        <div className='disc-slot' id={`${idColumn},${idRow}`} onClick={playDisc} ></div>
    );
};

export default DiscSlot;