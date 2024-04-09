import styled from "styled-components";
import { auth, deletePost } from "../services/firebase";
import { Dispatch, SetStateAction } from "react";

type Props = {
  userId: string;
  postId: string;
  post: string;
  photo?: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const Menu = styled.ul`
  width: 200px;
  position: absolute;
  top: 10;
  right: 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 10px;
  background-color: white;
`;

const Item = styled.li`
  padding: 20px;
  &:hover {
    background-color: #eff4fc;
    border-radius: 10px;
  }
  &:last-child {
    color: #ff4154;
  }
`;

export default function PostManage({
  userId,
  postId,
  photo,
  setIsEdit,
}: Props) {
  const user = auth.currentUser;

  const onEdit = async () => {
    setIsEdit(true);
  };

  const onDelete = async () => {
    const ok = confirm("삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    await deletePost({ userId, id: postId, photo });
  };

  return (
    <>
      <Menu>
        <Item onClick={onEdit}>Edit</Item>
        <Item onClick={onDelete}>Delete</Item>
      </Menu>
    </>
  );
}
