// server/schema/typeDefs.js

const typeDefs = `
  type User {
    _id: ID
    auth0: String!
    name: String
    email: String
    tasks: [Task]
    goals: [Goal]
    measurables: [Measurable]
  }

  type Task {
    _id: ID
    title: String!
    description: String
    completionDate: String!
    priority: String!
    completed: Boolean!
    user: User
    goal: Goal
    measurable: Measurable
  }

  type Goal {
    _id: ID
    title: String!
    description: String!
    why: String!
    completionDate: String!
    createdAt: String!
    completed: Boolean!
    user: User
    tasks: [Task]
    measurables: [Measurable]
  }

  type Measurable {
    _id: ID
    title: String!
    goal: Goal
    user: User
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
    measurables: [Measurable]
    measurable(measurableId: ID!): Measurable
  }
  
  type Mutation {
    addUser(name: String, email: String, auth0: String!): Auth
    login(email: String!, password: String!): Auth
    addTask(title: String!, description: String!, completionDate: String!, priority: String!, goalId: ID, measurableId: ID): Task
    addGoal(title: String!, description: String!, measurableIds: [ID], why: String!, completionDate: String!): Goal
    addMeasurable(title: String!, goalId: ID!): Measurable
    editUser(userId: ID!, name: String, email: String): User
    editGoal(goalId: ID!, title: String, description: String, why: String, completionDate: String, completed: Boolean): Goal
    editTask(taskId: ID!, title: String, description: String, completionDate: String, priority: String, completed: Boolean): Task
    editMeasurable(measurableId: ID!, title: String): Measurable
    deleteUser(userId: ID!): User
    deleteGoal(goalId: ID!): Goal
    deleteTask(taskId: ID!): Task
    deleteMeasurable(measurableId: ID!): Measurable
  }
`;

module.exports = typeDefs;
