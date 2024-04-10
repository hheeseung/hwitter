import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { TimelinePost, getMyPosts } from "../services/firebase";
import Post from "./Post";
import styled from "styled-components";

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
