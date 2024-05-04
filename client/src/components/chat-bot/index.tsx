import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { askChatBot } from "../../lib/api";
import { BiArrowToTop } from "react-icons/bi";

interface Message {
  id: string;
  role: string;
  message: string;
  time: string;
}
const ChatBot = () => {
  const welcomeMessages: string[] = [
    "Hi there! I'm your friendly chatbot duck. How can I assist you today?",
    "Quack quack! Welcome to the chat. I'm here to help you with anything you need.",
    "Hello! I'm a duck with a mission to assist. What can I do for you?",
    "Greetings! I'm here to answer your questions and provide assistance.",
    "Welcome, human friend! I'm a duck on a mission to help. How can I assist you today?",
    "Quack! Welcome to the duck's chat room. How can I be of service?",
    "Hey there! I'm a helpful duck ready to assist you. What can I do for you today?",
    "Greetings, traveler! I'm your trusty duck companion here to lend a wing.",
    "Hello! I'm a duck-bot programmed to provide assistance. How may I help you?",
    "Quack quack! Welcome to the pond of knowledge. How can I assist you today?",
  ];

  const getRandomWelcomeMessage = (): string => {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    return welcomeMessages[randomIndex];
  };

  const currentTime = new Date().toLocaleString();
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState<Message[]>(() => {
    const storedChatLog = localStorage.getItem("chat");
    return storedChatLog ? JSON.parse(storedChatLog) :[
    {
      id: uuidv4() + "duck-welcome",
      role: "duck",
      message: getRandomWelcomeMessage(),
      time: currentTime,
    },
  ]});
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem("chat", JSON.stringify(chatLog));
  }, [chatLog]);
  const handleSubmitQuestion = async (event: React.FormEvent) => {
    event.preventDefault();

    if (question.trim() !== "") {
      setChatLog((chatlog) => [
        ...chatlog,
        {
          id: uuidv4() + "user",
          role: "tomato-user",
          message: question,
          time: currentTime,
        },
      ]);
      setQuestion("");
      try {
        const res = await askChatBot(question);
        if (res.status === 429) {
          setChatLog((chatlog) => [
            ...chatlog,
            {
              id: uuidv4() + "duck-requestlimit",
              role: "duck",
              message:
                "Sorry, the max number of request has been reached. Try again in 5 minutes",
              time: currentTime,
            },
          ]);
        }
        const duckResponse = await res.json();
        console.log(duckResponse);
        setChatLog((chatlog) => [
          ...chatlog,
          {
            id: uuidv4() + "duck",
            role: "duck",
            message: duckResponse.content,
            time: currentTime,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center relative">
      <div className="absolute top-9 italic font-serif right-20 hidden text-base-200 sm:block">Quack Your Way to Solutions with Duck-GPT</div>
      <div className="text-3xl italic py-2 ml-5 font-mono">Duck-Gpt</div>
      <div className="max-h-[275px] lg:max-h-[500px] shadow-2xl w-2/3 max-w-3xl bg-base-200  bg-opacity-45 bg-no-repeat bg-center rounded-2xl lg:mr-12 overflow-auto scroll p-1 relative min-w-80 border-2">
        {chatLog.map((log) => (
          <div
            key={log.id}
            className={
              log.role === "duck" ? "chat chat-start" : "chat chat-end"
            }
          >
            <div className="chat-header">
              {log.role === "duck" ? "Quack-bot" : "User"}
              <time className="text-xs opacity-50 pl-4">{log.time}</time>
            </div>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={log.role === "duck" ? "/duck.png" : `tomato-24.svg`}
                  className={log.role === "duck" ? "scale-x-[-1]" : ""}
                  alt="user avatar"
                />
              </div>
            </div>
            <div
              className={
                log.role === "duck"
                  ? "chat-bubble bg-neutral"
                  : "chat-bubble bg-primary"
              }
            >
              {log.message}
            </div>
          </div>
        ))}

        <div ref={chatEndRef}></div>
      </div>
      <form onSubmit={handleSubmitQuestion} className="join rounded-xl">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your message..."
          className="input join-item "
        />
        <button type="submit" className="btn btn-primary join-item">
          <BiArrowToTop size={24} />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
