import mongoose, { Schema, models } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = hashSync(this.password, 10);
  next();
});

// Method to check password
userSchema.methods.comparePassword = function(candidatePassword) {
  return compareSync(candidatePassword, this.password);
};

export default models.User || mongoose.model('User', userSchema);
