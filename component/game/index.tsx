import { FC, ReactElement } from "react";
import Board from '../board';
import style from './style.module.css';

type GameProps ={}

const Game:FC<GameProps>=(props):ReactElement=>{
    return <div className={style.gameBoard}>
        <div className={style.gameInfo}>
        <Board/>
        </div>
    </div>
}

export default Game;