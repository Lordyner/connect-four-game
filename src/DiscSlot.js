import { useState } from 'react';
import useData from './Hooks/useData';

const DiscSlot = () => {

    const [columnPlayed, setColumnPlayed] = useState();

    const { board, setBoard } = useData();
    var [inGame, setInGame] = useState(false);


    const startGame = () => {
        setInGame(true);
    }

    const playDisc = (e) => {
        console.log("Disc played");
        e.target.classList.add('player-one-active');
        e.target.style.zIndex = '2';
        let isFull = true;
        for (let i = columnPlayed; i <= columnPlayed; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[j][i] == null) {
                    //Pose jeton ici
                    board[j][i] = 1;
                    isFull = false;

                }
                //console.log(board[j][i]);
            }
        }
        if (isFull) {
            //alert("You can't play here");
            console.log("You can't play here");
        }
    }
    return (
        <div className='disc-slot' onClick={playDisc} >T</div>
    );
};

export default DiscSlot;