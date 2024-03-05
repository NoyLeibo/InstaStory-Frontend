import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../models/user.model";
import { useSelector } from "react-redux";
import { UserController } from "../cmps/UserController";
import { UserControllerResponsive } from "../cmps/UserControllerResponsive.tsx";
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
            <header className="controller-logo-responsive">
                <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
            </header>
            <UserController activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
            <UserControllerResponsive loggedInUser={loggedInUser} activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
            <HomeIndex />
        </main >
    )
}