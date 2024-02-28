
export const uploadService = {
  uploadImg
}

// const api_secret = '4mlCvHWgkMwofHWFKDPS7g2Uad8'

type ImgUrlResponse = {
  public_id: string;
  secure_url: string;
}

async function uploadImg(file: File): Promise<ImgUrlResponse> {
  const CLOUD_NAME = 'dysh9q6ir'
  const UPLOAD_PRESET = "btmeuzb0"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData();
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('file', file);

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    });
    const imgUrl: ImgUrlResponse = await res.json();
    console.log('Upload Service - Successfully uploaded image', imgUrl);

    return imgUrl;
  } catch (err) {
    console.error('Failed to upload', err);
    throw err;
  }
}
