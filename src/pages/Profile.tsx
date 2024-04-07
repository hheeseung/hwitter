import styled from "styled-components";

const Wrapper = styled.section`
  width: 50%;
  height: fit-content;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

export default function Profile() {
  return <Wrapper>Profile</Wrapper>;
}
