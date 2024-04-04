import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export type UserInfo = {
  name: string;
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export async function createUser({ name, email, password }: UserInfo) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = credential.user;
  if (!user) return;
  await updateProfile(user, { displayName: name });
}

export async function login({ email, password }: LoginForm) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = credential.user;
  if (!user) return;
}

export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  auth.signOut().catch(console.error);
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}
