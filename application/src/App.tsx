import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import theme from "./components/theme";

import { AuthProvider } from "hooks/useAuth";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PrivateRoute from "components/PrivateRouter";
import { AuthRoutes } from "routes";
import { BrowserRouter } from "react-router-dom";
import { Tabs } from "pages";
import { CssBaseline } from "@mui/material";
import NavBar from "components/Header/NavBar";

const client = new ApolloClient({
  uri: `http://localhost:3005/graphql`,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <NavBar />
            <AuthRoutes />
            <PrivateRoute component={Tabs} path="/" />
          </BrowserRouter>
        </AuthProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

export default App;
