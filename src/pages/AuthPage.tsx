import { useEffect, useState } from "react";
import { LoginInputs } from "../cmps/LoginInputs";
import { SignUpInputs } from "../cmps/SignUpInputs.tsx";
// import { userService } from '../services/user.service.ts'
import { loadUsers } from "../store/actions/user.actions.ts";
import { useSelector } from 'react-redux'
import { RootState } from "../models/user.model.ts";
import { useNavigate } from "react-router";


export function AuthPage() {

    const [loginOrSignUp, setLoginOrSignUp] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) {
            navigate('/')
            console.log('loggedInUser: ', loggedInUser)
        }
    }, [])

    useEffect(() => {
        loadUsers()
    }, [])
    useEffect(() => {
        console.log(loggedInUser);
    }, [loggedInUser])

    return (
        <section className="auth-page flex row align-center justify-center">
            <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864012/auth_synw53.png" />
            <div className="login-cards flex column align-center justify-center ">
                <div className="login-card flex column align-center">
                    <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                    {loginOrSignUp === 'login' ?
                        <LoginInputs setLoginOrSignUp={setLoginOrSignUp} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                        :
                        <SignUpInputs setLoginOrSignUp={setLoginOrSignUp} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                    }
                </div>
                <div>
                    <div className="text-center fs14 padding1">Get the app.</div>
                    <div className="get-app-imgs flex row">
                        <img className="pointer" src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708865831/playstore_guwtay.png" />
                        <img className="pointer" src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708865834/microsoft_bvv21s.png" />
                    </div>
                </div>
            </div>
        </section>
    )
}
