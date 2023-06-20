// Import the functions you need from the SDKs you need
/* import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"  */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app"s Firebase configuration
/* const firebaseConfig = {
  apiKey: "AIzaSyDt-ej_74NklEL1KAdVgbhDWhA3NDM8Q68",
  authDomain: "hivemind-10fa2.firebaseapp.com",
  projectId: "hivemind-10fa2",
  storageBucket: "hivemind-10fa2.appspot.com",
  messagingSenderId: "943134296673",
  appId: "1:943134296673:web:d333eebfe01beb33017820"
}; */

// Initialize Firebase
/* const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); */

// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { DocumentData, Firestore, Query, QuerySnapshot, addDoc, collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, User, UserCredential } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1JNcv-mRSx3o6SIAnFNE7SRlB3Bps8Wo",
  authDomain: "hivemind-390312.firebaseapp.com",
  projectId: "hivemind-390312",
  storageBucket: "hivemind-390312.appspot.com",
  messagingSenderId: "669136749405",
  appId: "1:669136749405:web:c41f131a7cdb7d3806deb4",
  measurementId: "G-YTLMVJTP3D"
};

// Initialize Firebase
const app: FirebaseApp = !!getApps().length ? getApp() : initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);

export const auth: Auth = getAuth(app);
export const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
export const db: Firestore = getFirestore(app);

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    const credential: UserCredential = await signInWithPopup(auth, googleProvider);
    const user: User = credential.user;
    const q: Query<DocumentData> = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs: QuerySnapshot<DocumentData> = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    await setDoc(doc(db, "sessions", "active-session"), {
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      },
      authProvider: "google",
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      alert((e as Error).message);
    }
  }
}