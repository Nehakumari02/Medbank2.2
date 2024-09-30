// importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCpnNeAUg_pYseKlyFD1EM7SoUg5G13Hks",
//     authDomain: "medbank-notification-system.firebaseapp.com",
//     projectId: "medbank-notification-system",
//     storageBucket: "medbank-notification-system.appspot.com",
//     messagingSenderId: "224351613550",
//     appId: "1:224351613550:web:a95ee4855e67567511ac7f",
//     measurementId: "G-HLS8DBCF2B"
//   };

// firebase.initializeApp(firebaseConfig);

// class CustomPushEvent extends Event {
//     constructor(data) {
//         super('push');

//         Object.assign(this, data);
//         this.custom = true;
//     }
// }

// /*
//  * Overrides push notification data, to avoid having 'notification' key and firebase blocking
//  * the message handler from being called
//  */
// self.addEventListener('push', (e) => {
//     // Skip if event is our own custom event
//     if (e.custom) return;

//     // Kep old event data to override
//     const oldData = e.data;

//     // Create a new event to dispatch, pull values from notification key and put it in data key,
//     // and then remove notification key
//     const newEvent = new CustomPushEvent({
//         data: {
//             ehheh: oldData.json(),
//             json() {
//                 const newData = oldData.json();
//                 newData.data = {
//                     ...newData.data,
//                     ...newData.notification,
//                 };
//                 delete newData.notification;
//                 return newData;
//             },
//         },
//         waitUntil: e.waitUntil.bind(e),
//     });

//     // Stop event propagation
//     e.stopImmediatePropagation();

//     // Dispatch the new wrapped event
//     dispatchEvent(newEvent);
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//     // console.log('[firebase-messaging-sw.js] Received background message ', payload);

//     const { title, body, image, icon, ...restPayload } = payload.data;
//     const notificationOptions = {
//         body,
//         icon: image || '/icons/firebase-logo.png', // path to your "fallback" firebase notification logo
//         data: restPayload,
//     };
//     console.log(payload.data)
//     return self.registration.showNotification(title, notificationOptions);
// });

// self.addEventListener('notificationclick', (event) => {
//     if (event?.notification?.data && event?.notification?.data?.link) {
//         self.clients.openWindow(event.notification.data.link);
//     }

//     // close notification after click
//     event.notification.close();
// });



importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Replace these with your own Firebase config keys...
const firebaseConfig = {
  apiKey: "AIzaSyC9FjbM-G6sadCIYQ01O0lYsgW6pAjoNgQ",
  authDomain: "neha-31f34.firebaseapp.com",
  projectId: "neha-31f34",
  storageBucket: "neha-31f34.appspot.com",
  messagingSenderId: "549618383439",
  appId: "1:549618383439:web:0c2adabe4922c72aa5483a",
  measurementId: "G-QBL83CZF3E"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // payload.fcmOptions?.link comes from our backend API route handle
  // payload.data.link comes from the Firebase Console where link is the 'key'
  const link = payload.fcmOptions?.link || payload.data?.link;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
    data: { url: link },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");

  event.notification.close();

  // This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
  event.waitUntil(
    clients
      // https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;

        if (!url) return;

        // If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          console.log("OPENWINDOW ON CLIENT");
          return clients.openWindow(url);
        }
      })
  );
});
