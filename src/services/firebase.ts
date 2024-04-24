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
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

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
  id?: string;
};

type UpdatePost = {
  postId: string;
  post: string;
};

type DeletePost = {
  userId: string;
  id: string;
  photo?: string;
};

export type TimelinePost = {
  post: string;
  createdAt: number;
  userId: string;
  username: string;
  photo?: string;
  id: string;
  profileImg?: string;
  likedList: string[];
  bookmarkedList: string[];
};

type UpdateUserProfile = {
  user: User;
  files?: FileList | null;
  setAvatar?: any;
  newUsername?: string;
};

type MyPosts = {
  user: User;
  setMyPosts: any;
};

type HandleInteraction = {
  id: string;
  userId: string;
};

type AddComment = {
  id: string;
  username: string;
  userId: string;
  profileImg?: string | null;
  comment: string;
};

type UpdateComment = {
  commentId: string;
  postId: string;
  comment: string;
};

type DeleteComment = {
  postId: string;
  commentId: string;
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

// 회원가입, 로그인 관련
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

// 비밀번호 초기화
export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

// 게시물 추가
export async function addPost({ user, post, file }: Post) {
  const doc = await addDoc(collection(db, "posts"), {
    post,
    createdAt: Date.now(),
    username: user.displayName || "Anonymous",
    userId: user.uid,
    profileImg: user.photoURL || null,
    likedList: [],
    bookmarkedList: [],
  });

  if (file) {
    const locationRef = ref(storage, `posts/${user.uid}/${doc.id}`);
    const result = await uploadBytes(locationRef, file);
    const url = await getDownloadURL(result.ref);
    await updateDoc(doc, { photo: url });
  }

  return doc;
}

// 전체 게시물 불러오기
export function getPosts(setPosts: any) {
  let unsubscribe: Unsubscribe | null = null;

  const postsQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    limit(30)
  );

  unsubscribe = onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => {
      const {
        post,
        createdAt,
        userId,
        username,
        photo,
        profileImg,
        likedList,
        bookmarkedList,
      } = doc.data();
      return {
        post,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
        profileImg,
        likedList,
        bookmarkedList,
      };
    });
    setPosts(posts);
  });

  return unsubscribe;
}

// 게시물 수정
export async function updatePost({ postId, post }: UpdatePost) {
  const postRef = doc(db, "posts", postId);
  const updateData = {
    post,
  };

  try {
    await updateDoc(postRef, updateData);
  } catch (error) {
    console.error(error);
  }
}

// 게시물 삭제
export async function deletePost({ userId, id, photo }: DeletePost) {
  try {
    await deleteDoc(doc(db, "posts", id));
    if (photo) {
      const photoRef = ref(storage, `posts/${userId}/${id}`);
      await deleteObject(photoRef);
    }
  } catch (error) {
    console.error(error);
  }
}

export type CurrentUser = {
  user: User;
  setUserInfo: any;
};

// 사용자 프로필 업데이트
export async function updateUserProfile({
  user,
  files,
  setAvatar,
  newUsername,
}: UpdateUserProfile) {
  const profileQuery = query(
    collection(db, "posts"),
    where("userId", "==", user.uid)
  );
  const snapshot = await getDocs(profileQuery);

  if (files && files.length === 1) {
    const file = files[0];
    const locationRef = ref(storage, `avatars/${user?.uid}`);
    const result = await uploadBytes(locationRef, file);
    const avatarURL = await getDownloadURL(result.ref);
    setAvatar(avatarURL);
    await updateProfile(user, {
      photoURL: avatarURL,
    });
    for (const item of snapshot.docs) {
      await updateDoc(doc(db, "posts", item.id), {
        profileImg: avatarURL,
      });
    }
  }

  if (newUsername) {
    await updateProfile(user, {
      displayName: newUsername,
    });
    for (const item of snapshot.docs) {
      await updateDoc(doc(db, "posts", item.id), {
        username: newUsername,
      });
    }
  }
}

