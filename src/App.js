import UserFinder from './components/UserFinder';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import UsersContext from './context/users-context';

const DUMMY_USERS = [
  { id: 'u1', name: 'max' },
  { id: 'u2', name: 'manuel' },
  { id: 'u3', name: 'julie' },
];

function App() {
  const usersContext = {
    users: DUMMY_USERS
  }

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:5000/graphql'
  })

  return (
    <ApolloProvider client={client}>
      <UsersContext.Provider value={usersContext}>
        <div>
          <UserFinder />
        </div>
      </UsersContext.Provider>
    </ApolloProvider>
  );
}

export default App;