import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {HttpLink, createHttpLink} from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';



import App from './components/App';
import * as serviceWorker from './serviceWorker';





const url = 'http://127.0.0.1:7000/graphql';

const httpLink = createHttpLink({
    uri: url,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-token": token ? `${token}` : "",
    }
  }
});

console.log(sessionStorage.getItem('token'));


const cache = new InMemoryCache();

// const client = new ApolloClient({
//     link: httpLink,
//     cache,
//     // dataIdFromObject: o => o.id
// })

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    headers: {
        "x-token": sessionStorage.getItem('token'),
      },
    // credentials: 'same-origin',
	dataIdFromObject: o => o.id //identify a piece of data for refetching. tracks records fetched from the server 
});




ReactDOM.render(
  <ApolloProvider client={client}>
        <App />
  </ApolloProvider>,
    document.getElementById('root'));

serviceWorker.unregister();
