import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Prevents duplicate registrations
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // Default is a regular customer
    },
  },
  {
    timestamps: true, // Automatically tracks 'createdAt' and 'updatedAt'
  }
);

/**
 * Method to compare entered password with the hashed password in the DB
 * Used during the Login process in userController.js
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Middleware: Automatically hashes the password before saving to the DB.
 * This runs on user registration and password updates.
 */
userSchema.pre('save', async function (next) {
  // If the password field hasn't been modified, skip hashing
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;