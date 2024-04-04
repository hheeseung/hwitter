import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 4fr;
  padding: 20px 0;
`;

export default function Layout() {
  return (
    <>
      <Header />
      <Section>
        <Sidebar />
        <Outlet />
      </Section>
    </>
  );
}
