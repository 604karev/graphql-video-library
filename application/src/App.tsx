import React from 'react';
import Tabs from './components/Tabs/Tabs';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    uri: `http://localhost:3005/graphql`
});


const App = () => {
    return (
        <ApolloProvider client={client}>
            <MuiThemeProvider theme={theme}>
                <Tabs />
            </MuiThemeProvider>
        </ApolloProvider>
    );
}

export default App;
