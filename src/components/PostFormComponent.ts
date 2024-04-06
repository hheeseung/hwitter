import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  height: fit-content;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: start;
`;

export const ProfileImg = styled.img`
  width: 50px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const ProfileIcon = styled.svg`
  width: 50px;
  padding: 5px;
  fill: #1877f2;
  background-color: #eff4fc;
  border-radius: 10px;
  margin-right: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  outline: none;
  border: none;
  background-color: #eff4fc;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  resize: none;
  font-size: 18px;
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const AttachImgButton = styled.label``;

export const Icon = styled.svg`
  width: 25px;
  color: #1877f2;
  cursor: pointer;
`;

export const Input = styled.input`
  display: none;
`;

export const SubmitButton = styled.button`
  padding: 10px 15px;
  font-size: 15px;
  outline: none;
  border: none;
  background-color: #1877f2;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  &:hover {
    filter: brightness(1.1);
  }
`;
