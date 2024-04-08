/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { TimelinePost, getMyPosts } from "../services/firebase";
import Post from "./Post";
import styled from "styled-components";

const Posts = styled.ul`
  width: 100%;
`;

export default function MyPost({ user }: { user: User }) {
  const [posts, setPosts] = useState<TimelinePost[]>([]);

  const fetchMyPosts = async () => {
    const posts = await getMyPosts({ user });
    setPosts(posts);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <Posts>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Posts>
  );
}
