import API from '../../API/API.js';
const api = new API();
const endPoints = 'leaves';

export const createLeaveDetailsApi = async (users) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoints}`, users);
      resolve(result);
      
    } catch (error) {
      reject(error);
    }
  });
}
export const loadLeaveDetailsApi = async (pageno) => {
  return new Promise(async (resolve, reject) => {
    var body = {
      page: pageno,
      isMultipart: true
    }
    try {
      const result = await api.get(`${endPoints}`,body);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
export const deleteLeaveDetailsApi = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoints}/${userId}`);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
export const updateLeaveDetailsApi = async (userId, userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.put(`${endPoints}/${userId}`, userInfo);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}


