import { User } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
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

  const selectedPosts = useMemo(() => {
    switch (location) {
      case "posts":
        return myPosts;
      case "likes":
        return myLikes;
      case "bookmarks":
        return myBookmarks;
      default:
        return [];
    }
  }, [location, myPosts, myLikes, myBookmarks]);

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
      <Posts>
        {selectedPosts.length > 0 &&
          selectedPosts.map((post) => <Post key={post.id} {...post} />)}
      </Posts>
    </>
  );
}
