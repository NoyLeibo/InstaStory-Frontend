import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../models/user.model";
import { useSelector } from "react-redux";
import { UserController } from "../cmps/UserController";
import { HomeIndex } from "../cmps/HomeIndex.tsx";

export function HomePage() {
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate();
    const [activeIcon, setActiveIcon] = useState('Home');

    useEffect(() => {
        console.log('loggedInUser: ', loggedInUser)
        if (loggedInUser === null) navigate('/auth')
    }, [])


    return (
        <>
            <UserController activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
            <HomeIndex />
        </>
    )
}