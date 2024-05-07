import { Link } from "react-router-dom";
import Logo from "./logo";
import useAuthStore from "../../lib/authStore";
import useTaskStore, { initialState} from "../../lib/taskStore";
const Nav = () => {
  const { isAuthenticated, logOut } = useAuthStore();
  const { setUser } = useTaskStore();
  return (
    <div className="flex justify-between sm:mx-2">
      <Logo />
      {isAuthenticated ? (
        <div>
          <button className="btn sm:btn-sm btn-xs rounded-full btn-error my-4 sm:mr-2 text-base-200">
            <Link to="/user">User</Link>
          </button>
          <button className="btn sm:btn-sm btn-xs rounded-full btn-error my-4 text-base-200">
            <span
              onClick={async () => {
                setUser(initialState.currentUser)
                await logOut();
              }}
            >
              Log out
            </span>
          </button>
        </div>
      ) : (
        <button className="btn btn-sm rounded-full btn-error m-2 text-base-200">
          <Link to="/user/signup">Sign in</Link>
        </button>
      )}
    </div>
  );
};

export default Nav;
