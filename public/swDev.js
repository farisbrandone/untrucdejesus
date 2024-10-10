/* import {} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

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

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"; */

import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getMessaging, isSupported, getToken } from "firebase/messaging";
import { isSupported as isSwSupported } from "firebase/messaging/sw";
const firebaseConfig = {
  apiKey: "AIzaSyDVLs9ZTU8F5JuderX7A3tprvPtmSpmgx0",
  authDomain: "carte-interactive-e3ecd.firebaseapp.com",
  projectId: "carte-interactive-e3ecd",
  storageBucket: "carte-interactive-e3ecd.appspot.com",
  messagingSenderId: "293631422400",
  appId: "1:293631422400:web:6adbc60f1ba0f23a0be225",
  measurementId: "G-BNSYY511FN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const citiesRef = collection(db, "Notifications");

async function swDev(window) {
  if (!isSupported()) {
    console.log("ninia");
    return;
  } else if (!isSwSupported()) {
    console.log("pipia");
    return;
  } else if (window.Notification.permission === "denied") {
    console.log("zita");
    return;
  } else {
    console.log({ inside: "SDK" });
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
        // Oops. Registration was unsucessfull
        console.error("Can not register service worker", error);
      }
    };

    const requestPermission = async (messaging) => {
      console.log("requestPermission");
      try {
        const permission = await window.Notification.requestPermission();

        if (permission === "granted") {
          const serviceWorkerRegistration = await registerServiceWorker();

          return getToken(messaging, {
            serviceWorkerRegistration,
            vapidKey:
              "BIXvdU7_rASTtrF6PGhcnRfyzi2G52qTDQ_OEa6PBKAzV9BWZjEen7GBTPFsc7PIAsm5yS59CqdxVpwZUVpxoNM",
          })
            .then(async (token) => {
              console.log({ token });
              window.localStorage.setItem("fcm_token", token);

              const res = await addDoc(collection(db, "DeviceTokens"), {
                token,
              });
              console.log({ res: res });
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
    });*/
  }
}

window.onload = async function () {
  await swDev(window);
};
