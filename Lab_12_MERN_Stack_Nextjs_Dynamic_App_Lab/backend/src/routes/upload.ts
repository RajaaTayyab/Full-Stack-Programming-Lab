import { Router, Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from '../middleware/auth';
import { adminOnly } from '../middleware/admin';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

router.post('/', protect, adminOnly, upload.array('images', 5), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const urls: string[] = [];
    for (const file of files) {
      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'rustik-plank', quality: 'auto' },
          (err, result) => err ? reject(err) : resolve(result as { secure_url: string })
        );
        stream.end(file.buffer);
      });
      urls.push(result.secure_url);
    }
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

export default router;