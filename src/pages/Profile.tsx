import styled from "styled-components";
import MyPost from "../components/MyPost";
import MyProfile from "../components/MyProfile";
import { auth } from "../services/firebase";

const Wrapper = styled.main`
  width: 50%;
  height: fit-content;
  border-radius: 10px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 80px;
  }
`;

export default function Profile() {
  const user = auth.currentUser;

  return (
    <Wrapper>
      <MyProfile user={user} />
      <MyPost user={user!} />
    </Wrapper>
  );
}
