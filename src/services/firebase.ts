/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  Unsubscribe,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export type UserInfo = {
  name: string;
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

type Post = {
  user: User;
  post?: string;
  file?: File | null;
};

export type TimelinePost = {
  post: string;
  createdAt: number;
  userId: string;
  username: string;
  photo?: string;
  id: string;
  profileImg?: string;
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

export async function addPost({ user, post, file }: Post) {
  const doc = await addDoc(collection(db, "posts"), {
    post,
    createdAt: Date.now(),
    username: user.displayName || "Anonymous",
    userId: user.uid,
    profileImg: user.photoURL || null,
  });

  if (file) {
    const locationRef = ref(storage, `posts/${user.uid}/${doc.id}`);
    const result = await uploadBytes(locationRef, file);
    const url = await getDownloadURL(result.ref);
    await updateDoc(doc, { photo: url });
  }

  return doc;
}

export function getPosts(setPosts: any) {
  let unsubscribe: Unsubscribe | null = null;
  const postsQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    limit(30)
  );

  unsubscribe = onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => {
      const { post, createdAt, userId, username, photo, profileImg } =
        doc.data();
      return {
        post,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
        profileImg,
      };
    });
    setPosts(posts);
  });

  return unsubscribe;
}
