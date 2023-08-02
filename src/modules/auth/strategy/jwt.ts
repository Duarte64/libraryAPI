import 'dotenv/config';
import passport from 'passport';
import mongoose from 'mongoose';
import { User } from '../../users/models/User.model';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const secretKey = process.env.SECRET_JWT ?? 'your-secret-key';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const objectId = new mongoose.Types.ObjectId(jwtPayload.sub);
      const user = await User.findOne({ _id: objectId });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);