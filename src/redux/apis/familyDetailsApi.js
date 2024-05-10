import API from '../../API/API.js';
import { toast } from 'react-toastify';
const api = new API();
const endPoints = 'family_details';

export const createFamilyDetailsApi = async (users) => {
  return new Promise(async (resolve, reject) => { 
      try {
        const result = await api.post(`${endPoints}`,users);
        resolve(result);
        toast.success("Data Added Successfully");
      } catch(error) {
        reject(error);  
        // console.error('Error occurred in API call:', error); // Log any errors that occur during the API call
        // return error
      }
    });
}
export const loadFamilyDetailsApi = async () => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.get(`${endPoints}`);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const deleteFamilyDetailsApi = async (userId) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.delete(`${endPoints}/${userId}`);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}
export const updateFamilyDetailsApi = async (userId,userInfo) => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.put(`${endPoints}/${userId}`,userInfo);
        resolve(result);
        toast.success("Data Updated Successfully");
      } catch(error) {
        reject(error);
      }
    });
}


