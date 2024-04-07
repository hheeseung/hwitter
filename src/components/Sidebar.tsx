import styled from "styled-components";
import { auth, logout } from "../services/firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.aside`
  width: 25%;
  margin-right: 20px;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const ProfileIcon = styled.svg`
  width: 45px;
  padding: 5px;
  fill: #1877f2;
  background-color: #eff4fc;
  border-radius: 10px;
  margin-right: 10px;
`;

const ProfileImg = styled.img`
  width: 45px;
  margin-right: 5px;
  border-radius: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  margin-bottom: 5px;
  font-weight: 600;
`;

const UserId = styled.span`
  font-size: small;
  color: gray;
`;

const Navbar = styled.ul`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e6e6e6;
  &:nth-child(4) {
    border-bottom: none;
  }
  &:hover {
    border-radius: 10px;
    background-color: #eff4fc;
    color: #1877f2;
    transition: all ease-in 0.1s;
    cursor: pointer;
  }
`;

const Icon = styled.svg`
  width: 25px;
  margin-right: 10px;
  color: slategray;
`;

const Title = styled.span`
  font-weight: 600;
  color: ${(props) => props.color || "slategray"};
`;

const LogoutIcon = styled.svg`
  width: 25px;
  margin-right: 10px;
  color: #ff4154;
`;

const Logout = styled.span`
  font-weight: 600;
  color: #ff4154;
`;

export default function Sidebar() {
  const user = auth.currentUser;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onLogOut = () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      logout();
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <ProfileCard>
        {user && user.photoURL ? (
          <ProfileImg src={user.photoURL} alt="profile" />
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
        <UserInfo>
          <Username>{user?.displayName}</Username>
          <UserId>{user?.email}</UserId>
        </UserInfo>
      </ProfileCard>
      <Navbar>
        <Link to="/">
          <NavItem>
            <Icon
              fill="none"
              strokeWidth={1.5}
              stroke={pathname === "/" ? "#1877f2" : "slategray"}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </Icon>
            <Title color={pathname === "/" ? "#1877f2" : undefined}>Home</Title>
          </NavItem>
        </Link>
        <NavItem>
          <Icon
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </Icon>
          <Title>Photos</Title>
        </NavItem>
        <Link to="/profile">
          <NavItem>
            <Icon
              fill="none"
              strokeWidth={1.5}
              stroke={pathname === "/profile" ? "#1877f2" : "slategray"}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </Icon>
            <Title color={pathname === "/profile" ? "#1877f2" : undefined}>
              Profile
            </Title>
          </NavItem>
        </Link>
        <NavItem onClick={onLogOut}>
          <LogoutIcon
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </LogoutIcon>
          <Logout>Logout</Logout>
        </NavItem>
      </Navbar>
    </Wrapper>
  );
}
