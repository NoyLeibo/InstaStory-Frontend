import { useEffect } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../models/user.model";
import { useSelector } from "react-redux";
import { HomeIndex } from "../cmps/HomeIndex.tsx";
import { useActiveIcon } from "../cmps/ActiveIconContext.tsx";


export function HomePage() {
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate();
    const { activeIcon } = useActiveIcon();

    useEffect(() => {
        if (loggedInUser === null) navigate('/auth')
    }, [])

    return (
        <main className="main-container">
            <header className="controller-logo-responsive">
                <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
            </header>
            <HomeIndex activeIcon={activeIcon} />
        </main >
    )
}