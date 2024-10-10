importScripts(
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore-compat.js"
);

(function (self) {
  let messaging;
  console.log("nana");
  const firebaseConfig = {
    apiKey: "AIzaSyDVLs9ZTU8F5JuderX7A3tprvPtmSpmgx0",
    authDomain: "carte-interactive-e3ecd.firebaseapp.com",
    projectId: "carte-interactive-e3ecd",
    storageBucket: "carte-interactive-e3ecd.appspot.com",
    messagingSenderId: "293631422400",
    appId: "1:293631422400:web:6adbc60f1ba0f23a0be225",
    measurementId: "G-BNSYY511FN",
  };

  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
  console.log({ messaging });
  db = firebase.firestore();

  citiesRef = db.collection("Notifications");
  console.log(citiesRef);
  const PREFIX = "PAPA";

  self.addEventListener("install", (event) => {
    self.skipWaiting();
    /**n'attent pas que les autres process
         * soit stopé, stop l'est toi meme
      
         */
    /** pour que le nouveau worker remplace
     * l'ancien tout de suite */
    /**considérer l'installation terminer que lorsque cidessous est terminer */
    event.waitUntil(
      (async () => {
        /**mise en cache de la page offline */
        const cache = await caches.open(PREFIX);
        /**met en cache la reponse de la requetes /offline */
        //const q = citiesRef.query();
        const querySnapshot = await citiesRef.get();
        console.log(querySnapshot);
        const unreadNotification = querySnapshot.docs.length;
        console.log({ unreadNotification });

        if (navigator.setAppBadge) {
          console.log("The App Badging API is supported!");
          console.log({ navigator });
          if (unreadNotification === 0 || !unreadNotification) {
            navigator.clearAppBadge();
          } else {
            navigator.setAppBadge(unreadNotification);
          }
        }
      })()
    );

    console.log(`${PREFIX} Install`);
  });

  self.addEventListener("activate", (event) => {
    /**lorsque tu t'active tu doit automatiquement
     * prendre le controle de la page
     */
    console.log("activate");
    clients.claim();

    /**vider les autres caches avant moi */
    event.waitUntil(
      (async () => {
        /**récupération des clé associer au cache */
        const keys = await caches.keys();
        await Promise.all(
          keys.map((key) => {
            if (!key.includes(PREFIX)) {
              return caches.delete(key);
            }
          })
        );

        console.log(`${PREFIX} Active`);
      })()
    );
  });

  self.addEventListener("push", async function (event) {
    console.log("push");
    const message = event.data.json();
    console.log({ message });

    const {
      notification: { title, body, actionUrl = "", icon = "" },
    } = message;

    console.log({ newversion: { title, body, actionUrl, icon } });
    const notificationOptions = {
      body,
      icon,
      data: {
        actionUrl,
      },
    };

    const promiseChain = new Promise((resolve) => {
      self.registration
        .showNotification(title, notificationOptions)
        .then(() => resolve());
    });

    console.log({ premier: "first console" });

    event.waitUntil(
      (async () => {
        console.log("blabla");
        await promiseChain;
        const total = await citiesRef.add({ title, body, icon, actionUrl });

        //console.log({ total });

        const querySnapshot = await citiesRef.get();
        console.log({ querySnapshot });
        const unreadNotification = querySnapshot.docs.length;
        console.log({ unreadNotification });

        if (navigator.setAppBadge) {
          console.log("The App Badging API is supported inside push!");
          console.log({ pushNavigator: navigator });
          if (unreadNotification === 0 || unreadNotification) {
            navigator.clearAppBadge();
          } else {
            navigator.setAppBadge(unreadNotification);
          }
        }
      })()
    );
  });

  self.addEventListener("notificationclick", (event) => {
    console.log({ sw: "notificationclick" });

    const { notification } = event;
    const {
      data: { actionUrl },
    } = notification;

    event.notification.close();

    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientsArr) => {
          // If a Window tab matching the targeted URL already exists, focus that;
          const hadWindowToFocus = clientsArr.some((windowClient) => {
            if (windowClient.url === actionUrl) {
              console.log("django");
              windowClient.focus();
              return true;
            }
          });

          // Otherwise, open a new tab to the applicable URL and focus it.
          if (!hadWindowToFocus) {
            return clients.openWindow(actionUrl);
          }
        })
    );
  });
})(self);
