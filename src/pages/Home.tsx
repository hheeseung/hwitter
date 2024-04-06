import styled from "styled-components";
import PostForm from "../components/PostForm";
import Timeline from "../components/Timeline";

const Wrapper = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostForm />
      <Timeline />
    </Wrapper>
  );
}
