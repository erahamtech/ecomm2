const multer = require("multer");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../config/aws.config");
const { v4: uuidv4 } = require("uuid");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToS3 = async (file) => {
  const key = `products/${uuidv4()}-${file.originalname}`;
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    })
  );
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

module.exports = {
  upload,
  uploadToS3
};
