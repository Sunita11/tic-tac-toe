import { FC, ReactElement, useState, useEffect, memo } from "react"
import styles from './style.module.css'
type PropsBoard= {
}
type SquareProps = {
    idx: number;
    val: string;
    onClick: Function;
}
const Square:FC<SquareProps>=(props):ReactElement => {
    const {val, onClick, idx} = props;
    const clickHandler =(e:any) => {
        e?.stopPropagation();
        onClick(idx);
    }

    return<button onClick={clickHandler} className={styles.square}>{val}</button>
}

const Board:FC<PropsBoard> = (props): ReactElement => {
    const [isXNext, setIsXNext] = useState(false);
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [winnerData, setWinner]:any = useState(null);

    const calculateWinner = () => {
        const winnerDir = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        const len = 8;

        for(let i=0;i<len;i++){
            const [a,b,c] = winnerDir[i];
            if(squares[a]&& squares[b]===squares[a] && squares[c] === squares[b] ){
                return {won:true, winner:squares[a]} ;
            }
        }

        let isBoardFull = true;
        squares.forEach((square)=>{
            if(!square){
                isBoardFull = false;
            }
        })
        if(isBoardFull){
        return {won:false, winner:''};
            
        }
        return null;
    }


    useEffect(()=>{
        let filledSquares = 0;
        squares.forEach((item)=>{
            if(item){
                filledSquares++;
            }
        })
        if(filledSquares > 4){
            const winner= calculateWinner();
            if(winner){
                setWinner(winner);
            }
        }
    }, [squares])


    const onClickHandler = (idx:number) =>{
        // base case
        if(squares[idx]) return;

        // change value
        const newSquareVal = [...squares];
        newSquareVal[idx] = isXNext ? 'O' : 'X';
        setSquares(newSquareVal);
        setIsXNext(!isXNext);
    }

    const isGameFinished = winnerData ?  true : false;

return(
    <>
    <div className={` ${styles.boardWrapper} ${isGameFinished ? styles.finished: ''}`}>
        <div className={styles.boardRow} key='board-game'>
            <Square val={squares[0]} key='board-square1' idx={0} onClick={onClickHandler} />
            <Square val={squares[1]} key='board-square2' idx={1} onClick={onClickHandler}  />
            <Square val={squares[2]} key='board-square3' idx={2} onClick={onClickHandler}  />
        </div>
        <div className={styles.boardRow}>
            <Square val={squares[3]} key='board-square4' idx={3} onClick={onClickHandler}  />
            <Square val={squares[4]} key='board-square5' idx={4} onClick={onClickHandler}  />
            <Square val={squares[5]} key='board-square6' idx={5} onClick={onClickHandler}  />
        </div>
        <div className={styles.boardRow}>
            <Square val={squares[6]} key='board-square7' idx={6} onClick={onClickHandler}  />
            <Square val={squares[7]} key='board-square8' idx={7} onClick={onClickHandler}  />
            <Square val={squares[8]} key='board-square9' idx={8} onClick={onClickHandler}  />
        </div>
        
    </div>
    <div className={styles.status}>
       {!isGameFinished&&<div>Next Player is {isXNext ? 'O': 'X'}</div>}
        {isGameFinished&&<div className={`${winnerData.won ? styles.winnerStatus : styles.lostStatus}`}>{ winnerData.won ? `Hurray, ${winnerData?.winner} Won!` : 'Game is Drawn'}</div>}
    </div>
    
    </>
)
}

export default memo(Board);