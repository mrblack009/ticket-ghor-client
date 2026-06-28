import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import NavbarDrawer from "./NavbarDrawer";

const Navbar = () => {
    const navLinks = <>
        <NavLink className="hover:text-primary duration-300 transition-all ease-in-out" to="/">Home</NavLink>
        <NavLink className="hover:text-primary duration-300 transition-all ease-in-out" to="/all-tickets">All Tickets</NavLink>
    </>

    // Home , All Tickets , Dashboard (private) → Login / Register (only when not logged in)

  return (
    <div className="max-lg:collapse w-full md:py-4">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>
      <div className="collapse-title navbar">
        <div className="navbar-start">
          <NavbarDrawer navLinks={navLinks}/>
          <Link className="hidden md:block" to="/">
            <Logo/>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-lg gap-6">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <Button text="Login" className="hidden md:block"/>
          <Logo className="md:hidden"/>
        </div>
      </div>

      <div className="collapse-content lg:hidden z-1">
        <ul className="menu">
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
