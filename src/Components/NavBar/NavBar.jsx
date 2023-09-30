import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 py-5">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Email LogIn Validation</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-2 md:space-x-3 lg:space-x-5 py-2">
          <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active text-red-600 bg-sky-300 underline" : ""
            }
          >
            Home
          </NavLink>
          </li>
          <li>
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active text-red-600 bg-sky-300 underline" : ""
            }
          >
            LogIn
          </NavLink>
          </li>
          <li>
          <NavLink
            to="/registration"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active text-red-600 bg-sky-300 underline" : ""
            }
          >
            Registration
          </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
