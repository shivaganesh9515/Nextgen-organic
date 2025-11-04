import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(_file: Buffer, _folder: string) {
  // _file and _folder are passed but not used in this function
  // This is intentional as we're using mock data for now
  try {
    // For now, just return a mock result
    console.log('Image would be uploaded to Cloudinary here');
    return {
      secure_url: 'https://example.com/mock-image.jpg',
      public_id: 'mock-image-id',
    };
    
    // const result = await cloudinary.uploader.upload_stream(
    //   {
    //     folder: `daily-pick/${folder}`,
    //     resource_type: 'auto',
    //   },
    //   (error, result) => {
    //     if (error) throw error;
    //     return result;
    //   }
    // );
    // return result;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}