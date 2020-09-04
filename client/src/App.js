import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { useRoutes } from './routes';
import rootReducer from './store/reducers';
// IMPORT FUNCTION OF GETTING DATA FROM DATABASE //
// import { getTasks } from "./services/tasksService";

const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  const routes = useRoutes(false);
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
      <Router>
        <div>{routes}</div>
      </Router>
    </Provider>
  );
}

export default App;
