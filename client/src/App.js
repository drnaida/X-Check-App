import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {useRoutes} from './routes';
import rootReducer from './store/reducers';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
// IMPORT FUNCTION OF GETTING DATA FROM DATABASE //
// import { getTasks } from "./services/tasksService";

const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  const {token, githubId, roles, login, logout} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
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
      <AuthContext.Provider value={{token, githubId, roles, login, logout, isAuthenticated}}>
        <Router>
          <div>{routes}</div>
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
