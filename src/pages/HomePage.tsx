import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../models/user.model";
import { useSelector } from "react-redux";
import { UserController } from "../cmps/UserController";
import { HomeIndex } from "../cmps/HomeIndex.tsx";

export function HomePage() {
    const [activeIcon, setActiveIcon] = useState('Home');
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser === null) navigate('/auth')
    }, [])


    return (
        <main className="main-container">
            <UserController activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
            <HomeIndex />
        </main >
    )
}