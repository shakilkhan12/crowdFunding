import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  // here you had specified the chain as goerli where as the G is uppercase for the goerli chain which is why it was unable to identify the smart contract address and call functions on it.
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <StateContextProvider>
    <Router>
      <App />
    </Router>
    </StateContextProvider>
  </ThirdwebProvider>
);
