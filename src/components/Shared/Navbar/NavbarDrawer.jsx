import { CiMenuBurger } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import { NavLink } from "react-router";
import Logo from "../Logo/Logo";

const NavbarDrawer = ({ navLinks }) => {
  return (
    <div className="drawer drawer-end lg:hidden">
      <input
        id="my-drawer-5"
        type="checkbox"
        className="drawer-toggle"
      />

      {/* Drawer Button */}
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-5"
          className="btn btn-sm drawer-button"
        >
          <CiMenuBurger className="w-4 h-4" />
        </label>
      </div>

      {/* Drawer */}
      <div className="drawer-side fixed inset-0 z-[9999]">
        {/* Overlay */}
        <label
          htmlFor="my-drawer-5"
          aria-label="Close Sidebar"
          className="drawer-overlay bg-black/30 backdrop-blur-sm"
        ></label>

        {/* Sidebar */}
        <div className="w-72 min-h-full bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <Logo />

            <label
              htmlFor="my-drawer-5"
              className="btn btn-primary btn-sm"
            >
              <MdOutlineClose className="w-4 h-4" />
            </label>
          </div>

          {/* Menu */}
          <ul className="menu p-4 gap-2 text-base font-medium flex-1">
            {navLinks}

            <div className="divider my-2"></div>

            <li>
              <NavLink
                to="/register"
                className="hover:bg-primary hover:text-white duration-300"
              >
                Register
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                className="hover:bg-primary hover:text-white duration-300"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarDrawer;