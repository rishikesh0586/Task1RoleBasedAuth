import  { useState } from 'react';
import './Styles.css'; // Import the CSS file

const CreateRoles = () => {
  const [roleName, setRoleName] = useState('');

  const [navPermissions, setNavPermissions] = useState({
    nav1: false,
    nav2: false,
    nav3: false,
    nav4: false,
    nav5: false,
    nav6: false,
    nav7: false,
  });

  const handleInputChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setNavPermissions({
      ...navPermissions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = {
      name: roleName,
      permissions: Object.values(navPermissions), // Extract permissions values
    };
  
    try {
      const response = await fetch('http://localhost:8888/create-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Role created successfully!');
        setRoleName('');
        setNavPermissions({
          nav1: false,
          nav2: false,
          nav3: false,
          nav4: false,
          nav5: false,
          nav6: false,
          nav7: false,
        });
      } else {
        alert('Error creating role!');
        console.error(await response.text()); // Log the error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred!');
    }
  };
  

  return (
    <div className="create-role-container">
      <h2>Create Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roleName">Role Name:</label>
          <input
            type="text"
            id="roleName"
            name="roleName"
            value={roleName}
            onChange={handleInputChange}
            required
            className="role-name-input"
            placeholder="Enter role name" // Add placeholder for accessibility
          />
        </div>
        <div className="form-group">
          <h3>Navigation Permissions:</h3>
          <ul className="checkbox-list">
            {[...Array(7).keys()].map((i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  id={`nav${i + 1}`} // Dynamic IDs for accessibility
                  name={`nav${i + 1}`}
                  checked={navPermissions[`nav${i + 1}`]}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`nav${i + 1}`}>nav{i + 1}</label>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="create-role-button">
          Create Role
        </button>
      </form>
    </div>
  );
};

export default CreateRoles;
