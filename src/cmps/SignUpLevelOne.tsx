// import { useEffect, useState } from "react";

interface SignUpLevelOneProps {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setFullname: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    username: string
    fullname: string
    email: string
    password: string
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    setLoginOrSignUp: React.Dispatch<React.SetStateAction<string>>
}

export function SignUpLevelOne({ setUsername, setFullname, setEmail, setPassword, username, fullname, email, password, handleSubmit, setLoginOrSignUp }: SignUpLevelOneProps) {

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
                    placeholder='Fullname'
                    type="text"
                    name="Fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    minLength={3}
                    maxLength={10}
                />
                <input
                    required
                    placeholder='Email'
                    type="text"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    minLength={3}
                    maxLength={25}
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
                <button type="submit" className="bold">Register</button>
                <div className="text-center flex row align-center justify-between">
                    <span className="login-diviver"></span>
                    <span className="fs13 graytxt">OR</span>
                    <span className="login-diviver"></span>
                </div>
                <div className="text-center flex row align-center justify-center"><img className="google-emoji" src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1708892195/google_od0mhr.png" /> Log in with Google</div>
            </form>
            <div className="switch-to-card flex row justify-center align-center">
                <span>have an account? <span className="sign-up-btn pointer" onClick={() => setLoginOrSignUp('login')}>Log in</span></span>
            </div>
        </section >

    )
}