import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Define the structure of the cached mongoose connection.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Extend the NodeJS global type with our mongoose cache structure
 * so that we can reuse the connection during development hot-reloads.
 */
declare global {
  // Using var allows the variable to be accessible on the global object
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

/**
 * Global object is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * every time a file changes and Next.js re-compiles the code.
 */
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connects to the MongoDB database using Mongoose.
 * If a connection already exists, it returns the cached connection.
 * 
 * @returns {Promise<typeof mongoose>} A promise that resolves to the Mongoose instance.
 */
async function connectToDatabase(): Promise<typeof mongoose> {
  // 1. Return the existing connection if it is already established
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If there is no connection promise in progress, create a new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering to fail fast if the connection drops
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  
  try {
    // 3. Wait for the connection to resolve and assign it to the cache
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise cache if the connection fails so we can retry later
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
