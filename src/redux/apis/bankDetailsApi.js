import API from '../../API/API.js';
const api = new API();
// const endPoints = 'bank_details';
export const createBankDetailsApi = async (payload) => {
  console.log('this is payload of create ---->', payload)
  const id = payload.id;
  console.log('this is payload of id ---->', id)
  const users = payload.users;
  const endPoints = `users/${id}/bank_details`;
  return new Promise(async (resolve, reject) => {
      try {
        const result = await api.post(`${endPoints}`,users);
        resolve(result);
      } 
      catch(error) {
        reject(error);
      }
    });
}

// import API from '../../API/API.js';
// const api = new API();
// const endPoints = 'bank_details';
// export const createBankDetailsApi = async (payload) => {
//   console.log('this is payload of create ---->', payload)
//   const id = payload.id;
//   console.log('this is payload of id ---->',id)
//   const users = payload.users;
//   // const endPoints = `users/${id}/bank_details`;
//   return new Promise(async (resolve, reject) => {
//       try {
//         const result = await api.post(`${endPoints}`,users, id);
//         resolve(result);
//       } 
//       catch(error) {
//         reject(error);
//       }
//     });
// }


export const loadBankDetailsApi = async (id) => { 
  console.log('this is id in api file ---->',id.id);
  const Id = id?.id
  const endPoints = `users/${Id}/bank_details`; 
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(endPoints); // Assuming `endPoints` is a valid URL
      resolve(result);
      console.log(result,"result")
    } catch (error) {
      console.error('Error in loadBankDetailsApi:', error); // Log the error for debugging
      reject(error);
    }
  });
};





