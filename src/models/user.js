/**
 * Mongoose model User.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

// Hash and salt password before save.
schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

/**
 * Authenticate a user.
 *
 * @param {string} username A string representing a username.
 * @param {string} password A string representing a password.
 * @returns {object} Represents a user.
 */
schema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  console.log(user)

  // If the user was not found or the password did not match - throw error.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Login failed.')
  }
  // If user was found and the password matched - return user.
  console.log('Successful login!')
  return user
}

export const User = mongoose.model('User', schema)
