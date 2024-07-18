export async function updateUserRole(userId, roleId) {
  try {
    const response = await fetch(`http://localhost:8888/${userId}/${roleId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
 console.log(userId, roleId);
    if (!response.ok) {
      throw new Error('Failed to update user role');
    }

    return await response.json(); // Assuming your API returns a JSON response
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
}
