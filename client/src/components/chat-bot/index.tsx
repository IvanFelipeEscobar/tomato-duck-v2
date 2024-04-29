import React, { useState } from "react";

import { askChatBot } from "../../lib/api";
import { BiArrowToTop } from "react-icons/bi";

interface Message {
  id: number;
  role: string;
  message: string;
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

  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState<Message[]>([
    {
      id: 1,
      role: "duck",
      message: getRandomWelcomeMessage(),
    },
  ]);

  const handleSubmitQuestion = async (event: React.FormEvent) => {
    event.preventDefault();

    if (question.trim() !== "") {
      setChatLog((chatlog) => [
        ...chatlog,
        { id: chatLog.length + 1, role: "tomato-user", message: question },
      ]);
      setQuestion("");
      try {
        const res = await askChatBot(question);
        if(res.status === 429 ) console.log(res);
        const duckResponse = await res.json();
        console.log(duckResponse);
        setChatLog((chatlog) => [
          ...chatlog,
          {
            id: chatLog.length + 1,
            role: "duck",
            message: duckResponse.content,
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="h-[275px] lg:h-[500px] shadow-2xl w-2/3 lg:max-w-5xl bg-base-200  bg-opacity-45 bg-no-repeat bg-center rounded-2xl lg:mr-12 overflow-auto scroll p-1 relative min-w-80">
        {chatLog.map((log) => (
          <div
            key={log.id}
            className={
              log.role === "duck" ? "chat chat-start" : "chat chat-end"
            }
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={log.role === "duck" ? "/duck.png" : ``}
                  className={log.role === "duck" ? "scale-x-[-1]" : ""}
                  alt="user avatar"
                />
              </div>
            </div>
            <div
              className={
                log.role === "duck"
                  ? "chat-bubble bg-warning"
                  : "chat-bubble bg-primary"
              }
            >
              {log.message}
            </div>
          </div>
        ))}
        <form
          onSubmit={handleSubmitQuestion}
          className="absolute bottom-2 right-10 join rounded-full"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your message..."
            className="input join-item "
          />
          <button type="submit" className="btn btn-info join-item">
            <BiArrowToTop size={24} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
