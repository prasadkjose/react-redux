//External imports
import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { fetchPostsWatcher } from "./sagas/saga";
// Local imports
import App from "./App";
import rootReducer from "./reducers";

import "./index.css";

const sagaMiddleware = createSagaMiddleware();
//Create store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(fetchPostsWatcher);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
