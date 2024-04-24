import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { IoLogIn } from "react-icons/io5";
import { addNewUser, fetchUser } from "../../lib/api";
import useTaskStore, { initialState } from "../../lib/taskStore";

const Signin = () => {
  const { setUser } = useTaskStore();
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  useEffect(() => {
    const fetchFunction = async () => {
      if (isAuthenticated && user && user.email) {
        const { email } = user;
        try {
          const res = await fetchUser(email);
          if (res.status === 404) {
            try {
              const res = await addNewUser(email);
              const newUser = await res.json();
              setUser(newUser);
              return;
            } catch (error) {
              console.error(error);
            }
          }
          const user = await res.json();
          setUser(user);
          console.log(user);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchFunction();
  }, [isAuthenticated]);
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
          <button
            onClick={() => {
              setUser(initialState.user);
              logout();
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  ) : isLoading ? (
    <span className="loading loading-spinner text-error"></span>
  ) : (
    <button
      className="btn btn-error btn-sm rounded-3xl text-base-100 my-2"
      onClick={async() => {
        await loginWithRedirect();
        
      
      
      }}
    >
      <span className="hidden sm:block"> Sign in</span> <IoLogIn />
    </button>
  );
};

export default Signin;
