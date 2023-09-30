import { errorHandler } from '../lib/error.js';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';

export function getUser(req, res) {
  res.json({ message: 'User route is working' });
}

export async function updateUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    // return res.status(401).json('You can only update your account');
    return next(errorHandler(401, 'You can only update your account'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 12);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      // this gives me the new updated user
      { new: true }
    );
    // separate out the password from the response
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ success: true, ...rest });
  } catch (error) {
    next(error);
  }
}
export async function deleteUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    // return res.status(401).json('You can only update your account');
    return next(errorHandler(401, 'You can only delete your account'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json('User has been deleted.');
  } catch (error) {
    next(error);
  }
}
