"use client";

import React, { useState, useRef, useEffect } from "react";
import CustomSvg from "./icon-human";
import { AnimatedText2 } from "./animation";
import Image from "next/image";

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

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const options = {
      root: chatContainerRef.current,
      rootMargin: "0px",
      threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Generate 0.01 to 1 thresholds
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target instanceof HTMLElement) {
          // Adjust opacity based on visibility
          const opacity = Math.max(0.25, entry.intersectionRatio); // Min opacity of 0.25
          entry.target.style.opacity = opacity.toString();
        }
      });
    }, options);

    const messageElements =
      chatContainerRef.current?.querySelectorAll(".message-box");
    messageElements?.forEach((el) => observer.observe(el));

    return () => {
      messageElements?.forEach((el) => observer.unobserve(el));
    };
  }, [messages]);

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

  return (
    <div className="absolute h-[76dvh] flex flex-col justify-end gap-6 sm:right-5 bottom-5 overflow-hidden lg:w-[20vw] sm:w-[40vw] px-6 sm:px-0 w-[100dvw] bg-transparent">
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
                <AnimatedText2 text={message.text} />
              ) : (
                <span className="text-ellipsis"> {message.text}</span>
              )}
            </div>
            {!message.isBot && <CustomSvg className="min-w-8 aspect-square" />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full txta outline-none p-4 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        ></textarea>
      </form>
    </div>
  );
}

export default Chat;
