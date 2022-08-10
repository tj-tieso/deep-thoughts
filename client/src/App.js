import React from "react";
import {
  // a React component used to provide data to other components
  ApolloProvider,
  // a constructor function that will help initialize the connection to the GraphQL API server.
  ApolloClient,
  // enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently
  InMemoryCache,
  // allows us to control how the Apollo Client makes a request.
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

//***********//
//establish a new link to the GraphQL server at its /graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});
//***********//

//***********//
const client = new ApolloClient({
  // instantiate the Apollo Client instance
  // and create the connection to the API endpoint.
  link: httpLink,
  // instantiate a new cache objec
  cache: new InMemoryCache(),
});
//***********//

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/thought/:id" element={<SingleThought />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
