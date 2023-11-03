//server/models/index.js

const User = require('./User');
const Task = require('./Tasks');
const Goal = require('./Goals');
const Measurable = require('./Measurable');

module.exports = { User, Task, Goal, Measurable };