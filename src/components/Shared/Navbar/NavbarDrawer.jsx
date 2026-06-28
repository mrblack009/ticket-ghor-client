import { CiMenuBurger } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import { NavLink } from "react-router";
import Logo from "../Logo/Logo";

const NavbarDrawer = ({ navLinks }) => {
  return (
    <div className="drawer  drawer-end lg:hidden">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-5" className="btn drawer-button btn-sm">
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg> */}
          <CiMenuBurger className="h-4 w-4"/>
        </label>
      </div>
      <div className="drawer-side ">
        <div className="w-full h-full backdrop-blur-sm"></div>
        <ul className="w-2/3 h-full space-y-2 bg-white py-4">
          <li className="flex justify-between items-center px-4">
            <Logo />
            <label
              htmlFor="my-drawer-5"
              aria-label="close sidebar"
              className="btn btn-primary btn-sm"
            >
              <MdOutlineClose className="w-4 h-4"/>
            </label>
          </li>
          <span className="divider"></span>
          <ul className="px-4 flex flex-col gap-4 font-medium">
            {navLinks}
            </ul>
          <span className="divider"></span>
          <li className="">
            <NavLink
              className="block text-sm  px-4 font-medium hover:bg-secondary hover:text-white duration-300 py-1"
              to="/registeer"
            >
              Register
            </NavLink>
          </li>
          <li className="">
            <NavLink
              className="block text-sm px-4 font-medium hover:bg-secondary hover:text-white duration-300 py-1"
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarDrawer;
