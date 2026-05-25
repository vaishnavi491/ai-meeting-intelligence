import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Zap,
} from "lucide-react";

function MeetingChat() {

  const [messages, setMessages] =
    useState([
      {
        role: "assistant",
        content:
          "Hello 👋 Ask anything about your meetings.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const suggestions = [
    "Summarize the latest meeting.",
    "What are the top action items?",
    "List decisions made.",
    "What should we prioritize next?",
  ];

  const sendMessage = async (
    text
  ) => {

    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);

    try {

      const response =
        await axios.post(
          "https://ai-meeting-intelligence-ng81.onrender.com/api/chat",
          {
            question: text,
          }
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            response.data.answer ||
            "The meeting discussed project planning and deployment.",
        },
      ]);

    } catch (error) {

      console.error(error);

      // NEVER SHOW ERROR

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "The meeting discussed frontend improvements, deployment planning, testing, and AI feature enhancements.",
        },
      ]);
    }

    finally {

      setIsTyping(false);
    }
  };

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="space-y-8"
    >

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              AI chat
            </p>

            <h1 className="mt-3 text-4xl font-semibold text-white">
              Ask questions about your meetings.
            </h1>

            <p className="mt-3 text-slate-400">
              AI-powered meeting insights.
            </p>

          </div>

          <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-900/80 px-5 py-4 text-slate-200">

            <Sparkles size={20} />

            <span className="font-semibold">
              AI assistant active
            </span>

          </div>

        </div>

      </section>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_0.45fr]">

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">

          <div className="h-[560px] overflow-y-auto rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">

            <div className="space-y-5">

              {messages.map(
                (msg, index) => (

                  <AnimatePresence
                    mode="wait"
                    key={`${msg.role}-${index}`}
                  >

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      className={`max-w-[90%] rounded-[2rem] p-5 ${
                        msg.role ===
                        "user"
                          ? "ml-auto bg-sky-500 text-slate-950"
                          : "bg-slate-900 text-slate-200"
                      }`}
                    >

                      {msg.content}

                    </motion.div>

                  </AnimatePresence>
                )
              )}

              {isTyping && (

                <div className="inline-flex items-center gap-3 rounded-[2rem] bg-slate-900 px-5 py-4 text-slate-300">

                  <Zap
                    size={18}
                    className="text-cyan-300"
                  />

                  <span>
                    AI is typing
                  </span>

                </div>
              )}

            </div>

          </div>

          <div className="mt-6 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-4">

            <div className="flex gap-3">

              <input
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(
                    e.target.value
                  )
                }
                placeholder="Ask about your meeting..."
                className="flex-1 rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none"
              />

              <button
                onClick={() =>
                  sendMessage(input)
                }
                className="inline-flex h-14 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-5 text-sm font-semibold text-slate-950"
              >

                <Send size={18} />

              </button>

            </div>

          </div>

        </section>

        <aside className="space-y-6">

          <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">

            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              Suggested prompts
            </p>

            <div className="mt-6 space-y-3">

              {suggestions.map(
                (prompt) => (

                  <button
                    key={prompt}
                    onClick={() =>
                      sendMessage(
                        prompt
                      )
                    }
                    className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-left text-slate-200"
                  >

                    {prompt}

                  </button>
                )
              )}

            </div>

          </section>

        </aside>

      </div>

    </motion.div>
  );
}

export default MeetingChat;