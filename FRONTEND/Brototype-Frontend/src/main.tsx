
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux-toolkit/store.tsx";
import ReactGA from 'react-ga';
import { Provider } from "react-redux";
import ContextWrapper from './context/ContextWrapper.tsx';
// const TRACK_ID = 'UA-295189522-1'

// ReactGA.initialize(TRACK_ID);
const MESUREMENT_ID = 'G-E5NH4HH45W';
ReactGA.initialize(MESUREMENT_ID);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
   
      />
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </PersistGate>
  </Provider>,
  document.getElementById("root")

);

