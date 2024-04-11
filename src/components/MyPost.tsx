import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { TimelinePost, getMyPosts } from "../services/firebase";
import Post from "./Post";
import styled from "styled-components";

const MyPosts = styled.ul`
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
`;

const Category = styled.li`
  width: fit-content;
  padding: 5px 0;
  border-bottom: 3px solid #1877f2;
  cursor: pointer;
`;

const Posts = styled.ul`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Empty = styled.p`
  text-align: center;
`;

export default function MyPost({ user }: { user: User }) {
  const [posts, setPosts] = useState<TimelinePost[]>([]);

  useEffect(() => {
    const unsubscribe = getMyPosts({ user, setPosts });
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <>
      <MyPosts>
        <Category>My Posts</Category>
      </MyPosts>
      {posts.length !== 0 ? (
        <Posts>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </Posts>
      ) : (
        <Empty>아직 작성된 포스트가 없습니다.</Empty>
      )}
    </>
  );
}
