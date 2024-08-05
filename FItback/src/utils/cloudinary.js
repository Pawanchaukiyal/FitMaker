import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to upload a file from local path
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error('Error uploading file to Cloudinary:', error);
    return null;
  }
};

// Function to upload an image from a URL
// const uploadImageByUrl = async (imageUrl) => {
//   try {
//     if (!imageUrl) return null;
    
//     // Download the image
//     const response = await axios({ url: imageUrl, responseType: 'arraybuffer' });
//     const fileName = path.basename(imageUrl);
//     const filePath = path.join(__dirname, 'temp', fileName);

//     fs.writeFileSync(filePath, response.data);

//     // Upload to Cloudinary
//     const uploadResponse = await uploadOnCloudinary(filePath);
//     if (!uploadResponse) {
//       throw new Error('Failed to upload image to Cloudinary');
//     }
//     return uploadResponse;
//   } catch (error) {
//     console.error('Error uploading image from URL:', error);
//     return null;
//   }
// };

const uploadImageByUrl = async (imageUrl) => {
  try {
    if (!imageUrl) return null;

    const response = await cloudinary.uploader.upload(imageUrl, {
      resource_type: "auto",
    });

    return response;
  } catch (error) {
    console.error('Error uploading image from URL:', error);
    return null;
  }
};

export { uploadOnCloudinary, uploadImageByUrl };
