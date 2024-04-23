import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  AttachedImg,
  CreatedTime,
  Metadata,
  PostContainer,
  Text,
  UserAvatar,
  UserContainer,
  UserIcon,
  UserInfo,
  Username,
} from "../components/style/PostComponent";
import CommentsForm from "../components/CommentsForm";
import CommentsList from "../components/CommentsList";

const Wrapper = styled.section`
  width: 50%;
  margin-bottom: 80px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0 15px;
  }
`;

const DetailContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const LikeAndComments = styled.div`
  display: flex;
  align-items: center;
  font-size: small;
  color: slategray;
`;

const TotalLikes = styled.span``;

const TotalBookmarks = styled.span``;

export default function Detail() {
  const {
    state: {
      id,
      profileImg,
      photo,
      username,
      post,
      createdTime,
      likedList,
      bookmarkedList,
    },
  } = useLocation();

  return (
    <Wrapper>
      <DetailContainer>
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
        </UserContainer>
        <PostContainer>
          <Text>{post}</Text>
          {photo && <AttachedImg src={photo} />}
        </PostContainer>
        <LikeAndComments>
          <TotalLikes>{likedList.length} likes&nbsp;·</TotalLikes>
          <TotalBookmarks>
            &nbsp;{bookmarkedList.length} bookmarks
          </TotalBookmarks>
        </LikeAndComments>
      </DetailContainer>
      <CommentsForm id={id} />
      <CommentsList postId={id} />
    </Wrapper>
  );
}
