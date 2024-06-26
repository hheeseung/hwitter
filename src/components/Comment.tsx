import styled from "styled-components";
import {
  addCommentLikes,
  auth,
  deleteComment,
  removeCommentLikes,
  updateComment,
} from "../services/firebase";
import { useState } from "react";

type CommentsProps = {
  id: string;
  postId: string;
  createdAt: number;
  username: string;
  userId: string;
  profileImg: string;
  comment: string;
  likes: string[];
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

const Avatar = styled.svg`
  width: 50px;
  height: 50px;
  padding: 5px;
  fill: #1877f2;
  background-color: #eff4fc;
  border-radius: 10px;
  margin-right: 5px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
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

const Manage = styled.div`
  display: flex;
  text-align: center;
  margin: 0 5px;
`;

const Edit = styled.svg`
  width: 18px;
  color: #1877f2;
  cursor: pointer;
`;

const Delete = styled.svg`
  width: 18px;
  color: #ff4154;
  cursor: pointer;
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

const LikesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Likes = styled.svg`
  width: 25px;
  color: slategray;
  cursor: pointer;
  margin-right: 2px;
`;

const LikesCount = styled.span`
  font-size: 15px;
`;

export default function Comment({
  id,
  postId,
  comment,
  createdAt,
  username,
  userId,
  profileImg,
  likes,
}: CommentsProps) {
  const user = auth.currentUser!.uid;
  const createdTime = new Date(createdAt).toLocaleString("ko-KR");
  const [newComment, setNewComment] = useState(comment);
  const [isEdit, setIsEdit] = useState(false);
  const [isLike, setIsLike] = useState(!!likes.find((item) => item === user));

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

  const onLikeClick = async () => {
    setIsLike((curr) => {
      const newLikeState = !curr;
      if (newLikeState) {
        addCommentLikes({ postId, commentId: id, userId: user });
      } else {
        removeCommentLikes({ postId, commentId: id, userId: user });
      }
      return newLikeState;
    });
  };

  return (
    <CommentItem>
      <Wrapper>
        {profileImg ? (
          <ProfileImg src={profileImg} />
        ) : (
          <Avatar
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
          </Avatar>
        )}
        <Container>
          <UserInfo>
            <Username>{username}</Username>
            <Time>{createdTime}</Time>
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
      {isLike ? (
        <LikesContainer>
          <Likes
            onClick={onLikeClick}
            fill="#ff4154"
            stroke="#ff4154"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </Likes>
          <LikesCount>{likes.length}</LikesCount>
        </LikesContainer>
      ) : (
        <LikesContainer>
          <Likes
            onClick={onLikeClick}
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
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </Likes>
          <LikesCount>{likes.length}</LikesCount>
        </LikesContainer>
      )}
    </CommentItem>
  );
}
