import { useState, useEffect } from 'react';
import fetchUsers from '../Api/getUser';
import getRole from '../Api/getRole';
import {updateUserRole} from '../Api/updateUserRole'; 

import './getUser.css'; 

const GetUser = () => {

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);

      const fetchedRoles = await getRole();
      setRoles(fetchedRoles);
    };
    fetchData();
  }, []);

  const handleOptionChange = (event, userId) => {
    setSelectedOptions({
      ...selectedOptions,
      [userId]: event.target.value,
    });
    setErrors({ ...errors, [userId]: null }); // Clear any previous error for the user
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    for (const userId in selectedOptions) {
      const roleId = selectedOptions[userId];
      
      if (!roleId) {
        setErrors({ ...errors, [userId]: 'Please select a role' });
        return; 
      }

      try {
        const response = await updateUserRole(userId, roleId);
        console.log(response.message);
        if (!response.ok) {
      
          
          setErrors({
            ...errors,
            [userId]: 'An error occurred while updating the role',
          });
        } else {

          setSelectedOptions({ ...selectedOptions, [userId]: null }); // Reset selection
        }
      } catch (error) {
        console.error('Error updating user role:', error);
        setErrors({ ...errors, [userId]: 'An error occurred while updating the role' });
      }
    }
  };

  return (
    <div className="user-options-container">
      <h2>Users</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Option</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {users  && users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <select
                    value={selectedOptions[user._id] || ''}
                    onChange={(event) => handleOptionChange(event, user._id)}
                    className="user-option-select"
                  >
                    <option value="">-- Select Option --</option>
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{errors[user._id]}</td> {/* Display error message for the user */}
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Update Roles</button>
      </form>
    </div>
  );
};

export default GetUser;
