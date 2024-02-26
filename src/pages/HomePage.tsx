import { useEffect } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../models/user.model";
import { useSelector } from "react-redux";

export function HomePage() {
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate();

    useEffect(() => {
        console.log('loggedInUser: ', loggedInUser)
        if (!loggedInUser) navigate('/auth')
    }, [loggedInUser])


    return (
        <h1>TEST</h1>
    )
}