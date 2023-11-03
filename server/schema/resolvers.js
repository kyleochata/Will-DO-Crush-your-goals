// server/schema/resolvers.js

const { User, Task, Goal, Measurable } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
	Query: {
		// Queries to locate all instances
		users: async () => {
			return User.find().populate('tasks').populate('goals');
		},
		goals: async () => {
			return Goal.find().populate('user').populate('tasks').populate('measurables');
		},
		tasks: async () => {
			return Task.find().populate('user').populate('goal').populate('measurable');
		},
		measurables: async () => {
			return Measurable.find().populate('user').populate('goal').populate('tasks');
		},

		// Queries to locate a single instance
		user: async (_, { userId }) => {
			return User.findById(userId).populate('tasks').populate('goals');
		},
		goal: async (_, { goalId }) => {
			return Goal.findById(goalId).populate('user').populate('tasks').populate('measurables');
		},
		task: async (_, { taskId }) => {
			return Task.findById(taskId).populate('user').populate('goal').populate('measurable');
		},
		measurable: async (_, { measurableId }) => {
			return Measurable.findById(measurableId).populate('user').populate('goal').populate('tasks');
		},
	},

	Mutation: {
		// User-related mutations
		addUser: async (_, { firstName, lastName, userName, email, password }) => {
			const user = await User.create({ firstName, lastName, userName, email, password });
			const token = signToken(user);
			return { token, user };
		},
		login: async (_, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw AuthenticationError;
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw AuthenticationError;
			}

			const token = signToken(user);

			return { token, user };
		},

		// Task-related mutations
		addTask: async (_, { title, description, completionDate, priority, goalId, measurableId }, context) => {
			if (!context.user) {
				throw new AuthenticationError('You need to be logged in!');
			}

			const taskData = {
				title,
				description,
				completionDate,
				priority,
				user: context.user._id,
			};

			if (goalId) {
				taskData.goal = goalId;
			}

			if (measurableId) {
				const measurable = await Measurable.findById(measurableId);
				if (!measurable) {
					throw new Error('Measurable not found');
				}
				taskData.measurable = measurableId;
				if (goalId && goalId !== measurable.goal.toString()) {
					throw new Error('Provided goalId does not match measurable\'s goal');
				}
				taskData.goal = measurable.goal; // Ensure task is associated with measurable's goal
			}

			const task = await Task.create(taskData);

			// Update user's tasks
			await User.findByIdAndUpdate(context.user._id, { $push: { tasks: task._id } });

			// Update goal's tasks
			if (goalId) {
				await Goal.findByIdAndUpdate(goalId, { $push: { tasks: task._id } });
			}

			// Update measurable's tasks
			if (measurableId) {
				await Measurable.findByIdAndUpdate(measurableId, { $push: { tasks: task._id } });
			}

			return task;
		},


		// Goal-related mutations
		addGoal: async (_, { title, description, completionDate, measurableIds }, context) => {
			if (!context.user) {
				throw new AuthenticationError('You need to be logged in!');
			}

			const goal = await Goal.create({
				title,
				description,
				completionDate,
				user: context.user._id,
			});

			// Update user's goals
			await User.findByIdAndUpdate(context.user._id, { $push: { goals: goal._id } });

			// Associate measurables with goal
			if (measurableIds) {
				for (const measurableId of measurableIds) {
					await Measurable.findByIdAndUpdate(measurableId, { goal: goal._id });
					await Goal.findByIdAndUpdate(goal._id, { $push: { measurables: measurableId } });
				}
			}

			return goal;
		},

		// Measurable-related mutations
		addMeasurable: async (_, { title, goalId }, context) => {
			console.log(context);
			
			if (!context.user) {
				throw AuthenticationError;
			}

			const measurable = await Measurable.create({
				title,
				goal: goalId,
				user: context.user._id,
			});

			// Update goal's measurables
			await Goal.findByIdAndUpdate(goalId, { $push: { measurables: measurable._id } });

			// Update user's measurables
			await User.findByIdAndUpdate(context.user._id, { $push: { measurables: measurable._id } });

			return measurable;
		},
	},
};

module.exports = resolvers;