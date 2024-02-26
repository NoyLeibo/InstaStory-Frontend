import { useEffect } from "react";

interface SignUpInputsProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setLoginOrSignUp: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpInputs({ setLoginOrSignUp, handleSubmit, userName, setUserName, password, setPassword }: SignUpInputsProps) {

    useEffect(() => {
        setUserName('')
        setPassword('')
    }, [])
    // function checkIfInvalidMail(email: string): boolean {
    //     return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // }

    return (
        <section className="flex column fs14">
            <form className="login-details flex column align-center" onSubmit={handleSubmit}>
                <input
                    required
                    placeholder='Username'
                    type="text"
                    name="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    minLength={3}
                    maxLength={10}
                />
                <input
                    required
                    placeholder='Fullname'
                    type="text"
                    name="Fullname"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    minLength={3}
                    maxLength={10}
                />
                <input
                    required
                    placeholder='Email'
                    type="text"
                    name="Email"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
        </section>
    )
}