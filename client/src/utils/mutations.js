import { gql } from '@apollo/client';
// ADD_TASK 
// ADD_GOAL - Takes in tasks to complete the goal ONLY IF user wants to.
// UPDATE_TASK - Takes in goalId to update the goal.


export const ADD_TASK = gql`
  mutation addTask($title: String!, $description: String!, $completionDate: String!, $priority: String!, $completed: Boolean!) {
    addTask(title: $title, description: $description, completionDate: $completionDate, priority: $priority, completed: $completed) {
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
`

export const ADD_GOAL = gql`
  mutation addGoal($title: String!, $description: String!, $completionDate: String!, $completed: Boolean!) {
    addGoal(title: $title, description: $description, completionDate: $completionDate, completed: $completed) {
      _id
      title
      description
      completionDate
      completed
    } 
  }
`