import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}
