import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import Nav from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useAuthStore from "./lib/authStore";

function App() {
  const { checkLoggedIn, user, getUser, isAuthenticated } = useAuthStore();
  useEffect(() => {
    checkLoggedIn();
    if (isAuthenticated && user === null) {
      getUser();
    }
  }, [checkLoggedIn, getUser, isAuthenticated, user]);

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
