import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { State, reset, selectWinner, gameStatus, turn, turnSelector, moveNumber } from "./ticTacToeSlice";

const TicTacToe = () => {

  const [states, setStates] = useState<State>();
  const selectedTurn = useAppSelector(turnSelector);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>("game is on");
  const [count, setCount] = useState(0);


  useEffect(() => {
    setStates(selectedTurn);
  }, [selectedTurn]);

  const handleTurn = (i: number, j: number) => {
    const newTurn = {
      i: i,
      j: j
    };
    const newGameStatus = {
      message: status
    };
    const newMoveNumber = {
      number: count
    }

    if (winner === null) {
      setCount(count + 1);
      dispatch(moveNumber(newMoveNumber))
      dispatch(turn(newTurn));
      dispatch(gameStatus(newGameStatus))
      if (states?.moveNumber.length === 7) {
        setStatus("draw")
      }
    }
  }

  const handleReset = () => {
    window.location.reload()
    dispatch(reset())
  }

  const winner = useAppSelector(selectWinner);

  return (
    <div className="container">
      <div>

        {winner === null && states?.gameStatus !== "draw" ? (
          <div>

            {states?.turn === "X" ? (
              <h3>current turn: <span className="text-secondary">{states?.turn}</span></h3>
            ) : (
              <h3>current turn: <span className="text-danger">{states?.turn}</span></h3>
            )}
            <h3>{states?.gameStatus}</h3>

          </div>
        ) : states?.gameStatus === "draw" ? (
          <h3 className="text-warning">{states?.gameStatus}</h3>
        ) : (
          <h3>winner is <span className="text-success">{winner}</span></h3>
        )}

      </div>

      <table>
        <tbody>
          {states?.table.map((row, index) => {
            return (
              <tr key={index}>
                {row[0] === "-" ? (
                  <td className="paper-btn" onClick={() => { handleTurn(index, 0) }}>{row[0]}</td>
                ) : row[0] === "X" ? (
                  <td className="paper-btn btn-secondary-outline">{row[0]}</td>
                ) : (
                  <td className="paper-btn btn-danger-outline">{row[0]}</td>
                )}

                {row[1] === "-" ? (
                  <td className="paper-btn" onClick={() => { handleTurn(index, 1) }}>{row[1]}</td>
                ) : row[1] === "X" ? (
                  <td className="paper-btn btn-secondary-outline">{row[1]}</td>
                ) : (
                  <td className="paper-btn btn-danger-outline">{row[1]}</td>
                )}

                {row[2] === "-" ? (
                  <td className="paper-btn" onClick={() => { handleTurn(index, 2) }}>{row[2]}</td>
                ) : row[2] === "X" ? (
                  <td className="paper-btn btn-secondary-outline">{row[2]}</td>
                ) : (
                  <td className="paper-btn btn-danger-outline">{row[2]}</td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />

      <input type="button" className="paper-btn btn-primary-outline" value="Reset" onClick={() => handleReset()} />

    </div>
  );
}

export default TicTacToe;