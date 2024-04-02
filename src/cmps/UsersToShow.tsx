import { Avatar } from "@mui/material";
import { User } from "../models/user.model";

interface UsersToShowProps {
    users: User[]
}
export function UsersToShow(props: UsersToShowProps) {
    return (
        <section className="flex column">
            {props.users.map((user, index) => (
                <div className="flex row" key={index}>
                    <Avatar src={user.imgUrl || undefined} />
                    <h1>{user.username}</h1>
                </div>
            ))}
        </section>
    );
}