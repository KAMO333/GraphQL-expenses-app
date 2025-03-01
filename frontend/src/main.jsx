import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "./components/ui/GridBackgroun.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackground>
        {/* <ApolloProvider client={client}> */}
        <App />
        {/* </ApolloProvider> */}
      </GridBackground>
    </BrowserRouter>
  </StrictMode>
);