// 사용자 작성 게시물 불러오기
export function getMyPosts({ user, setMyPosts }: MyPosts) {
  let unsubscribe: Unsubscribe | null = null;

  const postsQuery = query(
    collection(db, "posts"),
    where("userId", "==", user?.uid),
    orderBy("createdAt", "desc"),
    limit(30)
  );

  unsubscribe = onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map((doc) => {
      const {
        post,
        createdAt,
        userId,
        username,
        photo,
        profileImg,
        likedList,
        bookmarkedList,
      } = doc.data();
      return {
        post,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
        profileImg,
        likedList,
        bookmarkedList,
      };
    });
    setMyPosts(posts);
  });

  return unsubscribe;
}

// 좋아요 추가
export async function addLikes({ id, userId }: HandleInteraction) {
  const likeRef = doc(db, "posts", id);
  await updateDoc(likeRef, {
    likedList: arrayUnion(userId),
  });
}

// 좋아요 취소
export async function removeLikes({ id, userId }: HandleInteraction) {
  const likeRef = doc(db, "posts", id);
  await updateDoc(likeRef, {
    likedList: arrayRemove(userId),
  });
}

// 북마크 추가
export async function addBookmarks({ id, userId }: HandleInteraction) {
  const bookmarkRef = doc(db, "posts", id);
  await updateDoc(bookmarkRef, {
    bookmarkedList: arrayUnion(userId),
  });
}

// 북마크 삭제
export async function removeBookmarks({ id, userId }: HandleInteraction) {
  const bookmarkRef = doc(db, "posts", id);
  await updateDoc(bookmarkRef, {
    bookmarkedList: arrayRemove(userId),
  });
}

// 댓글 추가하기
export async function addComment({
  id,
  username,
  userId,
  profileImg,
  comment,
}: AddComment) {
  const reqData = {
    comment,
    createdAt: Date.now(),
    username,
    userId,
    profileImg,
    likes: [],
  };

  const commentsRef = doc(collection(db, "posts", id, "comments"));
  await setDoc(commentsRef, reqData);
}

// 게시물에 달린 댓글 불러오기
export function getComments(postId: string, setComments: any) {
  let unsubscribe: Unsubscribe | null = null;

  const commentsQuery = query(
    collection(db, "posts", postId, "comments"),
    orderBy("createdAt", "desc")
  );

  unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
    const comments = snapshot.docs.map((doc) => {
      const { comment, createdAt, username, userId, profileImg, likes } =
        doc.data();
      return {
        id: doc.id,
        comment,
        createdAt,
        username,
        userId,
        profileImg,
        likes,
      };
    });
    setComments(comments);
  });

  return unsubscribe;
}

// 댓글 수정
export async function updateComment({
  commentId,
  postId,
  comment,
}: UpdateComment) {
  const commentRef = doc(db, "posts", postId, "comments", commentId);
  const updateData = {
    comment,
  };

  try {
    await updateDoc(commentRef, updateData);
  } catch (error) {
    console.error(error);
  }
}

// 댓글 삭제
export async function deleteComment({ postId, commentId }: DeleteComment) {
  try {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId));
  } catch (error) {
    console.error(error);
  }
}

type HandleCommentInteraction = {
  postId: string;
  commentId: string;
  userId: string;
};

// 댓글 좋아요 추가
export async function addCommentLikes({
  postId,
  commentId,
  userId,
}: HandleCommentInteraction) {
  const likeRef = doc(db, "posts", postId, "comments", commentId);
  await updateDoc(likeRef, {
    likes: arrayUnion(userId),
  });
}

// 댓글 좋아요 취소
export async function removeCommentLikes({
  postId,
  commentId,
  userId,
}: HandleCommentInteraction) {
  const likeRef = doc(db, "posts", postId, "comments", commentId);
  await updateDoc(likeRef, {
    likes: arrayRemove(userId),
  });
}
