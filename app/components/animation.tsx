"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CustomSvg from "./icon-human";
import { gsap } from "gsap";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const botResponses = [
  "Hello! How can I assist you today?",
  "That's an interesting question. Let me think about it.",
  "I'm here to help. What else would you like to know?",
  "I understand. Could you please provide more details?",
  "That's a great point! Here's what I think...",
];

gsap.registerPlugin(ScrollTrigger);

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = { id: Date.now(), text: input, isBot: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now(),
          text: botResponses[Math.floor(Math.random() * botResponses.length)],
          isBot: true,
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="absolute h-[76dvh] flex flex-col justify-end gap-6 sm:right-5 bottom-[50px] overflow-hidden lg:w-[20vw] sm:w-[40vw] px-6 sm:px-0 w-[100dvw] bg-transparent">
      <div
        ref={chatContainerRef}
        className="flex flex-col gap-6 hide-scrollbar overflow-y-auto"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 items-end message-box ${
              message.isBot ? "" : "justify-end"
            }`}
          >
            {message.isBot && (
              <div className="min-w-8 aspect-square">
                <Image
                  src="/w-fortune.png"
                  alt="Witch"
                  width={100}
                  height={100}
                  className="rounded-full w-8 aspect-square"
                />
              </div>
            )}
            <div
              className={message.isBot ? "botmsg text-sm" : "humanmsg text-sm"}
            >
              {message.isBot ? (
                message.text
              ) : (
                <span className="text-ellipsis"> {message.text}</span>
              )}
            </div>
            {!message.isBot && <CustomSvg className="min-w-8 aspect-square" />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          className="w-full txta outline-none p-4 text-sm hide-scrollbar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask fortune teller question..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        ></textarea>
        <button className="absolute right-3 bottom-4" onClick={handleSubmit}>
          <Image
            src="/send.png"
            alt="send"
            width={1000}
            height={1000}
            className="rounded-full relative w-4 aspect-square"
          />
        </button>
      </form>
    </div>
  );
}

export default Chat;
