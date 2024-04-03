import { Avatar } from "@mui/material";
import { User } from "../models/user.model";
import { useNavigate } from "react-router";

interface UsersToShowProps {
    users: User[]
}

export function UsersToShow(props: UsersToShowProps) {
    const navigate = useNavigate()

    function navToUser(userId: string) {
        navigate('/user/' + userId)
    }
    return (
        <section className="users-to-shown">
            {props.users.map((user, index) => (
                <div className="flex row space-between margin8 divider20" key={index}>
                    <div className="flex row justify-center align-center pointer" onClick={() => navToUser(user._id)}>
                        <Avatar src={user.imgUrl || undefined} />
                        <h4 className="margin0 marginleft8">{user.username}</h4>
                    </div>
                    <div className="flex column align-center">
                        <h5>{user.followers.length} followers</h5>
                        <h5>{user.following.length} followers</h5>
                    </div>
                </div >
            ))
            }
            <span className="divider"></span>
        </section >
    );
}