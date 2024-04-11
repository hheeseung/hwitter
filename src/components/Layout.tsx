import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Social from "./Social";
import BottomNavbar from "./BottomNavbar";

const Section = styled.section`
  display: flex;
  padding: 20px 0;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function Layout() {
  return (
    <>
      <Header />
      <Section>
        <Sidebar />
        <Outlet />
        <Social />
        <BottomNavbar />
      </Section>
    </>
  );
}
