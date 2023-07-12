import { LoginPage } from "./loginPage";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isReady, logout } from "../app/slice/loginSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { reset } from "../app/slice/ticTacToeSlice";

export const Game = () => {

    const ready = useAppSelector(isReady);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(logout())
        dispatch(reset())
    }, [dispatch]);

    return (
        <div>
            <div className="split left background-secondary">
                <LoginPage role="X" />
            </div>

            <div className="split right background-danger">
                <LoginPage role="O" />
            </div>
            {ready ? (
                <div className="bottom">
                    <Link className="paper-btn btn-primary-outline" to="/ticTacToe">Ready!</Link>
                    <span>  </span>
                    <input type="button" className="paper-btn btn-primary-outline" value="Logout" onClick={() => dispatch(logout())} />
                </div>

            ) : (
                <input type="button" className="bottom paper-btn btn-primary-outline" value="Logout" onClick={() => dispatch(logout())} />
            )}

        </div>
    )
}
