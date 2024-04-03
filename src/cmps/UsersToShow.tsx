import { Avatar } from "@mui/material";
import { User } from "../models/user.model";
import { useNavigate } from "react-router";

interface UsersToShowProps {
    users: User[]
}

export function UsersToShow(props: UsersToShowProps) {
    const navigate = useNavigate()

    function onNavToUser(userId: string) {
        navigate('/user/' + userId)
    }
    return (
        <section className="users-to-shown">
            {props.users.map((user, index) => (
                <div className="flex row space-between margin8 divider20" key={index}>
                    <div className="flex row justify-center align-center pointer" onClick={() => onNavToUser(user._id)}>
                        <Avatar src={user.imgUrl || undefined} />
                        <div className="flex column">
                            <h4 className="margin0 bold marginleft8">{user.username}</h4>
                            <span className="fs14 margin0 marginleft8">{user.fullname}</span>
                        </div>
                    </div>
                    <div className="flex column align-center justify-center">
                        <span className="fs14 bold margin0 marginleft8">{user.followers.length} followers</span>
                        <span className="fs14 bold margin0 marginleft8">{user.following.length} followers</span>
                    </div>
                </div >
            ))
            }
            <span className="divider"></span>
        </section >
    );
}