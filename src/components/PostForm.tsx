import { useState } from "react";
import { addPost, auth } from "../services/firebase";
import {
  AttachImgButton,
  Container,
  Form,
  FormContainer,
  Icon,
  Input,
  ProfileIcon,
  ProfileImg,
  SubmitButton,
  TextArea,
} from "./style/PostFormComponent";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
      if (files[0].size > 1024 ** 2) {
        window.alert("첨부파일 용량은 1MB 미만의 파일만 가능합니다.");
        return;
      }
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
            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
          </ProfileIcon>
        )}
        <Wrapper>
          <TextArea
            rows={3}
            onChange={onChange}
            value={post}
            placeholder="What is Happening??!!"
            required
          />
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
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
            <SubmitButton>{isLoading ? "Posting..." : "Post"}</SubmitButton>
          </Container>
        </Wrapper>
      </FormContainer>
    </Form>
  );
}
