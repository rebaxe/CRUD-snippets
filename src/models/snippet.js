/**
 * Mongoose model Snippet.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  creator: {
    type: Object,
    required: true
  }
})

export const Snippet = mongoose.model('Snippet', schema)
