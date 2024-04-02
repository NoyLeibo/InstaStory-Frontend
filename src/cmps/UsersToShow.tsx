import { Avatar } from "@mui/material";
import { User } from "../models/user.model";

interface UsersToShowProps {
    users: User[]
}

export function UsersToShow(props: UsersToShowProps) {
    return (
        <section className="users-to-shown">
            {props.users.map((user, index) => (
                <div className="flex row space-between margin8 divider20" key={index}>
                    < div className="flex row align-center" >
                        <Avatar src={user.imgUrl || undefined} />
                        <h4 className="marginleft8">{user.username}</h4>
                    </div >
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