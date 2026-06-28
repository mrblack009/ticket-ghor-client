import { Outlet } from "react-router";

import Footer from "../components/Shared/Footer/Footer";

import Header from "../components/Shared/Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
