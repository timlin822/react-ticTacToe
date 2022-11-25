import './TicTacToe.css'

const TicTacToe=({cells,clickHandler})=>{
    return (
        <div className="tic-tac-toe">
            {cells.map((cell,index)=><div key={index} className={cell==="X"?"cell red":"cell blue"} onClick={()=>clickHandler(index)}>{cell}</div>)}
        </div>
    );
}

export default TicTacToe;