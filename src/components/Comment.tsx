import styled from "styled-components";
import { auth, deleteComment, updateComment } from "../services/firebase";
import { useState } from "react";

type CommentsProps = {
  id: string;
  postId: string;
  createdAt: number;
  username: string;
  userId: string;
  profileImg: string;
  comment: string;
};

const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin: 10px 0;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  width: 90%;
`;

const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 10px;
  margin-right: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Username = styled.span`
  font-weight: 600;
  margin-right: 5px;
`;

const Time = styled.span`
  color: gray;
  font-size: 12px;
`;

const Content = styled.p`
  line-height: 1.2;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin: 10px 0;
  padding: 5px;
  outline: none;
  border: none;
  background-color: #eff4fc;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  resize: none;
  font-size: medium;
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 10px 0;
  font-size: 15px;
  border-radius: 10px;
  background-color: #1877f2;
  color: white;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
  &:last-child {
    margin-left: 5px;
    background-color: white;
    color: inherit;
    border: 1px solid #e6e6e6;
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

const Manage = styled.div`
  width: 10%;
  text-align: center;
`;

const Edit = styled.svg`
  width: 20px;
  color: #1877f2;
  cursor: pointer;
  margin-right: 5px;
`;

const Delete = styled.svg`
  width: 20px;
  color: #ff4154;
  cursor: pointer;
`;

export default function Comment({
  id,
  postId,
  comment,
  createdAt,
  username,
  userId,
  profileImg,
}: CommentsProps) {
  const user = auth.currentUser!.uid;
  const createdTime = new Date(createdAt).toLocaleString("ko-KR");
  const [newComment, setNewComment] = useState(comment);
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit(true);
  };

  const onCancel = () => {
    setIsEdit(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || newComment === "" || newComment.length > 500) return;
    await updateComment({ commentId: id, postId, comment: newComment });
    setIsEdit(false);
  };

  const onDelete = async () => {
    const ok = confirm("삭제하시겠습니까?");
    if (!ok || user !== userId) return;
    await deleteComment({ postId, commentId: id });
  };

  return (
    <CommentItem>
      <Wrapper>
        <ProfileImg src={profileImg} />
        <Container>
          <UserInfo>
            <Username>{username}</Username>
            <Time>{createdTime}</Time>
          </UserInfo>
          <Content>{comment}</Content>
          {isEdit ? (
            <Form onSubmit={onSubmit}>
              <TextArea value={newComment} onChange={onChange} rows={4} />
              <ButtonContainer>
                <Button type="submit">Edit</Button>
                <Button type="button" onClick={onCancel}>
                  Cancel
                </Button>
              </ButtonContainer>
            </Form>
          ) : null}
        </Container>
      </Wrapper>
      {user === userId && (
        <Manage>
          <Edit
            onClick={onEdit}
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </Edit>
          <Delete
            onClick={onDelete}
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </Delete>
        </Manage>
      )}
    </CommentItem>
  );
}
