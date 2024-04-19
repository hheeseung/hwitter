import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.main`
  width: 50%;
  padding: 10px 0;
`;

export default function Detail() {
  const { postId } = useParams();
  console.log(postId);

  return <Wrapper>Details</Wrapper>;
}
