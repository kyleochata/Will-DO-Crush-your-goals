import { gql } from '@apollo/client';
// Query_User - with goals and tasks 
// query_Goals(with tasks?)
// QUERY_TASKS

export const QUERY_ALL_USERS = gql`
  {
    user {
      _id
      firstName
      lastName
      goals {
        _id
        title
        description
        completionDate
        createdAt
        completed
        tasks {
          _id
          title
          description
          completionDate
          priority
          completed
        }
      }
    }
  }
`;

export const QUERY_ALL_TASKS = gql`
  {
    tasks {
      _id
      title
      description
      completionDate
      priority
      completed
      user {
        _id
        firstName
        lastName
      }
      goals {
        _id
        title
        description
        completionDate
        createdAt
        completed
      }
    }
  }
`;

export const QUERY_SINGLE_TASK = gql`
  query getTask($taskId: ID!) {
    tasks {
      _id
      title
      description
      completionDate
      priority
      completed
    }
    user {
      _id
      firstName
      lastName
    }
    goals {
      _id
      title
      description
      completionDate
      createdAt
      completed
    }
  }
`

export const QUERY_ALL_GOALS = gql`
  {
    goals {
      _id
      title
      description
      completionDate
      createdAt
      completed
      tasks {
        _id
        title
        description
        completionDate
        priority
        completed
      }
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_SINGLE_GOAL = gql`
  query getGoal($goalId: ID!) {
    goals {
      _id
      title
      description
      completionDate
      createdAt
      completed
      tasks {
        _id
        title
        description
        completionDate
        priority
        completed
      }
    }
  }
`

export const QUERY_USER = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      goals {
        _id
        title
        description
        completionDate
        createdAt
        completed
        tasks {
          _id
          title
          description
          completionDate
          priority
          completed
        }
      }
    }
  }
`