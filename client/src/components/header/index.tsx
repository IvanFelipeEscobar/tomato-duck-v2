import { Link } from "react-router-dom";
import Logo from "./logo";

const Nav = () => {
  return (
    <div className="flex justify-between mx-2 mt-1">
      <Logo />
        <button className="btn btn-sm rounded-full btn-error m-2 text-base-200">
          <Link to='/signup'>sign in</Link>
        </button>
    </div>
  );
};

export default Nav;
