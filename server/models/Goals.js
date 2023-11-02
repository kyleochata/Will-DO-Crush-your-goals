const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
	},
	measurable: {
		type: String,
		required: true,
	},
	why: {
		type: String,
		required: true,
	},
	completionDate: {
		type: Date,
		required: true,
		default: () => Date.now() + 30 * 60 * 60 * 24 * 1000,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	completed: {
		type: Boolean,
		required: true,
		default: false,
	},
	user: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	tasks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Task",
		},
	],
});

const Goal = model("Goal", goalSchema);

module.exports = Goal;
