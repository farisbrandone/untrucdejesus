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
  const firebaseConfig = {
    apiKey: "AIzaSyBqHomX-GSUzQOf9j6g3G4HNGTlQPtySdk",
    authDomain: "un-truc-de-jesus-carte.firebaseapp.com",
    projectId: "un-truc-de-jesus-carte",
    storageBucket: "un-truc-de-jesus-carte.appspot.com",
    messagingSenderId: "255170124059",
    appId: "1:255170124059:web:9b7818ec3f7e5b127b9bbe",
    measurementId: "G-E7R22DLZ61",
  };

  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
  const db = firebase.firestore();
  const citiesRef = db.collection("Notifications");
  const PREFIX = "key_cache";

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
    //event.preventDefault();
    console.log("push");
    const message = event.data.json();
    console.log({ message });

    const {
      notification: { title, body },
    } = message;
    const titleIcon = title.split("$-*");
    const bodyAction = body.split("$-*");

    console.log({ titleIcon, bodyAction });

    //console.log({ newversion: { title, body, actionUrl, icon } });

    if (bodyAction.length < 2 && titleIcon.length < 2) {
      const trueTitle = titleIcon[0];
      const trueBody = bodyAction[0];

      const notificationOptions = {
        body: trueBody,
        badge:
          "https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png", // Chemin vers votre icône de badge
        sound: "/musicnotification.wav",
      };

      event.preventDefault();

      const promiseChain = new Promise((resolve) => {
        self.registration
          .showNotification(trueTitle, notificationOptions)
          .then(() => resolve("ddd"));
      });
      event.waitUntil(
        (async () => {
          //const total = await citiesRef.add({ title, body, icon, actionUrl })
          //console.log({ total });
          const [showNotif, querySnapshot] = await promise.all([
            promiseChain,
            citiesRef.get(),
          ]);
          //const querySnapshot = await citiesRef.get();
          console.log({ showNotif });
          //console.log({ querySnapshot });
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
    } else if (bodyAction.length === 2 && titleIcon.length === 2) {
      const notificationOptions = {
        body: bodyAction[0],
        icon: titleIcon[1],
        badge:
          "https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png", // Chemin vers votre icône de badge
        sound: "/musicnotification.wav",
        actions: [
          {
            action: "Cliquez ici",
            title: "Cliquez ici",
          },
        ],
        data: {
          actionUrl: bodyAction[1],
        },
      };

      const promiseChain = new Promise((resolve) => {
        self.registration
          .showNotification(titleIcon[0], notificationOptions)
          .then(() => resolve("dede"));
      });
      event.waitUntil(
        (async () => {
          //const total = await citiesRef.add({ title, body, icon, actionUrl })
          //console.log({ total });
          const [showNotif, querySnapshot] = await promise.all([
            promiseChain,
            citiesRef.get(),
          ]);
          //const querySnapshot = await citiesRef.get();
          console.log({ showNotif });
          //console.log({ querySnapshot });
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
    } else if (bodyAction.length < 2 && titleIcon.length === 2) {
      const notificationOptions = {
        body: bodyAction[0],
        icon: titleIcon[1],
        badge:
          "https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png", // Chemin vers votre icône de badge
        sound: "/musicnotification.wav",
      };

      const promiseChain = new Promise((resolve) => {
        self.registration
          .showNotification(titleIcon[0], notificationOptions)
          .then(() => resolve("zzzz"));
      });
      event.waitUntil(
        (async () => {
          //const total = await citiesRef.add({ title, body, icon, actionUrl })
          //console.log({ total });
          const [showNotif, querySnapshot] = await promise.all([
            promiseChain,
            citiesRef.get(),
          ]);
          //const querySnapshot = await citiesRef.get();
          console.log({ showNotif });
          //console.log({ querySnapshot });
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
    } else if (bodyAction.length === 2 && titleIcon.length < 2) {
      const notificationOptions = {
        body: bodyAction[0],
        badge:
          "https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png", // Chemin vers votre icône de badge
        sound: "/musicnotification.wav",
        actions: [
          {
            action: "Cliquez ici",
            title: "Cliquez ici",
          },
        ],
        data: {
          actionUrl: bodyAction[1],
        },
      };

      const promiseChain = new Promise((resolve) => {
        self.registration
          .showNotification(titleIcon[0], notificationOptions)
          .then(() => resolve("aaaa"));
      });
      event.waitUntil(
        (async () => {
          //const total = await citiesRef.add({ title, body, icon, actionUrl })
          //console.log({ total });
          const [showNotif, querySnapshot] = await promise.all([
            promiseChain,
            citiesRef.get(),
          ]);
          //const querySnapshot = await citiesRef.get();
          console.log({ showNotif });
          //console.log({ querySnapshot });
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
    }
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
          const hadWindowToFocus = clientsArr.some((windowClient) => {
            if (windowClient.url === actionUrl) {
              console.log("django");
              windowClient.focus();
              return true;
            }
          });
          if (!hadWindowToFocus && actionUrl) {
            return clients.openWindow(actionUrl);
          }
        })
    );
  });
})(self);
