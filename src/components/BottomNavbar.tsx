import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, logout } from "../services/firebase";

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #dddddd;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const Navbar = styled.ul`
  width: 100%;
  height: 100%;
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  background-color: white;
  opacity: 0.9;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const NavItem = styled.li`
  width: 25%;
  cursor: pointer;
`;

const Icon = styled.svg`
  width: 30px;
  color: slategray;
`;

const LogoutIcon = styled.svg`
  width: 30px;
  color: #ff4154;
`;

const ProfileImg = styled.img<{ $outlineborder: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  outline: ${(props) => props.$outlineborder};
  padding: 2px;
`;

export default function BottomNavbar() {
  const user = auth.currentUser!;
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
          </NavItem>
        </Link>
        <Link to="/photos">
          <NavItem>
            <Icon
              fill="none"
              strokeWidth={1.5}
              stroke={pathname === "/photos" ? "#1877f2" : "slategray"}
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
          </NavItem>
        </Link>
        <Link to="/profile">
          <NavItem>
            {user.photoURL !== null ? (
              pathname === "/profile" ? (
                <ProfileImg
                  src={user.photoURL}
                  $outlineborder="1px solid #1877f2"
                />
              ) : (
                <ProfileImg
                  src={user.photoURL}
                  $outlineborder="1px solid #e9e9e9"
                />
              )
            ) : (
              <Icon
                fill={pathname === "/profile" ? "#1877f2" : "slategray"}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </Icon>
            )}
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
        </NavItem>
      </Navbar>
    </Wrapper>
  );
}
