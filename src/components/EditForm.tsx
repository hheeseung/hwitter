import styled from "styled-components";
import {
  FormContainer,
  ProfileIcon,
  ProfileImg,
  SubmitButton,
} from "./PostFormComponent";
import { auth, updatePost } from "../services/firebase";
import { Dispatch, SetStateAction, useState } from "react";

type EditPost = {
  userId: string;
  postId: string;
  post: string;
  photo?: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 10px;
  background-color: #eff4fc;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Form = styled.form``;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  outline: none;
  border: none;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  resize: none;
  font-size: 18px;
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
`;

const Container = styled.div`
  margin-left: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  margin-left: 5px;
  padding: 10px 15px;
  font-size: 15px;
  outline: none;
  border: none;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  &:hover {
    filter: brightness(0.9);
  }
`;

export default function EditForm({
  userId,
  postId,
  post,
  setIsEdit,
}: EditPost) {
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [newPost, setNewPost] = useState(post);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || user.uid === userId || post === "" || post.length > 300)
      return;
    try {
      setIsLoading(true);
      await updatePost({
        postId,
        userId: user.uid,
        newPost,
      });
      setIsEdit(false);
    } catch (error) {
      console.error;
    }
  };

  const onCancel = () => {
    setIsEdit(false);
  };

  return (
    <Wrapper>
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
            name="post"
            value={newPost}
            placeholder="What is Happening??!!"
            required
          />
        </FormContainer>
        <Container>
          <SubmitButton>{isLoading ? "Updating..." : "Update"}</SubmitButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </Container>
      </Form>
    </Wrapper>
  );
}
