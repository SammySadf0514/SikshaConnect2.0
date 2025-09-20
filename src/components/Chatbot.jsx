import React, { useEffect, useRef, useState } from "react";

export default function Chatbot() {
  // Chat window → always starts closed
  const [open, setOpen] = useState(false);

  // Messages → reset every reload (no localStorage)
  const [messages, setMessages] = useState([
    {
      id: "b0",
      from: "bot",
      text: "Hi 👋 I'm SikshaBot! Ask me about courses, enrollment, or instructors.",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages, typing]);

  function send(text) {
    if (!text.trim()) return;
    const userMsg = { id: "u" + Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg].slice(-50));
    setInput("");
    respond(text);
  }

  function getCoursesFromDOM() {
    const nodes = Array.from(document.querySelectorAll("[data-course-title]"));
    return nodes.length
      ? `We offer: ${nodes
          .map((n) => n.getAttribute("data-course-title"))
          .join(", ")}`
      : "We have many exciting courses. Check the Courses page!";
  }

  function getTeamFromDOM() {
    const names = Array.from(document.querySelectorAll("[data-team-name]"));
    return names.length
      ? `Our instructors include: ${names
          .map((n) => n.getAttribute("data-team-name"))
          .join(", ")}`
      : "You can view instructors on the About page.";
  }

  function respond(text) {
    setTyping(true);
    setTimeout(() => {
      const q = text.toLowerCase();
      let reply =
        "Hmm 🤔 I'm not sure. Try asking about courses, enrollment, or instructors.";

      if (q.includes("hello") || q.includes("hi"))
        reply = "Hello 👋! How can I help you today?";
      else if (q.includes("thank")) reply = "You're welcome! 😊";
      else if (q.includes("help"))
        reply =
          "You can ask me about 📚 Courses, 👩‍🏫 Instructors, or 📝 Enrollment.";
      else if (q.includes("course")) reply = getCoursesFromDOM();
      else if (q.includes("enroll"))
        reply =
          "Steps to enroll: 1️⃣ Go to Courses → 2️⃣ Click Enroll → 3️⃣ Fill out the form.";
      else if (q.includes("instructor") || q.includes("teacher"))
        reply = getTeamFromDOM();
      else if (q.includes("student"))
        reply =
          "So far, SikshaConnect has reached over **12,000 students** 🎉.";
      else if (q.includes("language"))
        reply = "We currently support **13 languages** 🌍.";
      else if (q.includes("what is sikshaconnect") || q.includes("about"))
        reply =
          "SikshaConnect is a scalable, inclusive e-learning platform aligned with UN SDG 4.";

      const botMsg = { id: "b" + Date.now(), from: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg].slice(-50));
      setTyping(false);
    }, 300 + Math.random() * 400); // faster, more responsive
  }

  return (
    <>
      {/* Floating open button */}
      <button
        onClick={() => setOpen(true)}
        className="chat-fab bg-accent text-white hover:scale-110 transition"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <div>
              <div className="font-semibold">SikshaBot</div>
              <small className="text-xs text-gray-500">AI Tutor (demo)</small>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-lg font-bold hover:text-red-500"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 flex-1 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] ${
                  m.from === "user" ? "ml-auto text-right" : ""
                }`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    m.from === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="inline-block px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 animate-pulse">
                ...
              </div>
            )}
            <div ref={endRef}></div>
          </div>

          {/* Input */}
          <form
            className="p-3 border-t border-gray-200 dark:border-gray-700"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask me something..."
                className="flex-1 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ring-1 ring-gray-200 dark:ring-gray-700"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-md bg-primary text-white hover:bg-accent transition"
              >
                Send
              </button>
            </div>
          </form>

          {/* Quick suggestion buttons */}
          <div className="p-2 flex flex-wrap gap-2 border-t border-gray-200 dark:border-gray-700">
            {["📚 Courses", "📝 Enroll", "👩‍🏫 Instructors"].map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="px-2 py-1 text-xs rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-accent hover:text-white transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
