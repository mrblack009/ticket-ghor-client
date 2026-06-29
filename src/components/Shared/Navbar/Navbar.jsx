import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import NavbarDrawer from "./NavbarDrawer";
import useAuth from "../../../hooks/useAuth";
import UserMenu from "../UserMenu/UserMenu";

const Navbar = () => {
  const { user } = useAuth();

  const navLinks = (
    <>
      <NavLink
        className="hover:text-primary duration-300 transition-all ease-in-out"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="hover:text-primary duration-300 transition-all ease-in-out"
        to="/all-tickets"
      >
        All Tickets
      </NavLink>
    </>
  );

  // Home , All Tickets , Dashboard (private) → Login / Register (only when not logged in)

  return (
    <div className="w-full md:py-4">
      <div className="navbar">
        <div className="navbar-start">
          <NavbarDrawer navLinks={navLinks} />

          <Link className="hidden md:block" to="/">
            <Logo />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-lg gap-6">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end space-x-4">
          <Logo className="md:hidden" />
          {user ? (
            <UserMenu />
          ) : (
            <Link to="/login">
              <Button text="Login" className="hidden md:block" />
            </Link>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
