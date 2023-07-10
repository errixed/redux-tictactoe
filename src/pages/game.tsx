import { LoginPage } from "./loginPage";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isReady, reset } from "../app/slice/loginSlice";
import { Link } from "react-router-dom";

export const Game = () => {

    const ready = useAppSelector(isReady);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="split left background-secondary">
                <LoginPage role="X"/>
            </div>

            <div className="split right background-danger">
                <LoginPage role="O"/>
            </div>
            {ready ? (
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
