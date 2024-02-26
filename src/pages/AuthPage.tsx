import { useEffect, useState } from "react";
import { LoginInputs } from "../cmps/LoginInputs";
import { SignUpInputs } from "../cmps/SignUpInputs.tsx";
import { userService } from '../services/user.service.ts'

export function AuthPage() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginOrSignUp, setLoginOrSignUp] = useState('login')
    const [users, setUsers] = useState<any[]>([])

    // useEffect(() => {
    //     console.log(loginOrSignUp)
    // }, [loginOrSignUp])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }
    console.log(users)

    // function checkIfInvalidMail(email: string): boolean {
    //     return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // if checkIfInvalidMail(userName){
        //     alert('')
        // }
        console.log('Logging in with:', userName, password);
    }
    return (
        <section className="auth-page flex row align-center justify-center">
            <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864012/auth_synw53.png" />
            <div className="login-cards flex column align-center justify-center">
                <div className="login-card flex column align-center">
                    <img src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708864304/logo_vevhsx.png" alt="Logo" />
                    {loginOrSignUp === 'login' ?
                        <LoginInputs setLoginOrSignUp={setLoginOrSignUp} setUserName={setUserName} userName={userName} setPassword={setPassword} password={password} handleSubmit={handleSubmit} />
                        :
                        <SignUpInputs setLoginOrSignUp={setLoginOrSignUp} setUserName={setUserName} userName={userName} setPassword={setPassword} password={password} handleSubmit={handleSubmit} />
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
