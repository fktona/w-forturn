"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CustomSvg from "./icon-human";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const botResponses = [
  " I'm not sure I understand. Could you please rephrase that?",
  "That's an interesting question. Let me think about it.",
  "I'm here to help. What else would you like to know?",
  "I understand. Could you please provide more details?",
  "That's a great point! Here's what I think...",
];

gsap.registerPlugin(ScrollTrigger);

const firstMessage: Message = {
  id: Date.now(),
  text: `Welcome, seeker, to my lair of fate and whispers. The winds have brought you here, and the answers you seek lie in the realm of the unknown.
Speak your question, and let the fates guide my wisdom to you`,
  isBot: true,
};

function Chat() {
  const [messages, setMessages] = useState<Message[]>([firstMessage]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const fadeOutMessages = () => {
      const messageBoxes = Array.from(
        container.getElementsByClassName("message-box")
      ) as HTMLDivElement[];

      messageBoxes.forEach((box, index) => {
        const boxRect = box.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const distanceFromTop = boxRect.top - containerRect.top;

        // Adjust fade based on distance

        const fadeThreshold = 100; // Distance in pixels to start fading
        const fadeDistance = 50; // Range over which fading occurs

        const opacity =
          distanceFromTop < fadeThreshold && messages.length > 4
            ? Math.max(
                0.1,
                1 - (fadeThreshold - distanceFromTop) / fadeDistance
              )
            : 1;

        gsap.to(box, { opacity, duration: 0.2 });
      });
    };

    const observer = new ResizeObserver(fadeOutMessages);
    observer.observe(container);

    container.addEventListener("scroll", fadeOutMessages);
    fadeOutMessages();

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", fadeOutMessages);
    };
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = { id: Date.now(), text: input, isBot: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      try {
        const response = await fetch(
          "https://fortunebot-6dmf.onrender.com/fortune-bot/fortune",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: input }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const botResponse: Message = {
            id: Date.now(),
            text: data.reply,
            isBot: true,
          };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        } else {
          const errorResponse: Message = {
            id: Date.now(),
            text: "Something went wrong. Please try again.",
            isBot: true,
          };
          setMessages((prevMessages) => [...prevMessages, errorResponse]);
        }
      } catch (error) {
        const errorResponse: Message = {
          id: Date.now(),
          text: "Network error. Please check your connection and try again.",
          isBot: true,
        };
        setMessages((prevMessages) => [...prevMessages, errorResponse]);
      }
    }
  };
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const messageBoxes = gsap.utils.toArray(".message-box");

    messageBoxes.forEach((box) => {
      const element = box as HTMLDivElement;

      gsap.to(element, {
        opacity: 0,
        scrollTrigger: {
          trigger: element,
          containerAnimation: gsap.to(container, {
            scrollTop: container.scrollHeight - container.clientHeight,
          }),
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    });
  }, [messages]);

  return (
    <div className="absolute h-[85dvh] flex flex-col justify-end gap-6 sm:right-5 bottom-[50px] overflow-hidden lg:w-[20vw] sm:w-[40vw] px-6 sm:px-0 w-[100dvw] bg-transparent">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 150 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
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
        <div ref={lastMessageRef} />
      </motion.div>
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          className="w-full txta outline-none p-4 text-sm hide-scrollbar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Have your fortune read..."
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
