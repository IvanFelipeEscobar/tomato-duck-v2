import { Link } from "react-router-dom";
import Logo from "./logo";
import useAuthStore from "../../lib/authStore";

const Nav = () => {
  const { isAuthenticated, logOut } = useAuthStore();
  return (
    <div className="flex justify-between mx-2 mt-1">
      <Logo />
      <button className="btn btn-sm rounded-full btn-error m-2 text-base-200">
        {isAuthenticated ? (
          <span onClick={async () => await logOut()}>Log out</span>
        ) : (
          <Link to="/user/signup">sign in</Link>
        )}
      </button>
    </div>
  );
};

export default Nav;
