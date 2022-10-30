import React from "react";
// import { useWallet, UseWalletProvider } from "use-wallet";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    {/* <UseWalletProvider chainId={137}> */}
      <Router>
        <App />
      </Router>
    {/* </UseWalletProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.info))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
