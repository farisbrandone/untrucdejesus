import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDVLs9ZTU8F5JuderX7A3tprvPtmSpmgx0",
  authDomain: "carte-interactive-e3ecd.firebaseapp.com",
  projectId: "carte-interactive-e3ecd",
  storageBucket: "carte-interactive-e3ecd.appspot.com",
  messagingSenderId: "293631422400",
  appId: "1:293631422400:web:6adbc60f1ba0f23a0be225",
  measurementId: "G-BNSYY511FN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

/*interface typeNotification {
  id: string;
  title: string;
  body: string;
}*/

export function HeaderDashboard() {
  const [notification, setNotification] = useState<any[]>([]);

  /*const querySnapshot = await getDocs(collection(db, "Notifications"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });*/

  const deleteNotification = async (id: string) => {
    const docRef = doc(db, "Notifications", id);
    const result = await deleteDoc(docRef);
    console.log(result);
    const querySnapshot = await getDocs(collection(db, "Notifications"));
    const arrayNotification: any[] = [];
    querySnapshot.forEach((doc) => {
      arrayNotification.push({
        id: doc.id,
        title: doc.data().title,
        body: doc.data().body,
      });
    });
    setNotification([...arrayNotification]);
    const unreadNotification = querySnapshot.docs.length;
    console.log({ unreadNotification });

    if (navigator.setAppBadge) {
      console.log("The App Badging API is supported!");
      console.log({ navigator });
      if (unreadNotification === 0) {
        navigator.clearAppBadge();
      } else if (unreadNotification) {
        navigator.setAppBadge(unreadNotification);
      }
    }
  };
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "Notifications"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().title}`);
      });
      if (querySnapshot && querySnapshot.docs.length !== 0) {
        const arrayNotification: any[] = [];
        querySnapshot.forEach((doc) => {
          arrayNotification.push({
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
          });
        });
        const unreadNotification = querySnapshot.docs.length;
        console.log(unreadNotification);
        setNotification([...arrayNotification]);
      }
    })();
  }, []);

  return (
    <div className="w-full py-3 px-5 flex items-center box-content  bg-white fixed top-0 shadow-lg z-[6000]">
      <img
        src="https://trucdejesus.appowls.io/assets/apps/user_1837/app_3120/draft/icon/app_logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="mx-auto"
      />
      <div className="dropdown mr-3  ">
        <div
          tabIndex={0}
          role="button"
          className="btn rounded-[6px] min-h-[33px] duration-500 min-h-2rem m-1 bg-[#e6f7ff] text-[#bd10e0]"
          title="Notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content -right-3 menu bg-[#f8e71c] rounded-box z-[1] w-52 p-2 mr-4 shadow"
        >
          {notification.length !== 0 ? (
            notification.map((doc, index) => {
              return (
                <li key={index} onClick={() => deleteNotification(doc.id)}>
                  <a href="" className="text-black font-semibold">
                    {doc.title}
                  </a>
                </li>
              );
            })
          ) : (
            <li>Aucune notification</li>
          )}
        </ul>
      </div>
      {notification.length !== 0 && (
        <div className="absolute top-[14px] w-[15px] h-[15px] bg-slate-600 text-white right-8 rounded-[20px] flex items-center justify-center ">
          <span className="text-[10px] font-extrabold ">
            {notification.length}
          </span>
        </div>
      )}
    </div>
  );
}
