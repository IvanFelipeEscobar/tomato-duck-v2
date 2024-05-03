import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

import Nav from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <Nav />
      <Outlet/>
      <ToastContainer/>
      <Footer/>
    </>
  );
}

export default App;
