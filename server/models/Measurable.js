//server/models/Measurable.js

const { Schema, model } = require("mongoose");

const measurableSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	tasks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Task",
		},
	],
	goal: {
		type: Schema.Types.ObjectId,
		ref: "Goal",
	},
});

const Measurable = model("Measurable", measurableSchema);

module.exports = Measurable;
