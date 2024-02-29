import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../models/user.model";
import { useSelector } from "react-redux";
import { UserController } from "../cmps/UserController";

export function HomePage() {
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate();
    const [activeIcon, setActiveIcon] = useState('Home');

    useEffect(() => {
        console.log('loggedInUser: ', loggedInUser)
        if (loggedInUser === null) navigate('/auth')
    }, [])


    return (
        <section>
            <UserController activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
        </section>
    )
}