import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { AuthPage, TasksPage, CreateTaskPage, ReviewRequestsPage, CrossCheck } from './pages';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/tasks">
          <TasksPage />
        </Route>
        <Route path="/review-requests">
          <ReviewRequestsPage />
        </Route>
        <Route exact path="/create-task">
          <CreateTaskPage />
        </Route>
        <Route path="/create-task/:id">
          <CreateTaskPage />
        </Route>
        <Route path="/cross-check">
          <CrossCheck />
        </Route>
        <Redirect to="/tasks" />
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
