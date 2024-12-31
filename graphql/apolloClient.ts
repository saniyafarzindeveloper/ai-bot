// import { ApolloClient, InMemoryCache, createHttpLink, DefaultOptions } from '@apollo/client';

// export const BASE_URL = 
// process.env.NODE_ENV !== "development"
// ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
// : 'http://localhost:3000';

// const httpLink = createHttpLink({
//     uri :`${BASE_URL}/api/graphql` , //point to new API route
// });

// const defaultOptions: DefaultOptions = {
//     watchQuery:{ 
//         fetchPolicy: "no-cache",
//         errorPolicy: "all"
//     },
//     query:{
//         fetchPolicy:"no-cache",
//         errorPolicy: "all"
//     },
//     mutate:{
//         fetchPolicy:"no-cache",
//         errorPolicy: "all"
//     }
// };

// const client = new ApolloClient({
//     link:httpLink,
//     cache: new InMemoryCache(),
//     defaultOptions: defaultOptions,
// });

// export default client;

import { ApolloClient, InMemoryCache, createHttpLink, DefaultOptions } from '@apollo/client';

export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

const httpLink = createHttpLink({
  uri: `${BASE_URL}/api/graphql`, // Ensure this is the correct endpoint
  headers: {
    Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`, // Pass the full token
  },
});

const defaultOptions: DefaultOptions = {
  watchQuery: { 
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
