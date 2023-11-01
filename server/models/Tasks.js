const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
  },
  completionDate: {
    type: Date,
    require: true,
  },
  priority: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Task = model('Task', taskSchema);

module.exports = Task;