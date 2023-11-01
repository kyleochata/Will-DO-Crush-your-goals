const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  completionDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: [
    {
    type: Schema.Types.ObjectId,
    ref: 'User',
    }
  ],
  goal: {
    type: Schema.Types.ObjectId,
    ref: 'Goal',
  },
});

const Task = model('Task', taskSchema);

module.exports = Task;