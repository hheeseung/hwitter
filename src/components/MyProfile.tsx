import { useState } from "react";
import styled from "styled-components";
import { updateUserProfile } from "../services/firebase";
import { User } from "firebase/auth";

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
`;

const ProfileUpload = styled.label`
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const ProfileIcon = styled.svg`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 50%;
  background-color: white;
  color: #1877f2;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const ProfileInput = styled.input`
  display: none;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UsernameForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Username = styled.input`
  width: 60%;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 15px;
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  border-radius: 5px;
  margin-right: 5px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`;

const SubmitButton = styled.input`
  border: none;
  outline: none;
  background-color: #1877f2;
  color: white;
  padding: 8px;
  border-radius: 5px;
  font-size: 15px;
  font-family: "Pretendard", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
`;

const Alert = styled.p`
  font-weight: 600;
  color: #1877f2;
  margin: 10px 0;
`;

const UserEmail = styled.span`
  color: slategray;
  font-size: 15px;
`;

export default function MyProfile({ user }: { user: User | null }) {
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [newUsername, setNewUsername] = useState(user?.displayName);
  const [showAlert, setShowAlert] = useState(true);
  const [alert, setAlert] = useState<string | null>(null);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      if (files[0].size > 1024 ** 2) {
        window.alert("첨부파일 용량은 1MB 미만의 파일만 가능합니다.");
        return;
      }
      await updateUserProfile({ user, files, setAvatar });
    }
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !newUsername) return;
    try {
      await updateUserProfile({ user, newUsername });
      setAlert("닉네임이 변경되었습니다.");
      setTimeout(() => {
        setShowAlert(true);
        setAlert(null);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserProfile>
      <ProfileUpload htmlFor="avatar">
        {avatar ? (
          <ProfileImg src={avatar} />
        ) : (
          <ProfileIcon
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
          </ProfileIcon>
        )}
      </ProfileUpload>
      <ProfileInput
        id="avatar"
        onChange={onAvatarChange}
        type="file"
        accept="image/*"
      />
      <Metadata>
        <UsernameForm onSubmit={onSubmit}>
          <Username
            type="text"
            onChange={onUsernameChange}
            value={newUsername ?? "Anonymous"}
          />
          <SubmitButton type="submit" value="Save" />
        </UsernameForm>
        {showAlert && <Alert>{alert}</Alert>}
        <UserEmail>{user?.email}</UserEmail>
      </Metadata>
    </UserProfile>
  );
}
