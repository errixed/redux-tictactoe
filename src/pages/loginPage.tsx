import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addUser } from "../app/slice/loginSlice";
import { Turn } from "../app/slice/ticTacToeSlice";

export const LoginPage: React.FC<{role: Turn}> = (props) => {
  const [newUserName, setNewUserName] = useState<string>("");
  const [state, setState] = useState<'init' | 'ready'>('init');
  const dispatch = useAppDispatch();

  
  const handleAddUser = () => {
    const newUser = {
      name: newUserName,
      role: props.role,
    };
    setState('ready')
    dispatch(addUser(newUser));
  }

  return (
    <div>
      {state === 'init' ? (
        <form className="paper background-primary centered">
          <div className="form-group">
            <input type="text" placeholder={"player " + props.role + " name"} aria-label="name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)}/>
          </div>
          <input type="button" className="paper-btn btn-primary-outline" value="Submit" onClick={() => handleAddUser()} />
        </form>
      ) : (
        <h3 className="centered paper col border border-primary text-warning background-primary">submitted</h3>
      )}
      
      
    </div>
  );
}