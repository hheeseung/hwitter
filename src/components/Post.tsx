import { TimelinePost, auth } from "../services/firebase";
import { useState } from "react";
import PostManage from "./PostManage";
import EditForm from "./EditForm";
import { Link } from "react-router-dom";
import {
  AttachedImg,
  CreatedTime,
  Dropdown,
  DropdownIcon,
  List,
  Metadata,
  PostContainer,
  Text,
  UserAvatar,
  UserContainer,
  UserIcon,
  UserInfo,
  Username,
} from "./style/PostComponent";
import Media from "./Media";

export default function Post({
  id,
  userId,
  profileImg,
  photo,
  username,
  post,
  createdAt,
  bookmarkedList,
  likedList,
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
            <UserAvatar src={profileImg} referrerPolicy="no-referrer" />
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
      <Link
        to={`/${id}`}
        state={{
          id,
          profileImg,
          photo,
          username,
          post,
          createdTime,
          likedList,
          bookmarkedList,
        }}
      >
        <PostContainer>
          <Text>{post}</Text>
          {photo && <AttachedImg src={photo} />}
        </PostContainer>
      </Link>
      {isEdit ? (
        <EditForm
          userId={userId}
          postId={id}
          post={post}
          setIsEdit={setIsEdit}
        />
      ) : null}
      <Media id={id} bookmarkedList={bookmarkedList} likedList={likedList} />
    </List>
  );
}
