const url = "http://localhost:3001/";

export const fetchUser = async (email: string) =>
  await fetch(`${url}api/user?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addNewUser = async (email: string) =>
  await fetch(`${url}api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

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
 export const askChatBot = async (prompt: string) => 
  await fetch(`${url}api/chatbot`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({prompt})
  })
 