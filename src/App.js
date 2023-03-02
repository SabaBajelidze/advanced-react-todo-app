import { UsersProvider } from './UsersContext'
import { useState } from 'react';
import Login from './components/Login'
import Signup from './components/Signup'
import UserMenu from './components/UserMenu';

function App() {
  const [ display, setDisplay ] = useState('login');
  const [ user, setUser ] = useState(null);
  return (
    <UsersProvider>
      {display === 'login' && <Login setDisplay={setDisplay} setUser={setUser} />}
      {display === 'signup' && <Signup setDisplay={setDisplay} setUser={setUser} />}
      {display === 'logged' && user && <UserMenu setDisplay={setDisplay} user={user}/>}
    </UsersProvider>
  );
}

export default App;
