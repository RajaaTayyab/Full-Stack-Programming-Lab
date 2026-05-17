import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { connectDatabase } from './config/database';
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';
import orderRoutes from './routes/orders';
import userRoutes from './routes/users';
import uploadRoutes from './routes/upload';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the other server or run:`);
        console.error(`  netstat -ano | findstr :${PORT}`);
        console.error(`  taskkill /PID <pid> /F`);
        process.exit(1);
      }
      throw err;
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error(
      'Tip: use a direct mongodb:// URI (not mongodb+srv) in backend/.env if this keeps failing.'
    );
    process.exit(1);
  });
