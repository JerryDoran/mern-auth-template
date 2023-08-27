import { errorHandler } from '../lib/error.js';
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function signUp(req, res, next) {
  // const { username, email, password } = req.body;

  // const newUser = new User({ username, email, password });

  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: 'User successfully created', user });
  } catch (error) {
    // next(errorHandler(300, 'something went wrong'));  //custom error example
    next(error);
  }
}

export async function signIn(req, res, next) {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email: email });

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, 'Invalid credentials'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Block password from being returned from the request for the client side
    const { password: hashedPassword, ...rest } = validUser._doc;

    // Add expiry date to the session
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    // next(errorHandler(300, 'something went wrong'));  //custom error example
    next(error);
  }
}
