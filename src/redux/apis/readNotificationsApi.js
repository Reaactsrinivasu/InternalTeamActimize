import API from '../../API/API.js';
const api = new API();
const endPointsone = 'mark_as_read';
export const readNotificationApi = async (users) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            
            const result = await api.put(`${endPointsone}`, users);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};
