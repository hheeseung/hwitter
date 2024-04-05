import { useEffect, useState } from "react";
import { TimelinePost, getPosts } from "../services/firebase";
import Post from "./Post";
import styled from "styled-components";

const Wrapper = styled.ul`
  margin-top: 10px;
`;

export default function Timeline() {
  const [posts, setPosts] = useState<TimelinePost[]>([]);

  useEffect(() => {
    const unsubscribe = getPosts(setPosts);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Wrapper>
  );
}
