import { useState } from "react";
import styled from "styled-components";
import {
  addBookmarks,
  addLikes,
  auth,
  removeBookmarks,
  removeLikes,
} from "../services/firebase";

type MediaProps = {
  id: string;
  bookmarkedList: string[];
  likedList: string[];
};

const MediaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  padding: 20px 0;
  border-top: 1px solid #e9e9e9;
`;

const Liked = styled.div`
  display: flex;
  align-items: center;
`;

const LikedCount = styled.span`
  margin-left: 2px;
  font-size: 15px;
`;

const MediaIcon = styled.svg`
  width: 25px;
  color: slategray;
  cursor: pointer;
`;

export default function Media({ id, bookmarkedList, likedList }: MediaProps) {
  const user = auth.currentUser!.uid;
  const [isLike, setIsLike] = useState(
    !!likedList.find((item) => item === user)
  );
  const [isBookmarked, setIsBookmarked] = useState(
    !!bookmarkedList.find((item) => item === user)
  );

  const onLikeClick = async () => {
    setIsLike((curr) => {
      const newLikeState = !curr;
      if (newLikeState) {
        addLikes({ id, userId: user });
      } else {
        removeLikes({ id, userId: user });
      }
      return newLikeState;
    });
  };

  const onBookmarkClick = async () => {
    setIsBookmarked((curr) => {
      const newBookmarkState = !curr;
      if (newBookmarkState) {
        addBookmarks({ id, userId: user });
      } else {
        removeBookmarks({ id, userId: user });
      }
      return newBookmarkState;
    });
  };

  return (
    <MediaContainer>
      <MediaIcon
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
      </MediaIcon>
      {isLike ? (
        <Liked>
          <MediaIcon
            onClick={onLikeClick}
            fill="#ff4154"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </MediaIcon>
          <LikedCount>{likedList?.length}</LikedCount>
        </Liked>
      ) : (
        <Liked>
          <MediaIcon
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
          </MediaIcon>
          <LikedCount>{likedList?.length}</LikedCount>
        </Liked>
      )}
      {isBookmarked ? (
        <MediaIcon
          onClick={onBookmarkClick}
          fill="#1877f2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </MediaIcon>
      ) : (
        <MediaIcon
          onClick={onBookmarkClick}
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
        </MediaIcon>
      )}
      <MediaIcon
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
      </MediaIcon>
    </MediaContainer>
  );
}
