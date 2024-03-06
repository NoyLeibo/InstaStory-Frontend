import { ChangeEvent, useEffect, useRef, useState } from "react";
import { uploadService } from "../services/upload.service";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { postsService } from "../services/posts.service";
import { storageService } from "../services/async-storage.service";
import { User } from "../models/user.model";
import EmojiPicker from "emoji-picker-react";
import useOutsideClick from "../services/onclickoutside.service";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
interface CreateImageProps {
  activeIcon: string;
  setActiveIcon: React.Dispatch<React.SetStateAction<string>>;
  loggedInUser: User | null
}
export function CreateImage({ loggedInUser, activeIcon, setActiveIcon }: CreateImageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStepLevel, setUploadStepLevel] = useState(1);
  const [imageTxt, setImageTxt] = useState('');
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imgData, setImgData] = useState<{
    imgUrl: string | null;
    height: number;
    width: number;
  }>({
    imgUrl: null,
    height: 500,
    width: 500,
  });
  const emojiContentRef = useOutsideClick(() => setIsEmojiModalOpen(false))
  const uploadImageContentRef = useOutsideClick(() => setActiveIcon('Home'))

  useEffect(() => {
    return () => {
      console.log("Component will unmount");
      setActiveIcon("Home");
    };
  }, []);

  function onClickStepBack() {
    // ev.preventDefault
    setImgData({
      imgUrl: null,
      height: 500,
      width: 500,
    })
    setIsUploading(false)
  }

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    if (emojiObject && emojiObject.emoji) {
      setImageTxt((prevText) => prevText + emojiObject.emoji)
      setIsEmojiModalOpen(false)
    } else {
      console.error('Emoji data not found')
    }
  }
  const toggleEmojiPicker = () => {
    setIsEmojiModalOpen(!isEmojiModalOpen)
  }

  function onUploadImage() {
    const newImage = postsService.getEmptyPost()
    console.log(newImage)
    if (imgData.imgUrl) newImage.imgUrl = imgData.imgUrl
    else alert('error no imgUrl ')
    newImage.createdAt = String(new Date())
    newImage._id = storageService.makeId()
    newImage.txt = imageTxt
    if (loggedInUser) newImage.by = { imgUrl: loggedInUser.imgUrl || '', username: loggedInUser.username, _id: loggedInUser._id }
    // _id: string;
    // createdAt: any;
    // txt: string;
    // imgUrl: string;
    // by: UserMinimal;
    // loc: Location;
    // comments: Comment[];
    // likedBy: UserMinimal[]
    // tags: string[];
  }
  const onUpload = async (ev: ChangeEvent<HTMLInputElement>): Promise<void> => {
    ev.preventDefault();
    const files = ev.target.files;

    if (files && files.length > 0) {
      setIsUploading(true);
      const file = files[0];
      try {
        const uploadResponse = await uploadService.uploadImg(file);
        console.log("Upload response:", uploadResponse); // Log the entire response for debugging
        if (uploadResponse.secure_url) {
          setImgData({
            ...imgData,
            imgUrl: uploadResponse.secure_url,
          });
          console.log(
            "Successfully uploaded image:",
            uploadResponse.secure_url
          );
        } else {
          console.error("Upload succeeded but secure_url is missing");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
        setUploadStepLevel(2)
      }
    }
  }
  function handleTextChange(ev: any) {
    setImageTxt(ev.target.value)
  }
  return (
    <section className="create-image-background">
      <div ref={uploadImageContentRef} className="create-image-modal flex column">
        <div className="create-image-title flex align-center justify-center">
          Create
        </div>
        {uploadStepLevel === 1 && (
          <div className="create-image-main  flex column align-center justify-center">
            {/* Wrap the clickable elements with a label */}
            <label htmlFor="imgUpload" style={{ cursor: 'pointer', textAlign: 'center' }}>
              <img className="upload-post-image" src="https://res.cloudinary.com/dysh9q6ir/image/upload/v1709736903/upload-photo_fznclk.svg" alt="Placeholder for upload" />
              <div>Upload photos here.</div>
            </label>
            <label className="pointer" htmlFor="imgUpload">
              {isUploading ? "Uploading...." : <span className="flex align-center justify-center margin8">* Upload Image <AddAPhotoIcon /></span>}
            </label>
            <input id="imgUpload" type="file" style={{ display: "none" }} onChange={onUpload} />
          </div>
        )}


        {uploadStepLevel === 2 && imgData.imgUrl && (
          <div className="upload-preview flex column align-center">
            <img className="post-img" src={imgData.imgUrl} alt="Uploaded" />
            <div className="flex post-btns width100">
              <button className="post-btn-step2" onClick={onClickStepBack}><SkipPreviousIcon /> Pick another</button>
              <span className="bold fs16">Is the picture ok?</span>
              <button className="post-btn-step2" onClick={() => setUploadStepLevel(3)}>Continue<SkipNextIcon /></button>
            </div>
          </div>
        )}
        {uploadStepLevel === 3 && (
          <div className="upload-preview-step3 flex column align-center">
            <div>
              <textarea
                className="post-create-textarea"
                value={imageTxt}
                placeholder="Write a caption..."
                onChange={handleTextChange} />

              <div className="flex row">
                <div className="emoji-text-length flex">
                  <span>
                    <img src={'../svg/emoji.svg'} className="toggle-emoji-picker" onClick={toggleEmojiPicker} />
                    <span className="text-length">{imageTxt.length}/2,200</span>
                  </span>
                  <span className="post-btn pointer" onClick={onUploadImage}>Continue<DownloadDoneIcon /></span>
                </div>

              </div>

            </div>
            <img className="post-image-before-post" src={imgData.imgUrl || ''} />
          </div>
        )}

      </div>

      {isEmojiModalOpen && (<div className="emoji-modal">
        <div ref={emojiContentRef}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      </div>)}
    </section>
  )
}
