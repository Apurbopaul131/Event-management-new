import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const Navbar = () => {
  const { token, logout, user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const AppRoutes = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Add Events", path: "/add-events" },
    { name: "My Events", path: "/my-events" },
  ];
  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    navigate("/")
  }
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start ml-8">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {AppRoutes.map((route, index) => (
              <li key={index}>
                <Link to={route?.path}>{route?.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-3xl font-bold">Event</h2>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {AppRoutes.map((route, index) => (
            <li key={index}>
              <Link to={route?.path}>{route?.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end mr-8">
        {token ? <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li className="mb-2">
              <h3 className="text-xl font-semibold">{user?.email}</h3>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </li>
          </ul>
        </div> : <Link to="/login" className="btn btn-primary">Login</Link>}
        
      </div>
    </div>
  );
};

export default Navbar;
