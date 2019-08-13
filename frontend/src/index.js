import React from "react";
import ReactDOM from "react-dom";
//import thunk from "redux-thunk";
//import { createStore, applyMiddleware } from "redux";
//import rootReducer from "./reducers";
import Routers from "./routers";
import axios from "axios";

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

//Azure url
//axios.defaults.baseURL = "https://lms20190724045409.azurewebsites.net";

//Local url
axios.defaults.baseURL = "http://192.168.1.115:59941";

ReactDOM.render(
  <div>
    <Routers />
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
