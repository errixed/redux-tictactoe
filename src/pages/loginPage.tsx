import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { Login, addUser } from "../app/slice/loginSlice";
import { reset } from "../app/slice/loginSlice";

export const LoginPage: React.FC<{users: Array<Login>, role: string, isSubmitted: boolean}> = (props) => {
  const [newUserName, setNewUserName] = useState<string>("");
  const dispatch = useAppDispatch();
  
  const handleAddUser = () => {
    const newUser = {
      id: (props.users.length + 1).toString(),
      name: newUserName,
    };
    dispatch(addUser(newUser));
  }

  return (
    <div>

      <form className="paper background-primary centered">
        <div className="form-group">
          <input type="text" placeholder={"player " + props.role + " name"} aria-label="name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)}/>
        </div>
        <input type="button" className="paper-btn btn-primary-outline" value="Submit" onClick={() => handleAddUser()} />
      </form>
      
    </div>
  );
}