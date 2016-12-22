'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Friend Schema
 */
var FriendSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  friend: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  friend_name: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: Number, 
    min: 0, 
    max: 5,
    default: 1,
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Friend', FriendSchema);
