import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";

const Layout = () => (
  <>
    <NavBar />
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
