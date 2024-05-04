import { Outlet } from "react-router-dom";

const UserAuth = () => {
  return (
  <div className="min-h-[calc(100vh-108px)] bg-error">
<Outlet/>
  </div>
  );
};

export default UserAuth;
