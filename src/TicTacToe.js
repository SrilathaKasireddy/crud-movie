import { Button } from "@mui/material";
import { useState } from "react"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import useSound from 'use-sound';

import boopSfx from './cheer.mp3';
export function TicTacToe(){
  
 return(

<div>
 <h1>Fun Game</h1>
 <Board/>

</div>

 )
}

function  Board(){
 const [board,setBoard]=useState([
  null,null,null,null,null,null,null,null,null
 ]);
 const [isXturn,setIsXturn]=useState(true)
 const decideWinner=(board)=>{
  const lines=[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
   
 ]
 for(let i=0;i<lines.length;i++
){
 const [a,b,c] =lines[i];
 if(board[a] != null && board[a]===board[b] && board[b]===board[c]){
  console.log("winner",board[a]);
  return board[a]
 }
} 
return null;
}
const winner=decideWinner(board)
 const handleClick=(index)=>{
console.log(index);
if(!winner && !board[index]){
const boardCopy= [...board];
boardCopy[index]=isXturn ?"X":"O";
setBoard(boardCopy);
setIsXturn(!isXturn);
}
 }
 const restart=()=>{
  setBoard([
    null,null,null,null,null,null,null,null,null
   ])
 }
 const { width, height } = useWindowSize();
 


  
 const [play] = useSound(boopSfx);
 return (
  <div className="board"  >
   {board.map((value,index)=>(
   <Gamebox value={value}  onPlayerClick={()=>handleClick(index)}/>
   ))}
  
  {winner?<h2>Winner is: {winner} <Confetti
      width={width}
      height={height}
      gravity={0.2}
    />
   
     

      <button  style={{borderRadius:50}}onClick={play}>Click Me❣️</button>
    </h2>:null}
  <Button onClick={restart}>Restart</Button>
  </div>
 )
}
   function Gamebox({value,onPlayerClick}){
 
 
 const styles={
  color:value === "X" ? "green ": "red",
  height: 160,
  width: 160,
  fontSize: 160,
  display: "flex",
  border:"1px solid black",
  alignItems:"center",
  justifyContent:"center",
  
 }



 return <div className="game-box"  style={styles } 
 onClick={onPlayerClick}>{value}</div>
 
}