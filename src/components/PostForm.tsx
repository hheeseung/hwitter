import { useState } from "react";
import styled from "styled-components";
import { addPost, auth } from "../services/firebase";

const Form = styled.form`
  width: 100%;
  height: fit-content;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const FormContainer = styled.div`
  display: flex;
  align-items: start;
`;

const ProfileImg = styled.img`
  width: 50px;
  border-radius: 10px;
  margin-right: 10px;
`;

const ProfileIcon = styled.svg`
  width: 50px;
  fill: #1877f2;
`;

const TextArea = styled.textarea`
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

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;

const AttachImgButton = styled.label`
  margin-right: 10px;
`;

const Icon = styled.svg`
  width: 30px;
  color: #1877f2;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  font-size: 15px;
  outline: none;
  border: none;
  background-color: #1877f2;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
`;

export default function PostForm() {
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || post === "" || post.length > 300) return;

    try {
      setIsLoading(true);
      await addPost({ user, post, file });
      setPost("");
      setFile(null);
    } catch (error) {
      console.error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormContainer>
        {user && user.photoURL ? (
          <ProfileImg src={user.photoURL} />
        ) : (
          <ProfileIcon
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
            />
          </ProfileIcon>
        )}
        <TextArea
          rows={3}
          onChange={onChange}
          value={post}
          placeholder="What is Happening??!!"
          required
        />
      </FormContainer>
      <Container>
        <AttachImgButton htmlFor="file">
          {file ? (
            "Photo Added ✅"
          ) : (
            <Icon
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </Icon>
          )}
        </AttachImgButton>
        <Input id="file" type="file" accept="image/*" onChange={onFileChange} />
        <SubmitButton>{isLoading ? "Posting..." : "Post"}</SubmitButton>
      </Container>
    </Form>
  );
}
