import { useState, useEffect } from 'react';
import { useUsersDispatchContext } from '../UsersContext';

export default function ActiveTodo({ todo, userName, setActiveTodo }) {
  const [editing, setEditing] = useState(false);
  const dispatch = useUsersDispatchContext();

  let { name, description, id, completed } = todo;
  useEffect(() => {
    if(editing) {
      document.getElementById('edit-todo-name').value = name;
      document.getElementById('edit-todo-description').value = description;
      document.getElementById('edit-todo-completed').checked = completed;
    }
  });

  function handleSaving() {
    const newTodo = {
      name,
      completed,
      description,
      id
    }
    dispatch({
      type: 'edit_todo',
      name: userName,
      todo: {
        name,
        description,
        id,
        completed
      }
    })
    setEditing(false);
    setActiveTodo(newTodo);
  }

  return (
    <div className="active-todo">
      <h1>
        {editing ? (
          <label>
            Name: <input id="edit-todo-name" onChange={e => {
              name = e.target.value;
            }} />
          </label>
        ) : (
          name
        )}
      </h1>
      <p>
        Description:{' '}
        {editing ? <input id="edit-todo-description" onChange={e => {
              description = e.target.value;
            }}/> : description}
      </p>
      <p>
        Completed:{' '}
        {editing ? (
          <input
            type="checkbox"
            id="edit-todo-completed"
            onChange={(e) => completed = e.target.checked}
          />
        ) : completed ? (
          'true'
        ) : (
          'false'
        )}
      </p>
      <p>Id: {editing ? `${id} - Ids are not mutable.` : id}</p>
      {editing ? <button
        className="detail-button edit-button"
        onClick={handleSaving}
      >
        Save
      </button> : <button
        className="detail-button edit-button"
        onClick={() => setEditing(true)}
      >
        Edit
      </button>}
      
    </div>
  );
}
