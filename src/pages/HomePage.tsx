import { useEffect } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../models/user.model";
import { useSelector } from "react-redux";
import { HomeIndex } from "../cmps/HomeIndex.tsx";
import { useActiveIcon } from "../cmps/ActiveIconContext.tsx";
import { logout } from "../store/actions/user.actions.ts";


export function HomePage() {
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate();
    const { activeIcon, setActiveIcon } = useActiveIcon();

    useEffect(() => {
        if (loggedInUser === null) navigate('/auth')
        setActiveIcon('Home')
    }, [])


    function onLogOut() {
        logout()
    }

    return (
        <main className="main-container">
            <header className="controller-logo-responsive flex space-between">
                <img onClick={() => navigate('/')} src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                <span onClick={() => onLogOut()} className='logout-btn pointer fs16'>Log out</span>
            </header>
            <HomeIndex activeIcon={activeIcon} />
        </main >
    )
}