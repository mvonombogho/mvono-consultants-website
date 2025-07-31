import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
});

/**
 * Middleware to handle file uploads
 * @param {string} fieldName - Form field name that contains the file
 */
export const uploadMiddleware = (fieldName) => {
  return async (req, res, next) => {
    // Use multer's single file upload
    const multerSingle = upload.single(fieldName);
    
    try {
      await new Promise((resolve, reject) => {
        multerSingle(req, res, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
      
      next();
    } catch (error) {
      res.status(500).json({ error: 'File upload failed', details: error.message });
    }
  };
};

/**
 * Middleware to handle multiple file uploads
 * @param {string} fieldName - Form field name that contains the files
 * @param {number} maxCount - Maximum number of files
 */
export const uploadMultipleMiddleware = (fieldName, maxCount = 5) => {
  return async (req, res, next) => {
    // Use multer's array upload
    const multerArray = upload.array(fieldName, maxCount);
    
    try {
      await new Promise((resolve, reject) => {
        multerArray(req, res, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
      
      next();
    } catch (error) {
      res.status(500).json({ error: 'File upload failed', details: error.message });
    }
  };
};

// For API Routes in Next.js
export const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      
      return resolve(result);
    });
  });
};
