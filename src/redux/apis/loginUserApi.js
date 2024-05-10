import API from '../../API/API.js';

const api = new API();
const endPoints = 'login';

export const loginUserApi = async (users) => {
  try {
    const result = await api.post(`${endPoints}`, users);
    return result;
  } catch (error) {
    
    console.error('Error occurred in API call:', error); // Log any errors that occur during the API call
    return error
    // Throw a new error with a custom message
    throw new Error('Invalid email or password. Please try again.'); 
  }
};
