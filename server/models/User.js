const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  userName: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
  }
]
});

const User = model('User', userSchema);

module.exports = User;