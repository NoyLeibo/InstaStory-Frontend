import React, { useEffect } from "react";
import { login } from "../store/actions/user.actions";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../models/user.model";

interface LoginInputsProps {
    setLoginOrSignUp: React.Dispatch<React.SetStateAction<string>>;
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
}

export function LoginInputs({ setLoginOrSignUp, username, setPassword, setUsername, password }: LoginInputsProps) {
    let navigate = useNavigate();
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (await login({ username, password })) navigate('/')
        }
        catch (err) {
            console.log('cannot login ', err);
        }

        console.log('---------------------------------------------------');
        console.log(loggedInUser);
        console.log('---------------------------------------------------');
        if (loggedInUser) {
            navigate('/')
        }
    }

    return (
        <section className="flex column fs14">
            <form className="login-details flex column align-center" onSubmit={handleSubmit}>
                <input
                    required
                    placeholder='Username'
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength={3}
                    maxLength={10}
                />
                <input
                    required
                    placeholder='Password'
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={3}
                    maxLength={10}
                />
                <button type="submit" className="bold">Log in</button>
                <div className="text-center flex row align-center justify-between">
                    <span className="login-diviver"></span>
                    <span className="fs13 graytxt">OR</span>
                    <span className="login-diviver"></span>
                </div>
                <div className="text-center flex row align-center justify-center"><img className="google-emoji" src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708892195/google_od0mhr.png" /> Log in with Google</div>
            </form>
            <div className="switch-to-card flex row justify-center align-center">
                <span>Don't have an account? <span className="sign-up-btn pointer" onClick={() => setLoginOrSignUp('signUp')}>Sign up</span></span>
            </div>
        </section>
    );
}
