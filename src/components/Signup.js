import { useUsersContext, useUsersDispatchContext } from '../UsersContext';
import { useEffect, useState } from 'react';

export default function Signup({ setDisplay, setUser }) {
  const [error, setError] = useState(null);
  const users = useUsersContext();
  const dispatch = useUsersDispatchContext();

  let name;
  let password;
  let nameNode;
  let passwordNode;

  useEffect(() => {
    name = document.getElementById('submit-input-name').value;
    password = document.getElementById('submit-input-password').value;
    nameNode = document.getElementById('submit-input-name');
    passwordNode = document.getElementById('submit-input-password');
  });

  function handleSignup(e) {
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
    } else if (user) {
      setError('Username already exists');
      nameNode.focus();
      return;
    } else {
      setError(null);
      dispatch({
        type: 'add_user',
        name,
        password,
      });
      setUser(name);
      setDisplay('logged');
    }
  }

  function handleChange() {
    setDisplay('login');
  }
  return (
    <form className="form" onSubmit={(e) => handleSignup(e)}>
      <h2>Log In/Sign Up to access Todos</h2>
      <hr className="line" />
      <label>Enter Name:</label>
      <input
        onChange={(e) => {
          name = e.target.value;
        }}
        id="submit-input-name"
      />
      <label>Enter Password:</label>
      <input
        onChange={(e) => {
          password = e.target.value;
        }}
        id="submit-input-password"
      />
      <button className="submit-button" type="submit">
        Sign Up
      </button>
      <p>
        already have an account?{' '}
        <button className="button-link" onClick={handleChange}>
          login
        </button>
      </p>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
