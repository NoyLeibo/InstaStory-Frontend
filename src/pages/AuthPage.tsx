import { useEffect, useState } from "react";
import { LoginInputs } from "../cmps/LoginInputs";
import { SignUpInputs } from "../cmps/SignUpInputs.tsx";
// import { userService } from '../services/user.service.ts'
import { loadUsers, login } from "../store/actions/user.actions.ts";
import { useSelector } from 'react-redux'
import { RootState } from "../models/user.model.ts";
import { useNavigate } from "react-router";


export function AuthPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginOrSignUp, setLoginOrSignUp] = useState('login')
    const [users, setUsers] = useState<any[]>([])
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    let navigate = useNavigate();

    useEffect(() => {
        console.log('loggedInUser: ', loggedInUser)
        if (loggedInUser) navigate('/')
    }, [])

    useEffect(() => {
        loadUsers()
        setUsers(users)
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {

            if (await login({ username, password })) navigate('/')
        }
        catch (err) {
            console.log('cannot login ', err);
        }
    }

    return (
        <section className="auth-page flex row align-center justify-center">
            <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864012/auth_synw53.png" />
            <div className="login-cards flex column align-center justify-center">
                <div className="login-card flex column align-center">
                    <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                    {loginOrSignUp === 'login' ?
                        <LoginInputs setLoginOrSignUp={setLoginOrSignUp} setUserName={setUsername} userName={username} setPassword={setPassword} password={password} handleSubmit={handleSubmit} />
                        :
                        <SignUpInputs setLoginOrSignUp={setLoginOrSignUp} setUserName={setUsername} userName={username} setPassword={setPassword} password={password} handleSubmit={handleSubmit} />
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
