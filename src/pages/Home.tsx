import styled from "styled-components";
import PostForm from "../components/PostForm";
import Timeline from "../components/Timeline";

const Wrapper = styled.main`
  width: 50%;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 80px;
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <PostForm />
      <Timeline />
    </Wrapper>
  );
}
