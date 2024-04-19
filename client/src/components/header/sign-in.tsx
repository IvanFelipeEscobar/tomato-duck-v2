import { useAuth0 } from "@auth0/auth0-react";
import { IoLogIn } from "react-icons/io5";

const Signin = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  return isAuthenticated ? (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img alt="user avatar, drop down menu" src={user?.picture} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button onClick={() => logout()}>Logout</button>
        </li>
      </ul>
    </div>
  ) : isLoading ? (
    <span className="loading loading-spinner text-error"></span>
  ) : (
    <button className="btn btn-error btn-sm rounded-3xl text-base-100" onClick={() => loginWithRedirect()}>
     <span className="hidden sm:block"> Sign in</span> <IoLogIn />
    </button>
  );
};

export default Signin;
