const { User, Task, Goal } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return User.find().populate("tasks").populate("goals");
		},
		user: async (parent, { userId }) => {
			return User.findOne({ _id: userId }).populate("tasks").populate("goals");
		},
		tasks: async () => {
			return Task.find().populate("user").populate("goal");
		},
		task: async (parent, { taskId }) => {
			return Task.findOne({ _id: taskId }).populate("user").populate("goal");
		},
		goals: async () => {
			return Goal.find().populate("user").populate("tasks");
		},
		goal: async (parent, { goalId }) => {
			return Goal.findOne({ _id: goalId }).populate("user").populate("tasks");
		},
	},

	Mutation: {
		addUser: async (parent, { firstName, lastName, username, email, password }) => {
			const user = await User.create({ firstName, lastName, username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
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
    addTask: async (parent, { title, description, completionDate, priority }, context) => {
      if (context.user) {
        const task = await Task.create({ title, description, completionDate, priority, user: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { tasks: task._id } });
        return task;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addGoal: async (parent, { title, description, completionDate }, context) => {
      if (context.user) {
        const goal = await Goal.create({ title, description, completionDate, completed, user: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { goals: goal._id } });
        return goal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
	},
};

module.exports = resolvers;