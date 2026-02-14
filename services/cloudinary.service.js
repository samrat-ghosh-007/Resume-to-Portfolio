// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// exports.uploadPDF = async (filePath) => {
//   const result = await cloudinary.uploader.upload(filePath, {
//     resource_type: "raw", 
//     folder: "resumes",
//   });

  
//   fs.unlinkSync(filePath);

//   return result;
// };

// exports.deletePDF = async (publicId) => {
//   await cloudinary.uploader.destroy(publicId, {
//     resource_type: "raw",
//   });
// };

// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// exports.uploadPDF = async (filePath) => {

//   const result = await cloudinary.uploader.upload(filePath, {
//   resource_type: "raw",
//   folder: "resumes",
//   use_filename: true,
//   unique_filename: false
// });


//   // delete local file after upload
//   fs.unlinkSync(filePath);

//   return result;
// };


const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadPDF = async (filePath) => {

  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "raw",
    folder: "resumes",
    type: "upload",         
    access_mode: "public"    
  });

  fs.unlinkSync(filePath);

  return result;
};
