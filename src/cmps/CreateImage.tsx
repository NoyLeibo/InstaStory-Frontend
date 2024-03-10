import { ChangeEvent, useEffect, useState } from "react";
import { uploadService } from "../services/upload.service";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { postsService } from "../services/posts.service";
import { storageService } from "../services/async-storage.service";
import { User } from "../models/user.model";
import EmojiPicker from "emoji-picker-react";
import useOutsideClick from "../services/onclickoutside.service";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SimpleMap from "./GoogleMap";
import { onPostReadyImage } from "../store/actions/posts.actions";

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
  const [cords, setCords] = useState({ lat: 32.109333, lng: 34.855499 })
  const [imageToEdit, setImageToEdit] = useState(postsService.getEmptyPost())

  // const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      const city = imageToEdit.loc.city;

      if (!city) return

      const apiKey = 'FI4PLbJWY419OZOekoGiEw==YlZDI137pJrTNAF1';
      const url = `https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(city)}`

      try {
        const response = await fetch(url, {
          headers: {
            'X-Api-Key': apiKey
          }
        })

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        console.log(data);
        setCords({ lat: data[0].latitude, lng: data[0].longitude });
      } catch (error) {
        console.error('Request failed:', error);
      }
    };

    fetchData();
  }, [imageToEdit.loc.city]); // Dependency array ensures effect runs on changes to city or country


  function onClickStepBack() {
    // ev.preventDefault
    setImgData({
      imgUrl: null,
      height: 500,
      width: 500,
    })
    setIsUploading(false)
    setUploadStepLevel(1)
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
    if (!imageToEdit.loc.city) alert('error no city located')
    if (imgData.imgUrl) imageToEdit.imgUrl = imgData.imgUrl
    else alert('error no imgUrl ')
    imageToEdit.createdAt = new Date().getTime()
    imageToEdit._id = storageService.makeId()
    imageToEdit.txt = imageTxt
    if (loggedInUser) imageToEdit.by = { imgUrl: loggedInUser.imgUrl || '', username: loggedInUser.username, _id: loggedInUser._id }
    imageToEdit.loc.lat = cords.lat
    imageToEdit.loc.lng = cords.lng
    try {
      onPostReadyImage(imageToEdit)
      setActiveIcon("Home")
    } catch (err) {
      console.log(err);

    }
  }

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target;

    setImageToEdit(prev => {
      // Directly update 'country' and 'city' within the loc object
      if (name === "country" || name === "city") {
        return {
          ...prev,
          loc: {
            ...prev.loc,
            [name]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
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
      <div ref={isEmojiModalOpen ? null : uploadImageContentRef} className="create-image-modal flex column">
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
                  <span className="post-btn pointer" onClick={onUploadImage}>Post<DownloadDoneIcon /></span>
                </div>
              </div>

            </div>
            <div className="loc-step-container">
              <label className="flex column">
                <span>City</span>
                <input
                  className="edit-input name-input"
                  value={imageToEdit.loc.city}
                  onChange={handleChange}
                  type="text"
                  name="city"
                  placeholder="City"
                />
              </label>
            </div>

            <SimpleMap lat={cords.lat} lng={cords.lng} marker={"You"} />
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
