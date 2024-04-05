import React, { useEffect } from "react";
import { login } from "../store/actions/user.actions";
import { useNavigate } from "react-router";


interface LoginInputsProps {
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
}

export function LoginInputs({ username, setPassword, setUsername, password }: LoginInputsProps) {
    let navigate = useNavigate();

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
    }

    return (
        <section className="flex column fs14">
            <form className="login-details flex column align-center" onSubmit={handleSubmit}>
                <input
                    required
                    placeholder='*Username'
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength={3}
                    maxLength={10}
                    autoComplete="username" />
                <input
                    required
                    placeholder="*Password"
                    type="password"
                    name="password"
                    minLength={3}
                    maxLength={10}
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bold">Log in</button>
                <div className="text-center flex row align-center justify-between">
                    <span className="login-diviver"></span>
                    <span className="fs13 graytxt">OR</span>
                    <span className="login-diviver"></span>
                </div>
                <div className="text-center flex row align-center justify-center"><img className="google-emoji" src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708892195/google_od0mhr.png" /> Log in with Google</div>
            </form>
        </section>
    );
}
