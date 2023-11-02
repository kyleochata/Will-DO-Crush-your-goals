const typeDefs = `
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    password: String!
    tasks: [Task]
    goals: [Goal]
  }

  type Task {
    _id: ID
    title: String!
    description: String
    completionDate: String!
    priority: String!
    completed: Boolean!
    user: [User]
    goal: Goal
  }

  type Goal {
    _id: ID
    title: String!
    description: String!
    measurable: String!
    why: String!
    completionDate: String!
    createdAt: String!
    completed: Boolean!
    user: [User]
    tasks: [Task]
    }

    type Auth {
      token: ID!
      user: User
    }

    type Query {
      users: [User]
      user(userId: ID!): User
      tasks: [Task]
      task(taskId: ID!): Task
      goals: [Goal]
      goal(goalId: ID!): Goal
    }
    
    type Mutation {
      addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
      login(email: String!, password: String!): Auth
      addTask(title: String!, description: String!, completionDate: String!, priority: String!): Task
      addGoal(title: String!, description: String!, completionDate: String!): Goal
    }
    `;

module.exports = typeDefs;