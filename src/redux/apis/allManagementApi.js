import API from '../../API/API.js';
const api = new API();
const endPoints = 'management_numbers';
export const loadAllmanagementApi = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await api.get(endPoints); // Assuming `endPoints` is a valid URL
        resolve(result);
      } catch (error) {
        console.error('Error in loadAllExpertsApi:', error); // Log the error for debugging
        reject(error);
      }
    });
  };