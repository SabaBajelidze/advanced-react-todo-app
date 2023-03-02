import { useUsersDispatchContext } from '../UsersContext';

export default function Todo({ todo, user }) {
  const dispatch = useUsersDispatchContext();
  let { name, completed } = todo;

  return (
    <>
      <input type="checkbox" className='checkbox' checked={completed} onChange={e => {
        dispatch({
          type: 'toggle_completed',
          name: user.name,
          todoName: name
        })
      }}/>
      <label>{name}</label>
    </>
  );
}
