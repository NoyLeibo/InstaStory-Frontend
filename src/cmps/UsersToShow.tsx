import { Avatar } from "@mui/material";
import { User } from "../models/user.model";

interface UsersToShowProps {
    users: User[]
}

export function UsersToShow(props: UsersToShowProps) {
    return (
        <section >
            {props.users.map((user, index) => (
                <div className="flex row space-between flex-grow" key={index}>
                    < div className="flex row" >
                        <Avatar src={user.imgUrl || undefined} />
                        <h4>{user.username}</h4>
                    </div >
                    <div className="flex column">
                        <h5>{user.followers.length} followers</h5>
                        <h5>{user.following.length} following</h5>
                    </div>
                </div >
            ))
            }
        </ section >
    );
}