import { useEffect, useState } from "react";
import { Login, userSelector } from "../app/slice/loginSlice";
import { useAppSelector } from "../app/hooks";

export const ReturnUser: React.FC<{ users: Array<Login> }> = (props) => {

    return (
        <div>

            <div className="row flex-spaces">
                {props.users.map((user) => (
                    <div className="sm-3 col border border-primary" key={user.id}>
                        Player: #{user.id}
                        <br />
                        Name: {user.name}
                    </div>
                ))}
            </div>

        </div>
    )
}