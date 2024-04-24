import { useEffect, useState } from "react";
import { getComments } from "../services/firebase";
import styled from "styled-components";
import Comment from "./Comment";

export type Comments = {
  id: string;
  comment: string;
  createdAt: number;
  username: string;
  userId: string;
  profileImg: string;
  likes: string[];
};

const Comments = styled.ul``;

const Title = styled.h1`
  margin-top: 15px;
  padding: 15px 5px;
  font-size: large;
  font-weight: 600;
`;

export default function CommentsList({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    const unsubscribe = getComments(postId, setComments);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Comments>
      <Title>{comments.length} Comments</Title>
      {comments.map((comment) => (
        <Comment key={comment.id} postId={postId} {...comment} />
      ))}
    </Comments>
  );
}
