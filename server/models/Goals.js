const { Schema, model } = require('mongoose');

const goalSchema = new Schema({
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
  createdAt: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ]
});

const Goal = model('Goal', goalSchema);

module.exports = Goal;