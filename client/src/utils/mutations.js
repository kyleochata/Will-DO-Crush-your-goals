// client/src/utils/mutations.js

import { gql } from '@apollo/client';

export const CHECK_USER = gql`
mutation Mutation($authID: String!, $username: String!) {
  checkUser(authID: $authID, username: $username) {
    token
    user {
      _id
      userName
      authID
    }
  }
}
`

export const ADD_USER = gql`
  mutation addUser($authID: String!, $username: String!) {
    addUser(authID: $authID, username: $username) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($authID: String!) {
    login(authID: $authID) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($title: String!, $description: String!, $completionDate: String!, $priority: String!, $goalId: ID, $measurableId: ID) {
    addTask(title: $title, description: $description, completionDate: $completionDate, priority: $priority, goalId: $goalId, measurableId: $measurableId) {
      _id
      title
      description
      completionDate
      priority
      completed
      user {
        _id
        userName
      }
      goal {
        _id
      }
      measurable {
        _id
      }
    }
  }
`;


export const ADD_GOAL = gql`
  mutation addGoal($title: String!, $description: String!, $why: String!, $completionDate: String!, $measurableIds: [ID]) {
    addGoal(title: $title, description: $description, why: $why, completionDate: $completionDate, measurableIds: $measurableIds) {
      _id
      title
      description
      why
      completionDate
      completed
      measurables {
        _id
        title
      }
      tasks {
        _id
      }
    } 
  }
`;


export const ADD_MEASURABLE = gql`
  mutation addMeasurable($title: String!, $goalId: ID!) {
    addMeasurable(title: $title, goalId: $goalId) {
      _id
      title
      goal {
        _id
        title
      }
    }
  }
`;





export const EDIT_USER = gql`
  mutation editUser($userId: ID!, $firstName: String, $lastName: String, $userName: String, $email: String) {
    editUser(userId: $userId, firstName: $firstName, lastName: $lastName, userName: $userName, email: $email) {
      _id
      firstName
      lastName
      userName
      email
    }
  }
`;

export const EDIT_GOAL = gql`
  mutation editGoal($goalId: ID!, $title: String, $description: String, $why: String, $completionDate: String, $completed: Boolean!) {
    editGoal(goalId: $goalId, title: $title, description: $description, why: $why, completionDate: $completionDate, completed: $completed) {
      _id
      title
      description
      why
      completionDate
      completed
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask($taskId: ID!, $title: String, $description: String, $completionDate: String, $priority: String, $completed: Boolean!) {
    editTask(taskId: $taskId, title: $title, description: $description, completionDate: $completionDate, priority: $priority, completed: $completed) {
      _id
      title
      description
      completionDate
      priority
      completed
    }
  }
`;




export const EDIT_MEASURABLE = gql`
  mutation editMeasurable($measurableId: ID!, $title: String) {
    editMeasurable(measurableId: $measurableId, title: $title) {
      _id
      title
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      userName
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation deleteGoal($goalId: ID!) {
    deleteGoal(goalId: $goalId) {
      _id
      title
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      _id
      title
    }
  }
`;

export const DELETE_MEASURABLE = gql`
  mutation deleteMeasurable($measurableId: ID!) {
    deleteMeasurable(measurableId: $measurableId) {
      _id
      title
    }
  }
`;
