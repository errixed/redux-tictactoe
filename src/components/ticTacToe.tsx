import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { State, reset, selectWinner, turn, turnSelector } from "./ticTacToeSlice";

function TicTacToe() {

  const [states, setStates] = useState<State>();
  const selectedTurn = useAppSelector(turnSelector);
  const dispatch = useAppDispatch();
  const [gameStatus, setGameStatus] = useState<string>("choose a box to begin");

  useEffect(() => {
    setStates(selectedTurn);
  }, [selectedTurn]);

  const handleTurn = async(i: number, j: number) => {
    const constTurn = {
      i: i,
      j: j
    };
    if (winner === "X" || winner === "O") {

    } else {
      setGameStatus("game is on")
      dispatch(turn(constTurn));
    }
    // setGameStatus("game is on")
    // dispatch(turn(constTurn));
  }

  const winner = useAppSelector(selectWinner);

  const resetGame = async() => {
    setGameStatus("choose a box to begin")
    dispatch(reset());
  }

  return (
    <div className="container">

      <div>
        {winner === "X" || winner === "O" ? (
          <h3>winner is <span className="text-success">{winner}</span></h3>
        ) : (
          <div>

            {states?.turn === "X" ? (
              <h3>current turn: <span className="text-secondary">{states?.turn}</span></h3>
            ) : (
              <h3>current turn: <span className="text-danger">{states?.turn}</span></h3>
            )}

            <h3>{gameStatus}</h3>

          </div>
        )}
      </div>

      <table>
        {states?.table.map((row, index) => {
          return (
            <tr>

              {row[0] === "-" ? (
                <td className="paper-btn" onClick={() => { handleTurn(index, 0) }}>{row[0]}</td>
              ) : (
                <td className="paper-btn">{row[0]}</td>
              )}

              {row[1] === "-" ? (
                <td className="paper-btn" onClick={() => { handleTurn(index, 1) }}>{row[1]}</td>
              ) : (
                <td className="paper-btn">{row[1]}</td>
              )}

              {row[2] === "-" ? (
                <td className="paper-btn" onClick={() => { handleTurn(index, 2) }}>{row[2]}</td>
              ) : (
                <td className="paper-btn">{row[2]}</td>
              )}
            </tr>
          )
        })}
      </table>
      <br />

      <input type="button" className="paper-btn btn-primary-outline" value="Reset" onClick={() => resetGame()}/>

    </div>
  );
}

export default TicTacToe;