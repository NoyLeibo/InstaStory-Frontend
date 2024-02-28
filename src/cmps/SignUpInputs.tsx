import { useEffect, useState, ChangeEvent } from "react";
import { SignUpLevelOne } from "../cmps/SignUpLevelOne";
import { SignUpLevelTwo } from "../cmps/SignUpLevelTwo.tsx";
import { uploadService } from '../services/upload.service';
import { userService } from "../services/user.service.ts";
import { RootState, emptyUser } from "../models/user.model.ts";
import { useNavigate } from "react-router";
import { loadUsers, login, signup } from "../store/actions/user.actions.ts";
import { useSelector } from "react-redux";
// import { login } from "../store/actions/user.actions.ts";

interface SignUpInputsProps {
    setLoginOrSignUp: React.Dispatch<React.SetStateAction<string>>
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
}


export function SignUpInputs({ setLoginOrSignUp, username, setPassword, setUsername, password }: SignUpInputsProps) {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [registerLevel, setRegisterLevel] = useState(1)
    const [bio, setBio] = useState('')
    const [isUploading, setIsUploading] = useState(false);
    const [imgData, setImgData] = useState<{ imgUrl: string | null; height: number; width: number; }>({
        imgUrl: null,
        height: 500,
        width: 500,
    });
    let navigate = useNavigate();
    const loggedInUser = useSelector((state: RootState) => state.userModule.onlineUser);

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [])

    function checkIfInvalidMail(email: string): boolean {
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    // const handleSubmitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     let newUserDetails: emptyUser = userService.createEmptyUser()

    //     if (bio && imgData.imgUrl && !isUploading) {
    //         newUserDetails = { ...newUserDetails, bio, imgUrl: imgData.imgUrl, password, username, email, fullname }
    //         // console.log(newUserDetails);
    //         console.log('----------------------------------------------------------------------------------------');

    //         // שמירה של המשתמש
    //         signup(newUserDetails) // ON LOCALSTORAGE
    //         // userService.saveLocalUser(newUserDetails)

    //         // שמירה בSOTRE של המשתמש 
    //         loadUsers()

    //         // התחברות למשתמש
    //         userService.login({ username, password }) // מחבר את המשתמש ל SESSION - STORAGE


    //         // if (loggedInUser) {
    //         navigate('/')
    //         // }
    //     }
    // };

    const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let newUserDetails: emptyUser = userService.createEmptyUser()
        newUserDetails = { ...newUserDetails, bio, imgUrl: imgData.imgUrl, password, username, email, fullname }
        try {
            await userService.signup(newUserDetails)
            await loadUsers()
            if (await login({ username, password })) navigate('/')

            // const loginResponse = await userService.login({ username: newUserDetails.username, password: newUserDetails.password });
        } catch (error) {
            console.error('Signup or login failed:', error);
            // Handle error, e.g., show an error message to the user
        }
        if (loggedInUser) navigate('/'); // Navigate to the homepage or dashboard on successful login

    };



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (registerLevel === 1 && !checkIfInvalidMail(email)) setRegisterLevel(2)
        if (checkIfInvalidMail(email)) alert('Your email is not valid')
    }
    const onUpload = async (ev: ChangeEvent<HTMLInputElement>): Promise<void> => {
        ev.preventDefault();
        const files = ev.target.files;

        if (files && files.length > 0) {
            setIsUploading(true);
            const file = files[0];

            try {
                const uploadResponse = await uploadService.uploadImg(file);
                console.log('Upload response:', uploadResponse); // Log the entire response for debugging

                if (uploadResponse.secure_url) {
                    setImgData({
                        ...imgData,
                        imgUrl: uploadResponse.secure_url,
                    });
                    console.log('Successfully uploaded image:', uploadResponse.secure_url);
                } else {
                    console.error('Upload succeeded but secure_url is missing');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setIsUploading(false);
            }
        }
    };


    return (
        registerLevel === 1 ? (
            <SignUpLevelOne setLoginOrSignUp={setLoginOrSignUp} handleSubmit={handleSubmit} password={password} setPassword={setPassword} email={email} setEmail={setEmail} fullname={fullname} setFullname={setFullname} username={username} setUsername={setUsername} />
        ) : (
            <SignUpLevelTwo handleSubmitRegister={handleSubmitRegister} bio={bio} setBio={setBio} onUpload={onUpload} isUploading={isUploading} imgData={imgData} />
        )
    );
}