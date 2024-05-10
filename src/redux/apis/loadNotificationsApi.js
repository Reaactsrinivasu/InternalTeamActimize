import API from '../../API/API.js';
const api = new API();
const endPoints = 'notifications';
export const loadNotificationsDetailsApi = async () => {
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.get(`${endPoints}`);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
}