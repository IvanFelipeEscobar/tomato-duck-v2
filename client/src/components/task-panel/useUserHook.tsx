import { useEffect } from "react";
import { loginStatus } from "../../lib/api";
import useTaskStore from "../../lib/taskStore";
import useAuthStore from "../../lib/authStore";

const useUserHook = () => {
  const {user} = useAuthStore();
const {setUser} = useTaskStore()
    useEffect(() => {
        let isLog: boolean;
    
        const assignUser = async () => {
          try {
            const res = await loginStatus();
           isLog = await res.json();
          } catch (error) {
            console.log(error);
          }
          if (isLog && user) {
            setUser(user)
          } else {
            setUser({
              _id: "00001",
              email: "guest",
              userName: "guest",
              sessions: [{ _id: "0001", tasks: [] }],
            })
          }
        };
       assignUser();
      }, [setUser, user])
}

export default useUserHook