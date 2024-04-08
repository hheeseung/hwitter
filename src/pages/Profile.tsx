import styled from "styled-components";
import MyPost from "../components/MyPost";
import MyProfile from "../components/MyProfile";
import { auth } from "../services/firebase";

const Wrapper = styled.section`
  width: 50%;
  height: fit-content;
  padding: 15px;
  border-radius: 10px;
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
