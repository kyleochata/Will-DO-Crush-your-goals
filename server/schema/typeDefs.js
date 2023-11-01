const typeDefts = `
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    tasks: [Task]
  }

  type Task {
    _id: ID
    title: String!
    description: String!
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
    }
    `;

module.exports = typeDefs;