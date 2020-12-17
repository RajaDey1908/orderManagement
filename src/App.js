import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Routing from "./Routing/Routing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <PersistGate loading={<div></div>} persistor={persistor}>
          <Router>
            <div>
              <Switch>
                <Route path="/" component={Routing} />
              </Switch>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
