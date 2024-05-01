import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

import Nav from "./components/header";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <Nav />
      <ToastContainer/>
      <Outlet />
      <Footer/>

    </>
  );
}

export default App;
