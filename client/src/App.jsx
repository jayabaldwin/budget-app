import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import LayoutNav from "./components/layout/LayoutNav.jsx";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Finances from "./pages/Finances.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import NoMatch from "./pages/NoMatch.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
     <ApolloProvider client={client}>
     <Router>
       <CssBaseline/>
        <Routes>
          <Route index element={<Landing />} />
          {/* All home routes must have the /home before the following parameter */}
          <Route path="home" element={<LayoutNav />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="finance" element={<Finances />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
      </ApolloProvider>
    </>
  );
}

export default App;