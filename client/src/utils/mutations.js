import { gql } from '@apollo/client';
// ADD_TASK 
// ADD_GOAL - Takes in tasks to complete the goal, ONLY IF user wants to.
// UPDATE_TASK - Takes in goalId to update the goal.


export const ADD_TASK = gql`
  mutation addTask($title: String!, $description: String!, $completionDate: String!, $priority: String!) {
    addTask(title: $title, description: $description, completionDate: $completionDate, priority: $priority) {
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
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($title: String!, $description: String!, $completionDate: String!) {
    addGoal(title: $title, description: $description, completionDate: $completionDate) {
      _id
      title
      description
      completionDate
      completed
    } 
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $userName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, userName: $userName, email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`