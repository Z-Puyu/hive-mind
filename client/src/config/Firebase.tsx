// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { 
  DocumentData, 
  Firestore, 
  Query, 
  QuerySnapshot, 
  addDoc, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  getFirestore, 
  query, 
  serverTimestamp, 
  where 
} from "firebase/firestore"
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  getAuth, 
  GoogleAuthProvider, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile, 
  User, 
  UserCredential 
} from "firebase/auth";
import { 
  FirebaseStorage, 
  StorageReference, 
  UploadResult, 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytes 
} from "firebase/storage";
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
export const storage: FirebaseStorage = getStorage()

// Authentication functions
/**
 * Checks whether a user already exists by searching in the database for either
 * users with the same ID or users with the same registration e-mail address.
 * 
 * @param user The user to be checked.
 * @param email The user's registration e-mail address.
 * @returns Returns true if there is another user with the same credential, and false otherwise.
 */
export const isExistingUser = async (user?: User, email?: string) => {
  let usersWithSameCredential: Query<DocumentData>;
  if (user) {
    usersWithSameCredential = query(collection(db, "users"), where("uid", "==", user.uid));
  } else {
    usersWithSameCredential = query(collection(db, "users"), where("email", "==", email));
  }
  const docs: QuerySnapshot<DocumentData> = await getDocs(usersWithSameCredential);
  return docs.docs.length !== 0;
}

/**
 * Register a new user.
 * 
 * @param userName The new user's display name.
 * @param email The new user's e-mail address.
 * @param password The new user's password.
 */
export const signUp = async (userName: string, email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password).then(
    credential => {
      sendEmailVerification(credential.user);
      addDoc(collection(db, "users"), {
        uid: credential.user.uid,
        name: userName,
        authProvider: "local",
        email: email,
      }).then(() => {
        getDownloadURL(ref(storage, "defaultUserAvatar/defaultUserAvatar.jpg")).then(url =>
          updateProfile(credential.user, {
            photoURL: url,
            displayName: userName,
          })
        )
        getDoc(doc(db, "exampleProject", "exampleProject")).then(
          doc => {
            addDoc(collection(db, "userProjects", credential.user.uid, "projects"), {
              fileName: "Example",
              slateValue: doc.data()?.slateValue,
              timeStamp: serverTimestamp(),
              owner: credential.user.displayName
            })
          }
        );
        alert(`An verification e-mail has been sent to ${email}! If you do not see it,` +
        `please check the spam folder as well.`);
        signOut(auth);
      })
    }
  ).catch(e => {
    if (e instanceof Error) {
      console.error(e);
      alert((e as Error).message);
    }
  });

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

/**
 * Log in with a Google account.
 */
export const signInWithGoogle = async () => {
  try {
    const credential: UserCredential = await signInWithPopup(auth, googleProvider);
    const user: User = credential.user;
    if (!await isExistingUser(user)) {
      // First time using this account for log-in. 
      // We have to initialise the user's info as what we do for new user registration.
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
      await getDoc(doc(db, "exampleProject", "exampleProject")).then(
        doc => {
          addDoc(collection(db, "userProjects", user.uid, "projects"), {
            fileName: "Example",
            slateValue: doc.data()?.slateValue,
            owner: user.displayName,
            timeStamp: serverTimestamp(),
          })
        }
      )
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

// File-uploading functions
type Uploadable = Blob | Uint8Array | ArrayBuffer;

export const upload = async (file: Uploadable, user: User) => {
  const fileRef: StorageReference = ref(storage, "userAvatars/" + user.uid);
  const snapShot: UploadResult = await uploadBytes(fileRef, file)
  alert("Uploading completed")
}