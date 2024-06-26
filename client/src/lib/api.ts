const url: string =
  process.env.NODE_ENV === "production"
    ? "https://tomato-duck-v2.onrender.com/"
    : "http://localhost:3001/";
// ------- User stuff ------------------------
export const fetchUser = async () =>
  await fetch(`${url}api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:'include'
  });

export const addNewUser = async (
  userName: string,
  email: string,
  password: string
) =>
  await fetch(`${url}api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({ userName, email, password }),
  });

export const logInUser = async (email: string, password: string) =>
  await fetch(`${url}api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({ email, password }),
  });

export const loginStatus = async () =>
  await fetch(`${url}api/login`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

  });

export const logOutUser = async () =>
  await fetch(`${url}api/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  });

export const sendVerifyEmail = async () =>
  await fetch(`${url}api/sendVerifyEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

export const verifyAccount = async (verificationToken: string) =>
  await fetch(`${url}api/verify/${verificationToken}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
export const sendResetPassword = async (email: string) =>
  await fetch(`${url}api/forgotpassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
export const resetPassword = async (resetToken: string, password: string) =>
  await fetch(`${url}api/resetpassword/${resetToken}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  export const changePassword = async (oldPassword: string, newPassword: string) =>
    await fetch(`${url}api/changepassword`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify( {oldPassword, newPassword})
    })
//------------------- Task/Session Stuff
export const addNewSession = async (userId: string) =>
  await fetch(`${url}api/${userId}/session`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteOneSession = async (userId: string, sessionId: string) =>
  await fetch(`${url}api/${userId}/${sessionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addNewTask = async (sessionId: string, task: string) =>
  await fetch(`${url}api/${sessionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });

export const toggleTaskStatus = async (sessionId: string, taskId: string) =>
  await fetch(`${url}api/${sessionId}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteOneTask = async (sessionId: string, taskId: string) =>
  await fetch(`${url}api/${sessionId}/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

// ------------ chat bot --------------------------------

export const askChatBot = async (prompt: string) =>
  await fetch(`${url}api/chatbot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
