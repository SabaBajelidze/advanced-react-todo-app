import { useUsersContext, useUsersDispatchContext } from '../UsersContext';
import TodoList from '../components/TodoList';
import { useEffect, useState } from 'react';
// import { v4 as uuid } from 'uuid';

export default function UserMenu({ user: userName, setDisplay }) {
  const users = useUsersContext();
  const user = users.find((u) => u.name === userName);
  const [addError, setAddError] = useState(null);
  const dispatch = useUsersDispatchContext();

  let addTodo;
  let addCompleted;
  let addDescription;

  useEffect(() => {
    addTodo = document.getElementById('todo-name').value;
    addCompleted = document.getElementById('todo-completed').checked;
    addDescription = document.getElementById('todo-description').value;
  });

  function handleAdding(e) {
    e.preventDefault();
    if (!addTodo) {
      setAddError('Name field is required');
    } else {
      document.getElementById('todo-name').value = '';
      document.getElementById('todo-description').value = '';
      document.getElementById('todo-completed').checked = false;
      setAddError(null);
      dispatch({
        type: 'add_todo',
        name: userName,
        todo: {
          name: addTodo,
          completed: addCompleted,
          description: addDescription,
          id: Math.random(),
        },
      });
    }
  }

  return (
    <>
      <div id="person-div">
        <div id="greet">
          <h1>Hello, {user.name}</h1>
          <p>You can access, edit, add and remove todos.</p>
        </div>
        <form id="add-todo-form" className="form">
          <h2>Add Todo</h2>
          <hr className="line" />
          <label>Todo Name:</label>
          <input id="todo-name" onChange={(e) => (addTodo = e.target.value)} />
          <label>Todo Description:</label>
          <input
            id="todo-description"
            onChange={(e) => (addDescription = e.target.value)}
          />
          <label id="label-completed">
            Completed:{' '}
            <input
              id="todo-completed"
              type="checkbox"
              onChange={(e) => (addCompleted = !addCompleted)}
            />
          </label>
          <button
            type="submit"
            className="submit-button"
            onClick={(e) => handleAdding(e)}
          >
            Add Todo
          </button>
          <button className="button-link" onClick={() => setDisplay('login')}>
            Log Out
          </button>
          {addError && <p className="error">{addError}</p>}
        </form>
        <TodoList user={user} />
      </div>
    </>
  );
}
