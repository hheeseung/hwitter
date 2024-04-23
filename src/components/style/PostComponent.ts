import styled from "styled-components";

export const List = styled.li`
  width: 100%;
  background-color: white;
  padding: 20px 20px 0 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  list-style: none;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 10px;
`;

export const UserIcon = styled.svg`
  width: 50px;
  padding: 5px;
  fill: #1877f2;
  background-color: #eff4fc;
  border-radius: 10px;
`;

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Username = styled.span`
  font-weight: 600;
`;

export const CreatedTime = styled.span`
  margin-top: 5px;
  font-size: small;
  color: gray;
`;

export const Dropdown = styled.div`
  position: relative;
  cursor: pointer;
`;

export const DropdownIcon = styled.svg`
  width: 30px;
  color: gray;
`;

export const PostContainer = styled.div`
  margin-bottom: 20px;
`;

export const Text = styled.p`
  margin-bottom: 20px;
  line-height: 1.3;
`;

export const AttachedImg = styled.img`
  width: 100%;
  border-radius: 10px;
`;
