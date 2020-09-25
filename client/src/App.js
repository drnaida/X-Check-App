import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { useRoutes } from './routes';
import rootReducer from './store/reducers';
import { useAuth } from './hooks';
import { AuthContext } from './context/AuthContext';
import { useToken } from './hooks/token.hook';
// IMPORT FUNCTION OF GETTING DATA FROM DATABASE //
// import { getTasks } from "./services/tasksService";

const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  const { token, refreshToken, githubId, roles, login, logout } = useAuth();
  const { checkIsTokenExpires } = useToken();
  const isAuthenticated = token && !checkIsTokenExpires(token);
  const routes = useRoutes(isAuthenticated);
  // const location = useLocation();
  // 'useDispatch' SHOULD BE IMPORTED FROM 'react-redux' //
  //--------------------------------
  // const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      // GET DATA FROM DATABASE AND SET IT IN THE STORE //
      //---------------------------------------
      // const tasksResponse = await getTasks();
      // dispatch(setTasks(tasksResponse));
    }
    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{ token, refreshToken, githubId, roles, login, logout, isAuthenticated }}
      >
        <Router>
          <div>{routes}</div>
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
