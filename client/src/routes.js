import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import CreateTaskPage from './pages/CreateTaskPage';
import ReviewRequestsPage from './pages/ReviewRequestsPage';
import AddRequirement from './pages/AddRequirementWindow/AddRequirementWindow';

export const useRoutes = isAuthenticated => {
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/tasks">
          <TasksPage />
        </Route>
        <Route path="/review-requests">
          <ReviewRequestsPage />
        </Route>
        <Route path="/create-tasks">
          <CreateTaskPage />
        </Route>
        <Route path="/add-requirement-window">
          <AddRequirement />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/">
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
