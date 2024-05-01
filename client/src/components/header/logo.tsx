import { Link } from "react-router-dom";

const Logo = () => {
  return (<Link to='/'>
    <div className=" flex flex-row items-center relative">
      <img src="/tomato-24.svg" alt="tomato" className="w-10" />
      <div className="text-error text-xl font-bold font-serif tracking-widest">
        Tomato Duck
      </div>
      <div className="badge badge-error badge-xs text-base-100">v2</div>
      <p className="italic text-xs absolute top-[30px] left-24">... this time it's tomato</p>
    </div></Link>
  );
};

export default Logo;
