import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: x-large;
`;

export default function Loading() {
  return <Wrapper>Loading...</Wrapper>;
}
