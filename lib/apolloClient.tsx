'use client';

import { useMemo } from "react";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";


let apolloClient;

function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://m2.test/graphql",
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function initializeApollo(initialState = null) {

  const _apolloClient = apolloClient ?? makeClient();

  /* If your page has Next.js data fetching methods that use Apollo Client, the initial stategets hydrated here*/ 

  if (initialState) {
      // Get existing cache, loaded during client side data fetching
      const existingCache = _apolloClient.extract();

  /* Restore the cache using the data passed from  
getStaticProps/getServerSideProps combined with the existing 
  cached data */
    _apolloClient.cache.restore({ ...existingCache, ...initialState});
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = 
  useMemo(() => initializeApollo(initialState),[initialState]);
  return store;
}

//export const client = initializeApollo();

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}