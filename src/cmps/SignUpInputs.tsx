import { useEffect, useState } from "react";

interface SignUpInputsProps {
    setLoginOrSignUp: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpInputs({ setLoginOrSignUp }: SignUpInputsProps) {
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerLevel, setRegisterLevel] = useState(1)

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [])

    // function checkIfInvalidMail(email: string): boolean {
    //     return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (registerLevel === 1) setRegisterLevel(2)
    }
    const onUpload = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (registerLevel === 2) {
            console.log('gooodddd');

        }
    }

    return (
        registerLevel === 1 ? (
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

        ) : (
            <section className="flex column">
                <form className='flex column justify-between' action="/action_page.php" onSubmit={onUpload}>
                    <label htmlFor="img">Select image:</label>
                    <input type="file" id="img" name="img" accept="image/*" />
                    <input type="submit" />
                </form>
                <input
                    required
                    placeholder='Enter your bio'
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={3}
                    maxLength={10}
                />
            </section>
        )
    );
}