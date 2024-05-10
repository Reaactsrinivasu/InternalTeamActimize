importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyB3zIevPWLHTqgGa2q9Lxa41evnjNpVwOw",
    authDomain: "team-actimize.firebaseapp.com",
    databaseURL: "https://team-actimize-default-rtdb.firebaseio.com",
    projectId: "team-actimize",
    storageBucket: "team-actimize.appspot.com",
    messagingSenderId: "842935055241",
    appId: "1:842935055241:web:2064fbfad7a518d5cb2758",
    measurementId: "G-VMNSLV672Y"
  });

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message pleaseeeeeeee ',
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };
    console.log('------------------',notificationTitle, notificationOptions);
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

