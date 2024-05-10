import API from '../../API/API.js';
import { toast } from 'react-toastify';
const api = new API();
const endPoints = 'users';
export const createExpertCreationApi = async (users) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await api.post(`${endPoints}`, users);
        resolve(result);
        toast.success('Expert Created  Successfully');
      } catch (error) {
        console.error('API Error-------------------:', error); 
        reject(error);
      }
    });
  }




