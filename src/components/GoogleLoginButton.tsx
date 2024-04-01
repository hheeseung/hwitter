import styled from "styled-components";
import { googleLogin } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  background-color: inherit;
  font-size: 16px;
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  color: #1877f2;
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
