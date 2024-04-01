import { useNavigate } from "react-router-dom";
import { logout } from "../services/firebase";

export default function Home() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    await logout();
    navigate("/login");
  };

  return <button onClick={onLogOut}>logout</button>;
}
