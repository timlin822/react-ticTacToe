import {useState,useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TicTacToe from 'components/ticTacToe/TicTacToe';

import './App.css';

function App() {
  const [success,setSuccess]=useState("");
  const [turn,setTurn]=useState("X");
  const [cells,setCells]=useState(Array(9).fill(""));
  const [winner,setWinner]=useState("");
  const winnerPatterns=[
    [0,1,2],[3,4,5],[6,7,8], // 橫
    [0,3,6],[1,4,7],[2,5,8], // 直
    [0,4,8],[2,4,6] // 斜
  ];

  const resetHandler=()=>{
    setSuccess("");
    setTurn("X");
    setCells(Array(9).fill(""));
    setWinner("");
  };

  const checkWinner=(cells)=>{
    for(let winnerPattern of winnerPatterns){
      if(cells[winnerPattern[0]]==="" || cells[winnerPattern[1]]==="" || cells[winnerPattern[2]]===""){
        setWinner("");
      }
      else if(cells[winnerPattern[0]]===cells[winnerPattern[1]] && cells[winnerPattern[1]]===cells[winnerPattern[2]]){
        toast.success(`恭喜${cells[winnerPattern[0]]}獲勝`,{position: toast.POSITION.TOP_CENTER,autoClose: 2000});
        setWinner(`${cells[winnerPattern[0]]}獲勝`);
        setSuccess("成功完成");
        break;
      }
      else if(cells.every(cell=>cell!=="") && winner===""){
        setWinner("平手");
        setSuccess("成功完成");
      }
    }
  };

  useEffect(()=>{
    setSuccess("");
  },[]);
  useEffect(()=>{
    checkWinner(cells);
  },[cells]);
  useEffect(()=>{
    if(success==="成功完成"){
      const timeoutId=setTimeout(()=>{
        resetHandler();
      },3000);

      return ()=>{
        clearTimeout(timeoutId);
      }
    }
  },[success]);

  const clickHandler=(cellIndex)=>{
    if(success==="成功完成") return;
    if(cells[cellIndex]!=="") return;

    if(turn==="X"){
      setTurn("O");
      setCells(cells.map((cell,index)=>index===cellIndex?turn:cell));
    }
    else if(turn==="O"){
      setTurn("X");
      setCells(cells.map((cell,index)=>index===cellIndex?turn:cell));
    }
  };

  return (
    <section className="section-padding bg-height">
      <div className="container container-padding">
        <div className="group-flex">
          <button className="btn-start" onClick={resetHandler}>遊戲開始</button>
          {winner && <div className="winner">{winner}</div>}
        </div>
        <TicTacToe cells={cells} clickHandler={clickHandler} />
      </div>
      <ToastContainer />
    </section>
  );
}

export default App;