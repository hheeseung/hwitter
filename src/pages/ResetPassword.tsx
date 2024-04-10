import { useState } from "react";
import {
  Description,
  Error,
  Form,
  Input,
  Or,
  Title,
  Wrapper,
} from "../components/style/AuthComponent";
import { resetPassword } from "../services/firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Switcher = styled.div`
  font-weight: 600;
  color: #1877f2;
  cursor: pointer;
`;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (email === "") return;
    try {
      await resetPassword(email);
      alert("Your mail has been sent successfully.");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };

  return (
    <Wrapper>
      <Title>Forgot Password?</Title>
      <Description>Input your email to reset password.</Description>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={email}
          type="email"
          placeholder="Email"
          required
        />
        <Input type="submit" value="Reset" />
      </Form>
      {error && <Error>{error}</Error>}
      <Or>Or</Or>
      <Switcher onClick={() => navigate(-1)}>
        &larr; Back to previous page
      </Switcher>
    </Wrapper>
  );
}
