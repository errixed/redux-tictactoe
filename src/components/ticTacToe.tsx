import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { State, reset, selectWinner, setGameStatus, turn, turnSelector } from "./ticTacToeSlice";

function TicTacToe() {

  const [states, setStates] = useState<State>();
  const selectedTurn = useAppSelector(turnSelector);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>("game is on");

  useEffect(() => {
    setStates(selectedTurn);
  }, [selectedTurn]);

  function handleTurn(i: number, j: number) {
    const constTurn = {
      i: i,
      j: j
    };
    const constGameStatus = {
      message: status
    }

    if (winner === null) {
      dispatch(turn(constTurn));
      dispatch(setGameStatus(constGameStatus))
    }
  }

  const winner = useAppSelector(selectWinner);

  const resetGame = async () => {
    dispatch(reset());
  }

  return (
    <div className="container">

      <div>
        {winner === null ? (
          <div>

            {states?.turn === "X" ? (
              <h3>current turn: <span className="text-secondary">{states?.turn}</span></h3>
            ) : (
              <h3>current turn: <span className="text-danger">{states?.turn}</span></h3>
            )}

            <h3>{states?.gameStatus}</h3>

          </div>
        ) : (
          <h3>winner is <span className="text-success">{winner}</span></h3>
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

      <input type="button" className="paper-btn btn-primary-outline" value="Reset" onClick={() => resetGame()} />

    </div>
  );
}

export default TicTacToe;