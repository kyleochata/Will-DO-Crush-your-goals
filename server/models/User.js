//server/models/User.js

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	userName: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, "Please enter a valid email address"],
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
	},
	tasks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Task",
		},
	],
	goals: [
		{
			type: Schema.Types.ObjectId,
			ref: "Goal",
		},
	],
	measurables: [
		{
			type: Schema.Types.ObjectId,
			ref: "Measurable",
		},
	],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;