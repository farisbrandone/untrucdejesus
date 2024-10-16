import {} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
  collection,
  query,
  doc,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  where,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
  getMessaging,
  onMessage,
  isSupported,
  getToken,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js";
import { isSupported as isSwSupported } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-sw.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

/* import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getMessaging, isSupported, getToken } from "firebase/messaging";
import { isSupported as isSwSupported } from "firebase/messaging/sw";  */
const firebaseConfig = {
  apiKey: "AIzaSyBqHomX-GSUzQOf9j6g3G4HNGTlQPtySdk",
  authDomain: "un-truc-de-jesus-carte.firebaseapp.com",
  projectId: "un-truc-de-jesus-carte",
  storageBucket: "un-truc-de-jesus-carte.appspot.com",
  messagingSenderId: "255170124059",
  appId: "1:255170124059:web:9b7818ec3f7e5b127b9bbe",
  measurementId: "G-E7R22DLZ61",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const citiesRef = collection(db, "Notifications");

(async function swDev(window) {
  if (!isSupported()) {
    return;
  } else if (!isSwSupported()) {
    return;
  } else if (window.Notification.permission === "denied") {
    return;
  } else {
    const messaging = getMessaging();
    console.log(messaging);

    const registerServiceWorker = async () => {
      console.log("registerServiceWorker");
      try {
        const swOptions = {
          type: "classic",
          scope: "/",
        };

        const sw = await window.navigator.serviceWorker.register(
          `/sw.js`,
          swOptions
        );

        return sw
          .update()
          .then((registration) => {
            return registration;
          })
          .catch((error) =>
            console.error("Can not update service worker", error)
          );
      } catch (error) {
        console.error("Can not register service worker", error);
      }
    };

    const requestPermission = async (messaging) => {
      try {
        const permission = await window.Notification.requestPermission();

        if (permission === "granted") {
          const serviceWorkerRegistration = await registerServiceWorker();

          return getToken(messaging, {
            serviceWorkerRegistration,
            vapidKey:
              "BMsFehnpoVY7WSEW9Rjffbh8zMFKR_HC7sgGkjM0nE0tKMobiIyMo3t3e4JqRbPxIQeAYqpn-b7mYdhdRSmM1TM",
          })
            .then(async (token) => {
              console.log({ token });
              window.localStorage.setItem("fcm_token", token);
              const querySnapshot = await getDocs(
                collection(db, "DeviceTokens")
              );
              const arrayNotification = [];
              querySnapshot.forEach((doc) => {
                arrayNotification.push(doc.data().token);
              });
              if (!arrayNotification.includes(token)) {
                const res = await addDoc(collection(db, "DeviceTokens"), {
                  token,
                });
                console.log({ res: res });
              }
            })
            .catch((err) => {
              console.error("Unable to get FCM Token", err);
            });
        } else {
          console.error("Unable to grant permission", permission);
        }
      } catch (error) {
        console.error("Unable to request permission", error);
      }
    };
    const checkIfTokenIsNotGeneratedBefore = () => {
      const a = !window.localStorage.getItem("fcm_token");
      return true;
    };

    if (checkIfTokenIsNotGeneratedBefore()) {
      await requestPermission(messaging);
    }

    /* navigator.serviceWorker.addEventListener("message", (e) => {
      console.log("newMessage");
      console.log(e);
      window.location.reload();
    });*/
  }
})(window);

/*window.onload = async function () {
  await swDev(window);
};*/
