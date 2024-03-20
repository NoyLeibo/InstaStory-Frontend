import { useEffect, useState } from "react";
import { LoginInputs } from "../cmps/LoginInputs";
import { SignUpInputs } from "../cmps/SignUpInputs.tsx";
// import { userService } from '../services/user.service.ts'
import { loadUsers } from "../store/actions/user.actions.ts";
import { useSelector } from 'react-redux'
import { RootState } from "../models/user.model.ts";
import { useNavigate } from "react-router";
import { ThreeCircles } from "react-loader-spinner";


export function AuthPage() {

    const [loginOrSignUp, setLoginOrSignUp] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);
    const isLoadingPage = useSelector((state: RootState) => state.userModule.isLoadingPage);
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

    return (isLoadingPage === false ?
        <section className="auth-page flex row align-center justify-center">
            <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864012/auth_synw53.png" />
            <div className="login-cards flex column align-center justify-center ">
                <div className="login-card flex column align-center">
                    <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                    {loginOrSignUp === 'login' ?
                        <LoginInputs username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                        :
                        <SignUpInputs username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                    }
                </div>
                {loginOrSignUp === 'login' ?
                    <div className="fs14 switch-to-card flex row justify-center align-center">
                        <span>Don't have an account? <span className="sign-up-btn pointer" onClick={() => setLoginOrSignUp('signUp')}>Sign up</span></span>
                    </div>
                    :
                    <div className="fs14 switch-to-card flex row justify-center align-center">
                        <span>have an account? <span className="sign-up-btn pointer" onClick={() => setLoginOrSignUp('login')}>Log in</span></span>
                    </div>
                }
                <div>
                    <div className="text-center fs14 padding1">Get the app.</div>
                    <div className="get-app-imgs flex row">
                        <img className="pointer" src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708865831/playstore_guwtay.png" />
                        <img className="pointer" src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708865834/microsoft_bvv21s.png" />
                    </div>
                </div>
            </div>
        </section>
        :
        <section className="flex justify-center">
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </section>
    )
}
