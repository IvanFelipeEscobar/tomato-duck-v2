import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "../../lib/api";
import { toast } from "react-toastify";

const AuthHook = () => {
  const nav = useNavigate();

  useEffect(() => {
    let isLog: boolean;

    const redirectOnLogout = async () => {
      try {
        const res = await loginStatus();
        isLog = await res.json();
      } catch (error) {
        console.log(error);
      }
      if (!isLog) {
        toast.info("session expired, please log in");
        nav("/");
        return;
      }
    };
    redirectOnLogout();
  }, [nav]);
};

export default AuthHook;
