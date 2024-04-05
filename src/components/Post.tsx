import styled from "styled-components";
import { TimelinePost } from "../services/firebase";

const List = styled.li`
  width: 100%;
  background-color: white;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UserAvatar = styled.img`
  width: 50px;
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

const Text = styled.p`
  margin-bottom: 20px;
`;

const AttachedImg = styled.img`
  width: 500px;
  border-radius: 10px;
`;

export default function Post({
  profileImg,
  photo,
  username,
  post,
  createdAt,
}: TimelinePost) {
  const createdTime = new Date(createdAt).toLocaleDateString();

  return (
    <List>
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
      <Text>{post}</Text>
      <AttachedImg src={photo} />
    </List>
  );
}
