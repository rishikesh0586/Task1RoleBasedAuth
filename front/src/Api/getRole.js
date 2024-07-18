const getRole = async () => {
    try {
      const response = await fetch('http://localhost:8888/getRole');
      if (response.ok) {
        const data = await response.json();
        return data.roles;
      } else {
        console.error('Error fetching users!');
        return []; // Return an empty array in case of error
      }
    } catch (error) {
      console.error('Error:', error);
      return []; // Return an empty array in case of error
    }
  };
  
  export default getRole;