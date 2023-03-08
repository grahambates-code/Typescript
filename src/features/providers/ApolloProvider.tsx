import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import { useSelector } from "react-redux";

import { ApplicationState } from "../../store";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BASE_URI + "/v1/graphql",
});

//however if we have a token, build the auth headers for the gql request
const authLink = setContext((_, { headers }) => {
  let roles = ["guest"];

  // try {
  //   roles = JSON.parse(jwt_decode(token)['https://hasura.io/jwt/claims'])['x-hasura-allowed-roles'];
  // } catch (e) {
  //   console.log(e)
  // }

  return {
    headers: {
      ...headers,
      // authorization: `Bearer ${token}`,
      "x-hasura-admin-secret": "secret",
      "x-hasura-role": roles[roles.length - 1], //roles are defined in cognito hook with highest permission last.
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const _ApolloProvider = ({ children }: { children: React.ReactElement }) => {
  const token = useSelector((state: ApplicationState) => state.auth.userToken);

  //if not authed, return the public routes passed through the children prop.
  if (!token) {
    return children;
  }

  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
};

export { client, _ApolloProvider };
