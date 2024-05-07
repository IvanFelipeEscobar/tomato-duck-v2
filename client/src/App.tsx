import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

import Nav from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useAuthStore from "./lib/authStore";
import useTaskStore from "./lib/taskStore";

function App() {
  const { checkLoggedIn, user, getUser, isAuthenticated } = useAuthStore();
  const { setUser } = useTaskStore();
  useEffect(() => {
    checkLoggedIn();
    if (isAuthenticated && user === null) {
      getUser();
    }
    if (isAuthenticated && user !== null) setUser(user);

    if (!isAuthenticated)
      setUser({
        _id: "00001",
        email: "guest",
        userName: "guest",
        sessions: [{ _id: "0001", tasks: [] }],
      });
  }, [checkLoggedIn, getUser, isAuthenticated, user, setUser]);
  return (
    <>
      <Nav />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
