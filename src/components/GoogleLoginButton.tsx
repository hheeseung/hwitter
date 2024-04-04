import styled from "styled-components";
import { googleLogin } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  background-color: white;
  font-size: 16px;
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;

  color: #1877f2;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Icon = styled.img`
  height: 25px;
`;

const ButtonText = styled.span`
  margin-left: 10px;
`;

export default function GoogleLoginButton() {
  const navigate = useNavigate();

  const login = async () => {
    await googleLogin();
    navigate("/");
  };

  return (
    <Button onClick={login}>
      <Icon src="/google.svg" />
      <ButtonText>Continue with Google</ButtonText>
    </Button>
  );
}
