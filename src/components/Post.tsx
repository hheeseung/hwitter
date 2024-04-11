import styled from "styled-components";
import { TimelinePost, auth } from "../services/firebase";
import { useState } from "react";
import PostManage from "./PostManage";
import EditForm from "./EditForm";
import Media from "./Media";

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
  width: 100%;
  border-radius: 10px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: fit-content;
  }
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
      <Media />
    </List>
  );
}
