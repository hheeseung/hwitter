import { useState } from "react";
import { LoginForm, login } from "../services/firebase";
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

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
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
    setError("");
    if (form.email === "" || form.password === "") return;
    try {
      await login(form);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <Description>Log in to explore the wide world!</Description>
      <Form onSubmit={onSubmit}>
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
        <Input type="submit" value="Login" />
      </Form>
      {error && <Error>{error}</Error>}
      <ForgotPassword onClick={() => navigate("/reset-password")}>
        Forgot Password?
      </ForgotPassword>
      <Or>Or</Or>
      <GoogleLoginButton />
      <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create account here.</Link>
      </Switcher>
    </Wrapper>
  );
}
