import { useRef, ChangeEvent } from 'react';

interface SignUpLevelTwoProps {
    onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    isUploading: boolean;
    imgData: { imgUrl: string | null; height: number; width: number; };
    bio: string
    setBio: React.Dispatch<React.SetStateAction<string>>
    handleSubmitRegister: (event: React.FormEvent<HTMLFormElement>) => void
}

export function SignUpLevelTwo({ onUpload, isUploading, imgData, bio, setBio, handleSubmitRegister }: SignUpLevelTwoProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value);
    };

    return (
        <form className='flex column' onSubmit={handleSubmitRegister}>
            <label htmlFor="imgUpload">{isUploading ? "Uploading...." : "* Upload Image"}</label>
            <input
                type="file"
                onChange={onUpload}
                accept="image/*"
                id="imgUpload"
                ref={fileInputRef}
                multiple={false}
            />
            <input
                required
                className='inputbox'
                placeholder='* Enter your bio'
                type="text"
                minLength={3}
                maxLength={50}
                value={bio}
                onChange={handleBioChange}
            />
            {imgData.imgUrl && !isUploading && (
                <div className="upload-preview flex align-center space-between">
                    <img className="profile-img" src={imgData.imgUrl} alt="Uploaded" />
                    <button className='signup-btn' type="submit">Sign up</button>
                </div>
            )}
        </form>
    );
}
