// server/schema/resolvers.js

const { User, Task, Goal, Measurable } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
	Query: {
		// Queries to locate all instances
		users: async () => {
			return User.find().populate('tasks').populate('goals').populate('measurables');
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
		user: async (_, { authID }) => {
			// console.log({ serverUser: authID })
			return User.findOne({ authID: authID }).populate('tasks').populate('goals').populate('measurables');
		},
		goal: async (_, { goalId }) => {
			return Goal.findById(goalId).populate('user').populate('tasks').populate('measurables');
		},
		task: async (_, { taskId }) => {
			return Task.findById(taskId).populate('user').populate('goal').populate('measurable');
		},
		measurable: async (_, { measurableId }) => {
			return Measurable.findById(measurableId).populate('user').populate('goal').populate('tasks');
		}
	},

	Mutation: {
		// User-related mutations
		addUser: async (_, { authID, username }) => {
			// DONT THINK THIS IS NEEDED
			const user = await User.create({ authID, username });
			const token = signToken(user);
			return { token, user };
		},
		login: async (_, { authID }) => {
			// DONT THINK THIS IS NEEDED
			const user = await User.findOne({ authID });

			if (!user) {
				throw AuthenticationError;
			}

			const token = signToken(user);

			return { token, user };
		},

		// Task-related mutations
		addTask: async (_, { title, description, completionDate, priority, goalId, measurableId }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findOne({ authID: context.user.authID });

			const taskData = {
				title,
				description,
				completionDate,
				priority,
				user
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
			await User.findOneAndUpdate({ authID: context.user.authID }, { $push: { tasks: task._id } });

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
		addGoal: async (_, { title, description, why, completionDate, measurableIds }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findOne({ authID: context.user.authID });

			const goal = await Goal.create({
				title,
				description,
				why,
				completionDate,
				user
			});

			// Update user's goals
			await User.findOneAndUpdate({ authID: context.user.authID }, { $push: { goals: goal._id } });

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

			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findOne({ authID: context.user.authID });

			const measurable = await Measurable.create({
				title,
				goal: goalId,
				user
			});

			// Update goal's measurables
			await Goal.findByIdAndUpdate(goalId, { $push: { measurables: measurable._id } });

			// Update user's measurables
			await User.findOneAndUpdate({ authID: context.user.authID }, { $push: { measurables: measurable._id } });

			return measurable;
		},

		editUser: async (_, { userId, firstName, lastName, userName, email }, context) => {
			// Authentication check if needed
			// DONT THINK THIS IS NEEDED

			const updatedUser = await User.findOneAndUpdate(
				{ authID: context.user.authID },
				{ firstName, lastName, userName, email },
				{ new: true }
			);
			return updatedUser;
		},

		// Edit a single goal
		editGoal: async (_, { goalId, title, description, why, completionDate, completed }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findOne({ authID: context.user.authID });

			const goal = await Goal.findById(goalId);

			if (!goal) {
				throw new Error('Goal not found');
			}

			if (goal.user.toString() !== user._id.toString()) {
				throw AuthenticationError;
			}

			const updatedGoal = await Goal.findByIdAndUpdate(
				goalId,
				{ title, description, why, completionDate, completed },
				{ new: true }
			);
			return updatedGoal;
		},

		// Edit a single task
		editTask: async (_, { taskId, title, description, completionDate, priority, completed }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findOne({ authID: context.user.authID });

			const task = await Task.findById(taskId);

			if (!task) {
				throw new Error('Task not found');
			}

			if (task.user.toString() !== user._id.toString()) {
				throw AuthenticationError;
			}

			const updatedTask = await Task.findByIdAndUpdate(
				taskId,
				{ title, description, completionDate, priority, completed },
				{ new: true }
			);
			return updatedTask;
		},

		// Edit a single measurable
		editMeasurable: async (_, { measurableId, title }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findOne({ authID: context.user.authID });

			const measurable = await Measurable.findById(measurableId);

			if (!measurable) {
				throw new Error('Measurable not found');
			}

			if (measurable.user.toString() !== user._id.toString()) {
				throw AuthenticationError;
			}

			const updatedMeasurable = await Measurable.findByIdAndUpdate(
				measurableId,
				{ title },
				{ new: true }
			);
			return updatedMeasurable;
		},

		// Delete a single goal
		deleteGoal: async (_, { goalId }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findOne({ authID: context.user.authID });

			const goal = await Goal.findById(goalId);

			if (!goal) {
				throw new Error('Goal not found');
			}

			if (goal.user.toString() !== user._id.toString()) {
				throw AuthenticationError;
			}

			const deletedGoal = await Goal.findByIdAndDelete(goalId);
			return deletedGoal;
		},

		// Delete a single task
		deleteTask: async (_, { taskId }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findOne({ authID: context.user.authID });

			const task = await Task.findById(taskId);

			if (!task) {
				throw new Error('Task not found');
			}

			if (task.user.toString() !== user._id.toString()) {
				throw AuthenticationError;
			}

			const deletedTask = await Task.findByIdAndDelete(taskId);
			return deletedTask;
		},

		// Delete a single measurable
		deleteMeasurable: async (_, { measurableId }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}
			const user = await User.findOne({ authID: context.user.authID });

			const measurable = await Measurable.findById(measurableId);

			if (!measurable) {
				throw new Error('Measurable not found');
			}

			if (measurable.user.toString() !== user._id.toString()) {
				throw AuthenticationError;
			}

			const deletedMeasurable = await Measurable.findByIdAndDelete(measurableId);
			return deletedMeasurable;
		},

		// update task completion
		updateTaskCompletion: async (_, { taskId, completed }, context) => {
			if (!context.user) {
				throw AuthenticationError;
			}

			const task = await Task.findById(taskId);

			if (!task) {
				throw new Error('Task not found');
			}

			if (task.user.toString() !== context.user._id.toString()) {
				throw AuthenticationError;
			}

			const updatedTask = await Task.findByIdAndUpdate(completed, { completed }, { new: true });

			return updatedTask;
		},

		checkUser: async (_, { authID, username }) => {
			try {
				const userResult = await User.find({ authID });
				if (userResult.length > 0) {
					const token = signToken({ authID, _id: userResult._id });
					return { token, user: userResult[0] };
				} else {
					const user = await User.create({ authID, userName: username });
					const token = signToken({ authID, _id: user._id });
					return { token, user };
				}
			} catch (err) {
				console.log(err);
			}
		}

	},
};

module.exports = resolvers;