import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { State, reset, selectWinner, gameStatus, turn, stateSelector, Table, undo } from "../app/slice/ticTacToeSlice";

export const TicTacToePage = () => {
  
  const [states, setStates] = useState<State>();
  const [lastTable, setlastTable] = useState<Table>(
    [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]);
  const [executedUndo, setExecutedUndo] = useState<boolean>(true);
  const selectedState = useAppSelector(stateSelector);
  const winner = useAppSelector(selectWinner);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    setStates(selectedState);

    if (winner === null) {
      const emptyBoxes = selectedState.table.flat().filter((cell) => cell === '-').length
      if (emptyBoxes === 0) {
        dispatch(gameStatus({
          message: 'draw'
        }))
      } else if (emptyBoxes < 9) {
        dispatch(gameStatus({
          message: 'game is on'
        }))
      }
    }

  }, [selectedState, dispatch, winner]);

  const handleTurn = (i: number, j: number) => {
    const newTurn = {
      i: i,
      j: j
    };

    setlastTable(states?.table ||
      [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]);

    if (winner === null) {
      dispatch(turn(newTurn));
      setExecutedUndo(false)
    }
  }

  const handleUndo = () => {
    if (executedUndo === false) {
      dispatch(undo(lastTable))
      setExecutedUndo(true)
    }
  }

  return (
    <div className="container">
      <div>

        {winner === null && states?.gameStatus !== "draw" ? (
          <div>
            
            <h3>current turn: <span className={states?.turn === "X" ? "text-secondary" : "text-danger"}>
              {states?.turn === "X" ?  states?.nameX : states?.nameO} - 
              {states?.turn}</span></h3>
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
                {row.map((cell, index2) => {
                  return (
                    <td key={index + ',' + index2} className={cell === "X" ? "paper-btn btn-secondary-outline" : cell === "O" ? "paper-btn btn-danger-outline" : "paper-btn"} onClick={() => { handleTurn(index, index2) }}>{cell}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />

      <input type="button" className="paper-btn btn-primary-outline" value="Reset" onClick={() => dispatch(reset())} />
      <br />
      <br />

      <input type="button" className="paper-btn btn-primary-outline " disabled={executedUndo} value="Undo" onClick={() => handleUndo()} />

    </div>
  );
}
