import {createContext} from 'react';

function noop() {}

export const AuthContext = createContext({
  token: null,
  githubId: null,
  roles: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})