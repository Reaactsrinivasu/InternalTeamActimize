
// import { initializeApp } from "firebase/app";
// import { getMessaging ,getToken} from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyB3zIevPWLHTqgGa2q9Lxa41evnjNpVwOw",
//   authDomain: "team-actimize.firebaseapp.com",
//   databaseURL: "https://team-actimize-default-rtdb.firebaseio.com",
//   projectId: "team-actimize",
//   storageBucket: "team-actimize.appspot.com",
//   messagingSenderId: "842935055241",
//   appId: "1:842935055241:web:2064fbfad7a518d5cb2758",
//   measurementId: "G-VMNSLV672Y"
// };

// const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);

// export const generateToken = async () => {
//     try {
//       const permission = await Notification.requestPermission()
//       console.log(permission, "permission");
//       if (permission === "granted") {
//         const token = await getToken(messaging, { vapidKey: "BFTUYsVK1GeZ7JBUcHbME5QtvU-A3ampMDRIJQrj7KXfrK8FiVVc1aAIc3jlGKDSw7jzShYnT8ZcoTYoiNnEZQk" });
//         console.log(token, "token please");
//         return token; // Return the generated token
//       } else {
//         throw new Error("Permission denied");
//       }
//     } catch (error) {
//       console.error("Error generating token:", error);
//       throw error;
//     }
//   }

  import { initializeApp } from "firebase/app";
  import { getMessaging ,getToken,onMessage} from "firebase/messaging";
  
  const firebaseConfig = {
    apiKey: "AIzaSyB3zIevPWLHTqgGa2q9Lxa41evnjNpVwOw",
    authDomain: "team-actimize.firebaseapp.com",
    databaseURL: "https://team-actimize-default-rtdb.firebaseio.com",
    projectId: "team-actimize",
    storageBucket: "team-actimize.appspot.com",
    messagingSenderId: "842935055241",
    appId: "1:842935055241:web:2064fbfad7a518d5cb2758",
    measurementId: "G-VMNSLV672Y"
  };
 
  const app = initializeApp(firebaseConfig);
  export const messaging = getMessaging(app);
 
  export const generateToken = async () => {
      try {
      
        const permission = await Notification.requestPermission()
      
        messaging.onMessage((payload) => {
          console.log(payload)
        }, e => {
          console.log(e)
        })
        if (permission === "granted") {
        
          const token = await getToken(messaging, { vapidKey: "BFTUYsVK1GeZ7JBUcHbME5QtvU-A3ampMDRIJQrj7KXfrK8FiVVc1aAIc3jlGKDSw7jzShYnT8ZcoTYoiNnEZQk" });
       
          
          return token; // Return the generated token
        } else {
          throw new Error("Permission denied");
        }
      } catch (error) {
        console.error("Error generating token:", error);
        throw error;
      }
    }
  
    export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
  });