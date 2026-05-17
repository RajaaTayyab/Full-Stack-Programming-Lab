import dns from 'dns';
import mongoose from 'mongoose';

/** Node on Windows often fails SRV lookups; prefer a direct (non-srv) URI in .env */
export function getMongoUri(): string {
  const raw = (process.env.MONGODB_URI || process.env.MONGODB_URI_DIRECT || '').trim();
  const uri = raw.replace(/^MONGODB_URI=/, '');

  if (!uri) {
    throw new Error('MONGODB_URI is not set in backend/.env');
  }

  // Ensure a database name (Atlas needs a path before ?)
  if (/\.mongodb\.net\/?(\?|$)/.test(uri) && !/\.mongodb\.net\/[^/?]+/.test(uri)) {
    return uri.replace(/\.mongodb\.net\/?/, '.mongodb.net/rustik-plank?');
  }

  return uri;
}

export async function connectDatabase(): Promise<void> {
  const uri = getMongoUri();

  // Use public DNS — fixes querySrv ECONNREFUSED on some Windows networks
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  dns.setDefaultResultOrder('ipv4first');

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
    family: 4,
  });

  console.log('MongoDB connected');
}
