import { useReducer, createContext, useContext } from 'react';

export const UsersContext = createContext(null);
export const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UsersContext);
}

export function useUsersDispatchContext() {
  return useContext(UsersDispatchContext);
}

function usersReducer(users, action) {
  switch (action.type) {
    case 'add_user': {
      return [
        ...users,
        { name: action.name, password: action.password, todos: [] },
      ];
    }
    case 'add_todo': {
      let newState = users.map((el) => {
        if (el.name !== action.name) {
          return el;
        } else {
          return {
            ...el,
            todos: [
              ...el.todos,
              {
                name: action.todo.name,
                completed: action.todo.completed,
                description: action.todo.description,
                id: action.todo.id,
              },
            ],
          };
        }
      });
      return newState;
    }
    case 'toggle_completed': {
      let newState = users.map((user) => {
        if (user.name !== action.name) {
          return user;
        } else {
          return {
            ...user,
            todos: user.todos.map((todo) => {
              if (todo.name !== action.todoName) {
                return todo;
              } else {
                return {
                  ...todo,
                  completed: !todo.completed,
                };
              }
            }),
          };
        }
      });
      return newState;
    }
    case 'edit_todo': {
      let newState = users.map((user) => {
        if (user.name !== action.name) {
          return user;
        } else {
          return {
            ...user,
            todos: user.todos.map((todo) => {
              if (todo.id !== action.todo.id) {
                return todo;
              } else {
                return {
                  ...action.todo,
                };
              }
            }),
          };
        }
      });
      return newState;
    }
    case 'clear_todos': {
      let newState = users.map((user) => {
        if (user.name !== action.name) {
          return user;
        } else {
          return {
            ...user,
            todos: [],
          };
        }
      });
      return newState;
    }
    default:
      return users;
  }
}

const initialUsers = [
  {
    name: 'user-one',
    password: 'user123',
    todos: [
      {
        name: 'todo 1',
        completed: false,
        description: 'some description',
        id: 1,
      },
      {
        name: 'todo 2',
        completed: true,
        description: 'some other description',
        id: 2,
      },
      {
        name: 'todo 3',
        completed: true,
        description: 'some yet another description',
        id: 3
      }
    ],
  },
  { name: 'user-two', password: 'user123', todos: [] },
];
