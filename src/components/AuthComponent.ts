import styled from "styled-components";

export const Wrapper = styled.section`
  width: 480px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  margin-top: 50px;
  font-size: 30px;
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 50px;
  color: gray;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background-color: #f6f7f9;
  outline: none;
  font-size: 15px;
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  margin-bottom: 10px;
  &:last-child {
    font-size: 16px;
    cursor: pointer;
    background-color: #1877f2;
    color: white;
    &:hover {
      filter: brightness(1.1);
    }
  }
`;

export const ForgotPassword = styled.span`
  margin-top: 10px;
  color: #1877f2;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const Error = styled.p`
  color: tomato;
  font-weight: 600;
`;

export const Or = styled.div`
  width: 100%;
  margin: 30px 0;
  color: gray;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after,
  &::before {
    content: "";
    height: 1px;
    background-color: #c9c9c9;
    margin: 0 20px;
    flex-grow: 1;
  }
`;

export const Switcher = styled.div`
  margin: 20px 0;
  a {
    color: #1877f2;
  }
`;
