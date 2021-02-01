/**
 * Mongoose model User.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'Password must be at minimum 10 charachters long.'],
    maxlength: 1000
  }
})

schema.pre('save', async function () {
  this.password = bcrypt.hash(this.password, 8)
})

export const User = mongoose.model('User', schema)
