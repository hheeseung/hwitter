import { useState } from "react";
import { UserInfo, createUser } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Description,
  Error,
  ForgotPassword,
  Form,
  Input,
  Or,
  Switcher,
  Title,
  Wrapper,
} from "../components/AuthComponent";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState<UserInfo>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!form.name || !form.email || !form.password) return;
      await createUser(form);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };

  return (
    <Wrapper>
      <Title>Create Your Account</Title>
      <Description>Sign up and experience the wide world.</Description>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          required
        />
        <Input
          onChange={onChange}
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          required
        />
        <Input
          onChange={onChange}
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          required
        />
        <Input type="submit" value="Create Account" />
      </Form>
      <ForgotPassword onClick={() => navigate("/reset-password")}>
        Forgot Password?
      </ForgotPassword>
      {error && <Error>{error}</Error>}
      <Or>Or</Or>
      <GoogleLoginButton />
      <Switcher>
        Already have an account? <Link to="/login">Login here.</Link>
      </Switcher>
    </Wrapper>
  );
}
