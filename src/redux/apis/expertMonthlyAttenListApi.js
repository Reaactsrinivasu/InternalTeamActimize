import API from '../../API/API.js';
const api = new API();
const endPoints = '/attendances/monthly_status';
export const loadMonthlyAttendenceListDetailsApi = async (usermonth, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        ...usermonth, // Destructure usermonth to get year and month
        page: page,
        isMultipart: true
      };
      const result = await api.get(endPoints, body);
      resolve(result);
    } catch (error) {
      console.error('API request failed with error:', error);
      reject(error);
    }
  });
};
