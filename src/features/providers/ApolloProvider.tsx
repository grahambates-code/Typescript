import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import jwt_decode from "jwt-decode";
import React from 'react';

// @ts-ignore
const AapolloProvider = ({children}) => {

  const httpLink = createHttpLink({ uri: process.env.REACT_APP_BASE_URI + "/v1/graphql" });
  const token = sessionStorage.getItem('userToken');

  //if not authed, return the public routes passed through the children prop.
  if (!token) return children;

  //however if we have a token, build the auth headers for the gql request
  const authLink = setContext((_, { headers }) => {

    console.log((((jwt_decode(token)))));

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
        'x-hasura-admin-secret' : 'secret',
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
}

export default AapolloProvider;