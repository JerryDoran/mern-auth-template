import { errorHandler } from '../lib/error.js';
import User from '../models/userModel.js';

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
