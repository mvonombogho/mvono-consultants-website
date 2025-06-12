import { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand, 
  ListObjectsV2Command 
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from './s3Client';
import { v4 as uuidv4 } from 'uuid';

const bucketName = process.env.AWS_S3_BUCKET_NAME;

/**
 * Upload a file to S3
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - The original file name
 * @param {string} contentType - The file's MIME type
 * @param {string} folder - Optional folder path within the bucket
 * @returns {Promise<string>} - The S3 key of the uploaded file
 */
export const uploadFile = async (fileBuffer, fileName, contentType, folder = '') => {
  // Generate a unique key for the file
  const fileExtension = fileName.split('.').pop();
  const key = folder ? `${folder}/${uuidv4()}.${fileExtension}` : `${uuidv4()}.${fileExtension}`;

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return key;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Failed to upload file');
  }
};

/**
 * Generate a signed URL for a file
 * @param {string} key - The S3 key of the file
 * @param {number} expiresIn - Expiration time in seconds
 * @returns {Promise<string>} - The signed URL
 */
export const getSignedFileUrl = async (key, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate file URL');
  }
};

/**
 * Delete a file from S3
 * @param {string} key - The S3 key of the file to delete
 * @returns {Promise<void>}
 */
export const deleteFile = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw new Error('Failed to delete file');
  }
};

/**
 * List files in a folder
 * @param {string} folder - The folder to list files from
 * @returns {Promise<Array>} - Array of file objects
 */
export const listFiles = async (folder = '') => {
  const params = {
    Bucket: bucketName,
    Prefix: folder,
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    return data.Contents || [];
  } catch (error) {
    console.error('Error listing files from S3:', error);
    throw new Error('Failed to list files');
  }
};
