import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import CreateTaskPage from './pages/CreateTaskPage';
import ReviewRequestsPage from './pages/ReviewRequestsPage';
import ReviewsPage from './pages/ReviewsPage';
import CrossCheckSessionsPage from './pages/CrossCheckSessionsPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
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
        <Route path="/reviews">
          <ReviewsPage />
        </Route>
        <Route path="/reviews">
          <ReviewsPage />
        </Route>
        <Route path="/cross-check-sessions">
          <CrossCheckSessionsPage />
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
