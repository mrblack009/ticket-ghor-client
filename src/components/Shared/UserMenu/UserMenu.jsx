import { FaRegUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const UserMenu = () => {
  const { logOut, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content"
      >
        <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2 overflow-hidden flex items-center justify-center">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user?.displayName || "User avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle className="w-8 h-8 text-primary hover:text-secondary bg-transparent" />
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 border border-primary/20 rounded-box z-10 mt-3 w-56 p-2 shadow-xl"
      >
        <li>
          <button className="hover:bg-primary hover:text-primary-content">
            Profile
          </button>
        </li>

        <li>
          <button className="hover:bg-secondary hover:text-secondary-content">
            Settings
          </button>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="text-error hover:bg-error hover:text-error-content"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;