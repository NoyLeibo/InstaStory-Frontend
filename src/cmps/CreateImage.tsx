import { ChangeEvent, useEffect, useRef, useState } from "react";
import { uploadService } from "../services/upload.service";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { postsService } from "../services/posts.service";

interface CreateImageProps {
  activeIcon: string;
  setActiveIcon: React.Dispatch<React.SetStateAction<string>>;
}
export function CreateImage({ activeIcon, setActiveIcon }: CreateImageProps) {
  const [isUploading, setIsUploading] = useState(false);
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

  useEffect(() => {
    return () => {
      console.log("Component will unmount");
      setActiveIcon("Home");
    };
  }, []);

function onClickStepBack(){
// ev.preventDefault
setImgData({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  setIsUploading(false)
}

function onUploadImage(){
  const newImage = postsService.getEmptyPost()
  console.log(newImage)
  
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
      }
    }
  };

  return (
    <section className="create-image-background">
      <div className="create-image-modal flex column">
        <div className="create-image-title flex align-center justify-center">
          Create 
        </div>
          {imgData.imgUrl && !isUploading ? (
        // <div className="create-image-main flex column align-center justify-center">
            <div className="upload-preview flex column align-center">
              <img
                className="post-img"
                src={imgData.imgUrl}
                alt="Uploaded"
              />
              <div className="flex post-btns width100">
              <button className="post-btn" onClick={onClickStepBack}><RestorePageIcon/> Pick another
              </button>
              <button className="post-btn" onClick={onUploadImage}>
                Continue<DownloadDoneIcon/>
              </button>
            </div>
         </div>
          ) : ( 
            <div className="create-image-main flex column align-center justify-center">
              <img
                className="upload-post-image"
                src="../public/svg/upload-photo.svg"
                alt="Placeholder for upload"
              />
              <div>Upload photos here.</div>
              <label htmlFor="imgUpload">
                {isUploading ? "Uploading...." : <span className="flex align-center justify-center margin8">* Upload Image <AddAPhotoIcon/></span>}
              </label>
              <input
                id="imgUpload"
                type="file"
                style={{ display: "none" }}
                onChange={onUpload}
              />
            </div>
            
          )}
      </div>
    </section>
  )
}
