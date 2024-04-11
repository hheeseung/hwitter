import styled from "styled-components";
import { TimelinePost, auth } from "../services/firebase";
import { useState } from "react";
import PostManage from "./PostManage";
import EditForm from "./EditForm";

const List = styled.li`
  width: 100%;
  background-color: white;
  padding: 20px 20px 0 20px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 10px;
`;

const UserIcon = styled.svg`
  width: 50px;
  padding: 5px;
  fill: #1877f2;
  background-color: #eff4fc;
  border-radius: 10px;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Username = styled.span`
  font-weight: 600;
`;

const CreatedTime = styled.span`
  margin-top: 5px;
  font-size: small;
  color: gray;
`;

const Dropdown = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropdownIcon = styled.svg`
  width: 30px;
  color: gray;
`;

const PostContainer = styled.div`
  margin-bottom: 20px;
`;

const Text = styled.p`
  margin-bottom: 20px;
  line-height: 1.3;
`;

const AttachedImg = styled.img`
  width: fit-content;
  height: 400px;
  object-fit: contain;
  object-position: left;
  border-radius: 10px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: fit-content;
  }
`;

const SocialContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  padding: 20px 0;
  border-top: 1px solid #e9e9e9;
`;

const SocialIcon = styled.svg`
  width: 25px;
  color: slategray;
  cursor: pointer;
`;

export default function Post({
  id,
  userId,
  profileImg,
  photo,
  username,
  post,
  createdAt,
}: TimelinePost) {
  const createdTime = new Date(createdAt).toLocaleString("ko-KR");
  const user = auth.currentUser;
  const [drop, setDrop] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onDropdownClick = () => {
    if (userId === user?.uid) {
      setDrop((curr) => !curr);
    }
  };

  return (
    <List>
      <UserContainer>
        <UserInfo>
          {profileImg ? (
            <UserAvatar src={profileImg} />
          ) : (
            <UserIcon
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </UserIcon>
          )}
          <Metadata>
            <Username>{username}</Username>
            <CreatedTime>{createdTime}</CreatedTime>
          </Metadata>
        </UserInfo>
        <Dropdown onClick={onDropdownClick}>
          <DropdownIcon
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
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </DropdownIcon>
          {drop ? (
            <PostManage
              postId={id}
              userId={userId}
              post={post}
              photo={photo}
              setIsEdit={setIsEdit}
            />
          ) : null}
        </Dropdown>
      </UserContainer>
      <PostContainer>
        <Text>{post}</Text>
        {photo && <AttachedImg src={photo} />}
      </PostContainer>
      {isEdit ? (
        <EditForm
          userId={userId}
          postId={id}
          post={post}
          setIsEdit={setIsEdit}
        />
      ) : null}
      <SocialContainer>
        <SocialIcon
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
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </SocialIcon>
        <SocialIcon
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
        </SocialIcon>
        <SocialIcon
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
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </SocialIcon>
        <SocialIcon
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
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </SocialIcon>
      </SocialContainer>
    </List>
  );
}
