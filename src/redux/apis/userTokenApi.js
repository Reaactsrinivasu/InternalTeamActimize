import API from '../../API/API.js';
const api = new API();
const endPointsone = 'update_device_token';
export const userTokenApi = async (users) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            const result = await api.post(`${endPointsone}`, users);
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};
