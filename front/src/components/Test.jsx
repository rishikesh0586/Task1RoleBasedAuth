import { useState, useEffect } from 'react';
import fetchUsers from '../Api/getUser';

function Test() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers();
      console.log(fetchedUsers);
      setUsers(fetchedUsers);
    };
    fetchData();
  }, []);
  return (
    <>
    <h1>hello world</h1>
    {users &&  users.map((user,index) => (
      
      <div key={index}>
            <p >good</p>
              <h2>{user.name}{console.log("hello"+user)}</h2></div>
              ))}
              <h3>google</h3>
              

    
    </>
  )
}

export default Test