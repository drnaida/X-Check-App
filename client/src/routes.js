import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { AuthPage, TasksPage, CreateTaskPage, ReviewRequestsPage, CrossCheck } from './pages';

export const useRoutes = (isAuthenticated, roles) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/tasks">
          <TasksPage />
        </Route>
        <Route path="/review-requests">
          <ReviewRequestsPage />
        </Route>
        {roles && !roles.every(item => item === 'student') && (
          <Route exact path="/create-task">
            <CreateTaskPage />
          </Route>
        )}
        <Route path="/create-task/:id">
          <CreateTaskPage />
        </Route>
        {roles && !roles.every(item => item === 'student') && (
          <Route path="/cross-check">
            <CrossCheck />
          </Route>
        )}
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
