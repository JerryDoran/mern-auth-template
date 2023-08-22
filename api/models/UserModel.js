import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter a valid email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minLength: [6, 'Your password must be at least 6 characters'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
