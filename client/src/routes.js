import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { AuthPage, HomePage, TasksPage, CreateTaskPage, ReviewRequestsPage } from './pages';

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
        <Route exact path="/create-task">
          <CreateTaskPage />
        </Route>
        <Route path="/create-task/:id">
          <CreateTaskPage />
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
