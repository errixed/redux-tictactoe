import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { State, Turn, turn, turnSelector } from "./ticTacToeSlice";

function TicTacToe() {
  const [states, setStates] = useState<State>();
  // const [newTable, setNewTable] = useState<Array<Array<Cell>>>([
  //   ['-']
  // ]);
  // const [newTurn, setNewTurn] = useState<Turn>("X");
  const selectedTurn = useAppSelector(turnSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setStates(selectedTurn);
  }, [selectedTurn]);

  function handleTurn(i: number, j: number) {
    const constTurn = {
      i: i,
      j: j
    };
    dispatch(turn(constTurn));
  }
  return (
    <div className="container">
      <h3>current turn: {states?.turn}</h3>
      <table>
        {
          states?.table.map((row, index) => {
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
          })
        }

      </table>

    </div>
  );
}
export default TicTacToe;