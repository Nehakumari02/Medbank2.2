// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCpnNeAUg_pYseKlyFD1EM7SoUg5G13Hks",
//   authDomain: "medbank-notification-system.firebaseapp.com",
//   projectId: "medbank-notification-system",
//   storageBucket: "medbank-notification-system.appspot.com",
//   messagingSenderId: "224351613550",
//   appId: "1:224351613550:web:a95ee4855e67567511ac7f",
//   measurementId: "G-HLS8DBCF2B"
// };


// const firebaseApp = initializeApp(firebaseConfig);

// export default firebaseApp;


import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9FjbM-G6sadCIYQ01O0lYsgW6pAjoNgQ",
  authDomain: "neha-31f34.firebaseapp.com",
  projectId: "neha-31f34",
  storageBucket: "neha-31f34.appspot.com",
  messagingSenderId: "549618383439",
  appId: "1:549618383439:web:0c2adabe4922c72aa5483a",
  measurementId: "G-QBL83CZF3E"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };

