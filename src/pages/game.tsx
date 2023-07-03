import { useEffect, useState } from "react";
import { LoginPage } from "./loginPage";
import { ReturnUser } from "../components/returnUser";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Login, reset, userSelector } from "../app/slice/loginSlice";
import { Link } from "react-router-dom";

export const Game = () => {
    const [users, setUsers] = useState<Array<Login>>([]);
    const selectedUsers = useAppSelector(userSelector);
    const dispatch = useAppDispatch();


    useEffect(() => {
        setUsers(selectedUsers);
    }, [selectedUsers]);

    return (
        <div>
            <h6 className="margin-top-small">
                <ReturnUser users={users} />
            </h6>

            <div className="split left background-secondary">
                {users.length + 1 === 1 ? (
                    <LoginPage users={users} role="X" isSubmitted={false} />

                ) : users.length + 1 === 2 ? (
                    <h3 className="centered paper col border border-primary text-warning background-primary">submitted,<br />wait for other players</h3>
                ) : (
                    <h3 className="centered paper col border border-primary text-warning background-primary">submitted</h3>

                )}
            </div>

            <div className="split right background-danger">
                {users.length + 1 === 2 ? (
                    <LoginPage users={users} role="O" isSubmitted={false} />

                ) : users.length + 1 === 1 ? (
                    <h3 className="centered paper col border border-primary text-warning background-primary">wait for other players</h3>
                ) : (
                    <h3 className="centered paper col border border-primary text-warning background-primary">submitted</h3>

                )}

            </div>
            {users.length + 1 === 3 ? (
                <div className="bottom">
                    <Link className="paper-btn btn-primary-outline" to="/ticTacToe">Ready!</Link>
                    <span>  </span>
                    <input type="button" className="paper-btn btn-primary-outline" value="Logout" onClick={() => dispatch(reset())} />
                </div>

            ) : (

                <input type="button" className="bottom paper-btn btn-primary-outline" value="Logout" onClick={() => dispatch(reset())} />
            )}

        </div>
    )
}
