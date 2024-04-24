import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { TimelinePost, getMyPosts, getPosts } from "../services/firebase";
import Post from "./Post";
import styled from "styled-components";

const Categories = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  width: 100%;
  font-size: 17px;
  font-weight: 600;
  padding: 15px;
  @media only screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const Category = styled.li<{ $location?: string }>`
  width: fit-content;
  text-align: center;
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.$location === props.id ? "2px solid #1877f2" : "none"};
`;

const Posts = styled.ul`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// const Empty = styled.p`
//   margin-top: 10px;
//   text-align: center;
// `;

export default function MyPost({ user }: { user: User }) {
  const [posts, setPosts] = useState<TimelinePost[]>([]);
  const [myPosts, setMyPosts] = useState<TimelinePost[]>([]);
  const [location, setLocation] = useState("posts");

  const myLikes = posts.filter((post) => post.likedList.includes(user.uid));
  const myBookmarks = posts.filter((post) =>
    post.bookmarkedList.includes(user.uid)
  );

  const onCategoryClick = (e: React.MouseEvent<HTMLElement>) => {
    const category = e.currentTarget.id;
    setLocation(category);
  };

  useEffect(() => {
    const unsubscribe = getPosts(setPosts);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getMyPosts({ user, setMyPosts });
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <>
      <Categories>
        <Category $location={location} onClick={onCategoryClick} id="posts">
          Posts
        </Category>
        <Category $location={location} onClick={onCategoryClick} id="likes">
          Likes
        </Category>
        <Category $location={location} onClick={onCategoryClick} id="bookmarks">
          Bookmarks
        </Category>
      </Categories>
      {/* 중복 코드에 대한 개선 필요!! */}
      {location === "posts" && myPosts.length !== 0 && (
        <Posts>
          {myPosts.map((myPost) => (
            <Post key={myPost.id} {...myPost} />
          ))}
        </Posts>
      )}
      {location === "likes" && myLikes.length !== 0 && (
        <Posts>
          {myLikes.map((like) => (
            <Post key={like.id} {...like} />
          ))}
        </Posts>
      )}
      {location === "bookmarks" && myBookmarks.length !== 0 && (
        <Posts>
          {myBookmarks.map((bookmark) => (
            <Post key={bookmark.id} {...bookmark} />
          ))}
        </Posts>
      )}
      {/* {myPosts.length === 0 ||
        myLikes.length === 0 ||
        (myBookmarks.length === 0 && <Empty>아직 게시물이 없습니다.</Empty>)} */}
    </>
  );
}
