import Todo from '../components/Todo';
import ActiveTodo from '../components/ActiveTodo';

import { useState } from 'react';
import { useUsersDispatchContext } from '../UsersContext';

export default function ({ user }) {
  const [display, setDisplay] = useState('all');
  const [activeTodo, setActiveTodo] = useState(null);
  const dispatch = useUsersDispatchContext();
  let todos;
  if (display === 'all') {
    todos = user.todos;
  } else if (display === 'filtered') {
    todos = user.todos.filter((todo) => todo.completed === false);
  } else {
    todos = [];
  }

  function handleSettingActiveTodo(todo) {
    if (!activeTodo || activeTodo.id !== todo.id) {
      if (activeTodo) {
        document.getElementById(activeTodo.id).style.backgroundColor =
          'rgba(96, 5, 148, 0.8)';
      }
      setActiveTodo(todo);
      document.getElementById(todo.id).style.backgroundColor =
        'rgb(70, 42, 224)';
    } else {
      document.getElementById(todo.id).style.backgroundColor =
        'rgba(96, 5, 148, 0.8)';
      setActiveTodo(null);
    }
  }

  function handleClearing() {
    dispatch({
      type: 'clear_todos',
      name: user.name
    })
    setDisplay('empty');
    setActiveTodo(null);
  }

  return (
    <div id="wrapper">
      <div className="navigation">
        <button
          className="button-link wrapper-button"
          onClick={() => setDisplay('filtered')}
        >
          Filter Todos
        </button>{' '}
        <br />
        <button
          className="button-link wrapper-button"
          onClick={() => setDisplay('all')}
        >
          Show All Todos
        </button>
        <button
          className="button-link wrapper-button"
          onClick={() => handleClearing()}
        >
          Clear Todos
        </button>
      </div>
      <hr className="line wrapper-line" />
      <p id='wrapper-text'>{todos.length !== 0 ? display === 'all' ? 'Showing all todos' : display === 'filtered' ? 'Showing filtered todos' : 'User has no todos.' : 'User has no todos'}</p>
      <div id="ul-active-flex">
        <ul id="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo" id={todo.id}>
              <Todo todo={todo} user={user} />
              <button
                className="detail-button"
                onClick={() => handleSettingActiveTodo(todo)}
              >
                Details
              </button>
            </li>
          ))}
        </ul>
        {activeTodo && (
          <ActiveTodo
            todo={activeTodo}
            userName={user.name}
            setActiveTodo={setActiveTodo}
          />
        )}
      </div>
    </div>
  );
}
