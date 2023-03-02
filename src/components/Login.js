import { useUsersContext } from '../UsersContext';
import { useEffect, useState } from 'react';

export default function Login({ setDisplay, setUser }) {
  const [error, setError] = useState(null);
  const users = useUsersContext();
  let name;
  let password;
  let nameNode;
  let passwordNode;
  useEffect(() => {
    name = document.getElementById('name-input').value;
    password = document.getElementById('password-input').value;
    nameNode = document.getElementById('name-input');
    passwordNode = document.getElementById('password-input');
  });

  function handleLogin(e) {
    e.preventDefault();
    const user = users.find((user) => user.name === name);
    if (!name) {
      setError('Name is required');
      nameNode.focus();
      return;
    } else if (!password) {
      setError('Password is required');
      passwordNode.focus();
      return;
    } else if (!user) {
      setError('User not found');
      nameNode.focus();
      return;
    } else if (user.password !== password) {
      setError('Password is incorrect');
      passwordNode.focus();
      return;
    } else {
      setError(null);
      setUser(name);
      setDisplay('logged');
    }
  }

  function handleChange() {
    setDisplay('signup');
  }

  return (
    <form className="form" onSubmit={(e) => handleLogin(e)}>
      <h2>Log In/Sign Up to access Todos</h2>
      <hr className="line" />
      <label>Enter Name:</label>
      <input
        id="name-input"
        onChange={(e) => {
          name = e.target.value;
        }}
      />
      <label>Enter Password:</label>
      <input
        id="password-input"
        onChange={(e) => {
          password = e.target.value;
        }}
      />
      <button className="submit-button" type="submit">
        Log In
      </button>
      <p>
        don't have an account?{' '}
        <button className="button-link" onClick={handleChange}>
          signup
        </button>
      </p>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
