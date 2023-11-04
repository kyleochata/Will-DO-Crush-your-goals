// seeders/seed.js

const db = require('../config/connection');
const { User, Task, Goal, Measurable } = require('../models');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Task.deleteMany({});
        await Goal.deleteMany({});
        await Measurable.deleteMany({});

        const users = await User.insertMany([
            {
                name: 'john_doe',
                email: 'john_doe@example.com',
                auth0: 'auth0|1234567890',
            },
            {
                name: 'jane_doe',
                email: 'jane_doe@example.com',
                auth0: 'auth0|0987654321',
            },
            {
                name: 'alice_smith',
                email: 'alice_smith@example.com',
                auth0: 'auth0|1234509876',
            },
            {
                name: 'bob_jones',
                email: 'bob_jones@example.com',
                auth0: 'auth0|6789054321',
            },
            {
                name: 'charlie_brown',
                email: 'charlie_brown@example.com',
                auth0: 'auth0|1357902468',
            },
        ]);

        const goals = await Goal.insertMany([
            {
                title: 'Learn JavaScript',
                description: 'Study JavaScript to become a better developer',
                why: 'To build better web applications',
                completionDate: new Date('2023-12-31'),
                user: users[0]._id,
            },
            {
                title: 'Exercise Regularly',
                description: 'Start exercising 3 times a week',
                why: 'To improve health and fitness',
                completionDate: new Date('2023-06-30'),
                user: users[1]._id,
            },
            {
                title: 'Read More Books',
                description: 'Read at least one book per month',
                why: 'To learn new things and relax',
                completionDate: new Date('2023-12-31'),
                user: users[2]._id,
            },
            {
                title: 'Save Money',
                description: 'Save $5000 by the end of the year',
                why: 'To have an emergency fund',
                completionDate: new Date('2023-12-31'),
                user: users[3]._id,
            },
            {
                title: 'Travel More',
                description: 'Visit three new countries this year',
                why: 'To explore new cultures and have fun',
                completionDate: new Date('2023-12-31'),
                user: users[4]._id,
            },
        ]);

        const measurables = await Measurable.insertMany([
            {
                title: 'Complete JavaScript Course',
                user: users[0]._id,
                goal: goals[0]._id,
            },
            {
                title: 'Go for a Run',
                user: users[1]._id,
                goal: goals[1]._id,
            },
            {
                title: 'Finish Reading a Book',
                user: users[2]._id,
                goal: goals[2]._id,
            },
            {
                title: 'Save $100',
                user: users[3]._id,
                goal: goals[3]._id,
            },
            {
                title: 'Visit a New Country',
                user: users[4]._id,
                goal: goals[4]._id,
            },
        ]);

        const tasks = await Task.insertMany([
            {
                title: 'Watch JavaScript Tutorial',
                completionDate: new Date('2023-01-01'),
                priority: 'High',
                user: users[0]._id,
                goal: goals[0]._id,
                measurable: measurables[0]._id,
            },
            {
                title: 'Go for a 5K Run',
                completionDate: new Date('2023-02-01'),
                priority: 'Medium',
                user: users[1]._id,
                goal: goals[1]._id,
                measurable: measurables[1]._id,
            },
            {
                title: 'Read "The Great Gatsby"',
                completionDate: new Date('2023-03-01'),
                priority: 'Low',
                user: users[2]._id,
                goal: goals[2]._id,
                measurable: measurables[2]._id,
            },
            {
                title: 'Open a Savings Account',
                completionDate: new Date('2023-04-01'),
                priority: 'High',
                user: users[3]._id,
                goal: goals[3]._id,
                measurable: measurables[3]._id,
            },
            {
                title: 'Book Flight Tickets',
                completionDate: new Date('2023-05-01'),
                priority: 'Medium',
                user: users[4]._id,
                goal: goals[4]._id,
                measurable: measurables[4]._id,
            },
        ]);

        // Update user with goals and tasks
        for (const user of users) {
            await User.updateOne(
                { _id: user._id },
                {
                    $set: {
                        goals: goals.filter(goal => goal.user.toString() === user._id.toString()).map(goal => goal._id),
                        tasks: tasks.filter(task => task.user.toString() === user._id.toString()).map(task => task._id),
                        measurables: measurables.filter(measurable => measurable.user.toString() === user._id.toString()).map(measurable => measurable._id),
                    },
                }
            );
        }

        // Update goal with tasks and measurables
        for (const goal of goals) {
            await Goal.updateOne(
                { _id: goal._id },
                {
                    $set: {
                        tasks: tasks.filter(task => task.goal.toString() === goal._id.toString()).map(task => task._id),
                        measurables: measurables.filter(measurable => measurable.goal.toString() === goal._id.toString()).map(measurable => measurable._id),
                    },
                }
            );
        }

        // Update task with measurables
        for (const task of tasks) {
            await Task.updateOne(
                { _id: task._id },
                {
                    $set: {
                        measurable: measurables.find(measurable => measurable._id.toString() === task.measurable.toString())._id,
                    },
                }
            );
        }

        // Update measurable with tasks
        for (const measurable of measurables) {
            await Measurable.updateOne(
                { _id: measurable._id },
                {
                    $set: {
                        tasks: tasks.filter(task => task.measurable.toString() === measurable._id.toString()).map(task => task._id),
                    },
                }
            );
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
});
