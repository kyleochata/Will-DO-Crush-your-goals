// client/src/utils/queries.js

import { gql } from '@apollo/client';

export const QUERY_USER = gql`
	query getUser($authID: String!) {
		user(authID: $authID) {
			_id
			userName
			authID
			goals {
				_id
				title
				description
        why
				completionDate
				createdAt
				completed
			}
			tasks {
				_id
				title
				description
				completionDate
				priority
				completed
			}
      measurables{
        _id
        title
      }
		}
	}
`;

export const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      _id
      firstName
      lastName
      userName
      email
    }
  }
`;

export const QUERY_TASK = gql`
  query getTask($taskId: ID!) {
    task(taskId: $taskId) {
      _id
      title
      description
      completionDate
      priority
      completed
      user {
        _id
        authID
        userName
      }
      goal {
        _id
        title
        description
        completionDate
        createdAt
        completed
      }
      measurable{
        _id
        title
      }
    }
  }
`;

export const QUERY_ALL_TASKS = gql`
  query getAllTasks {
    tasks {
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

export const QUERY_GOAL = gql`
  query getGoal($goalId: ID!) {
    goal(goalId: $goalId) {
      _id
      title
      description
      why
      completionDate
      createdAt
      completed
      user {
        _id
        userName
      }
      tasks {
        _id
        title
        description
        completionDate
        priority
        completed
      }
      measurables {
        _id
        title
      }
    }
  }
`;

export const QUERY_ALL_GOALS = gql`
  query getAllGoals {
    goals {
      _id
      title
      description
      why
      completionDate
      createdAt
      completed
      user {
        _id
      }
      tasks {
        _id
        title
        description
        completionDate
        priority
        completed
        user{
          _id
        }
      }
      measurables {
        _id
        title
      }
    }
  }
`;

export const QUERY_MEASURABLE = gql`
  query getMeasurable($measurableId: ID!) {
    measurable(measurableId: $measurableId) {
      _id
      title
      goal {
        _id
        title
      }
      user {
        _id
        authID
        userName
      }
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
`;

export const QUERY_ALL_MEASURABLE = gql`
  query getAllMeasurables {
    measurables {
      _id
      title
      goal {
        _id
        title
      }
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;


