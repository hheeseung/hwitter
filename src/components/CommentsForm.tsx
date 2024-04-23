import styled from "styled-components";
import {
  Form,
  FormContainer,
  ProfileIcon,
  ProfileImg,
  TextArea,
} from "./style/PostFormComponent";
import { addComment, auth } from "../services/firebase";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AddButton = styled.button`
  margin-top: 10px;
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

export default function CommentsForm({ id }: { id: string }) {
  const user = auth.currentUser!;
  const [comment, setComment] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || comment === "" || comment.length > 500) return;
    try {
      await addComment({
        id,
        username: user.displayName!,
        userId: user.uid,
        profileImg: user.photoURL,
        comment,
      });
      setComment("");
    } catch (error) {
      console.error(error);
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
            value={comment}
            placeholder="Add Your Comment!"
            required
          />
          <AddButton>Add Comment</AddButton>
        </Wrapper>
      </FormContainer>
    </Form>
  );
}
