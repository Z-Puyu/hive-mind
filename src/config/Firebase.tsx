// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { DocumentData, Firestore, Query, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
import { Auth, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User, UserCredential } from "firebase/auth";
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
export const isExistingUser = async (user?: User, email?: string) => {
  let q: Query<DocumentData>;
  if (user) {
    q = query(collection(db, "users"), where("uid", "==", user.uid));
  } else {
    q = query(collection(db, "users"), where("email", "==", email));
  }
  const docs: QuerySnapshot<DocumentData> = await getDocs(q);
  return docs.docs.length !== 0;
}

export const signUp = async (userName: string, email: string, password: string) => {
  try {
    const credential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user: User = credential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: userName,
      authProvider: "local",
      email: email,
    });
    await updateProfile(user, {
      displayName: userName,
    })
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      alert((e as Error).message);
    }
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      alert((e as Error).message);
    }
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link has been sent!");
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      alert((e as Error).message);
    }
  }
};

export const signInWithGoogle = async () => {
  try {
    const credential: UserCredential = await signInWithPopup(auth, googleProvider);
    const user: User = credential.user;
    if (!isExistingUser(user)) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      alert((e as Error).message);
    }
  }
}

export const signUserOut = async () => {
  await signOut(auth);
}