import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import redis from 'redis';

const redisClient = redis.createClient();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if session data exists in Redis
      redisClient.get(decoded.userId, async (err, sessionData) => {
        if (err) throw err;

        if (sessionData === null) {
          // If session data doesn't exist, fetch it from the database
          const user = await User.findById(decoded.userId).select('-password');

          // Store user data in Redis with a TTL of 1 hour
          redisClient.setex(decoded.userId, 3600, JSON.stringify(user));

          req.user = user;
        } else {
          // If session data exists in Redis, use it instead of fetching from the database
          req.user = JSON.parse(sessionData);
        }

        next();
      });
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
