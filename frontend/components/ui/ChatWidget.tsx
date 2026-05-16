"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useChatStore } from "@/lib/store/useChatStore";

export default function ChatWidget() {
  const {
    isOpen,
    toggleChat,
    messages,
    isLoading,
    error,
    remaining,
    hasStartedSession,
    startSession,
    sendMessage,
  } = useChatStore();

  const [showLeadForm, setShowLeadForm] = useState(true);
  const [showLargeModal, setShowLargeModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (hasStartedSession) {
      setShowLeadForm(false);
    }
  }, [hasStartedSession]);

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    await startSession(name.trim(), email.trim(), subject.trim() || undefined);

    // Close small popup and open large modal
    setShowLeadForm(false);
    setShowLargeModal(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || remaining <= 0) return;

    const message = inputMessage.trim();
    setInputMessage("");
    await sendMessage(message);
  };

  const handleFloatingButtonClick = () => {
    if (hasStartedSession) {
      // If session exists, open large modal directly
      setShowLargeModal(true);
    } else {
      // If no session, toggle small popup with form
      toggleChat();
    }
  };

  const handleCloseLargeModal = () => {
    setShowLargeModal(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={handleFloatingButtonClick}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#a73dff] to-[#8b2fd9] shadow-lg shadow-[#a73dff]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#a73dff]/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </motion.button>

      {/* Small Popup (Lead Form) */}
      <AnimatePresence>
        {isOpen && !hasStartedSession && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 flex h-[70vh] max-h-[520px] min-h-[420px] w-[92vw] max-w-[24rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#a73dff]/20 to-transparent px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  OBIN | Osama's AI Assistant
                </h3>
                <p className="text-sm text-white/60">Start a conversation</p>
              </div>
              <button
                onClick={toggleChat}
                className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Lead Form */}
            <form
              onSubmit={handleStartSession}
              className="flex flex-1 flex-col justify-center space-y-4 px-6"
            >
              <div className="text-center">
                <h4 className="mb-2 text-xl font-semibold text-white">
                  Get Started
                </h4>
                <p className="text-sm text-white/60">
                  Ask about projects, tech stack, and experience
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#a73dff] focus:bg-white/10"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#a73dff] focus:bg-white/10"
                />
                <input
                  type="text"
                  placeholder="Subject (optional)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={120}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#a73dff] focus:bg-white/10"
                />
              </div>

              {error && (
                <p className="text-center text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading || !name.trim() || !email.trim()}
                className="w-full rounded-lg bg-gradient-to-r from-[#a73dff] to-[#8b2fd9] px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-[#a73dff]/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Starting...
                  </span>
                ) : (
                  "Start Chat"
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Large Centered Modal (Chat Interface) */}
      <AnimatePresence>
        {showLargeModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              onClick={handleCloseLargeModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="fixed left-1/2 top-1/2 z-[70] flex h-[88vh] w-[94vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl sm:h-[86vh] sm:w-[92vw] md:h-[82vh] md:w-[86vw] lg:w-[900px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#a73dff]/20 to-transparent px-6 py-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    OBIN | Osama's AI Assistant
                  </h3>
                  <p className="text-sm text-white/60">
                    {remaining > 0
                      ? `${remaining} question${remaining !== 1 ? "s" : ""} remaining`
                      : "Limit reached"}
                  </p>
                </div>
                <button
                  onClick={handleCloseLargeModal}
                  className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
                {messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                    <p className="text-white/50">Ask me anything about Osama's portfolio, or pick a quick question:</p>

                    <div className="grid w-full max-w-[520px] grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        "Who is Osama bin Adnan?",
                        "Show me Osama's projects (with URLs).",
                        "What tech stack does Osama use?",
                        "Summarize Osama's experience.",
                      ].map((q) => (
                        <button
                          key={q}
                          type="button"
                          disabled={isLoading || remaining <= 0}
                          onClick={() => sendMessage(q)}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/90 transition-all hover:border-[#a73dff]/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-[#a73dff] to-[#8b2fd9] text-white"
                          : "border border-white/10 bg-white/5 text-white/90"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-[#a73dff]" />
                      <span className="text-sm text-white/60">Thinking...</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSendMessage}
                className="border-t border-white/10 p-4"
              >
                {remaining <= 0 ? (
                  <div className="rounded-lg bg-white/5 px-4 py-3 text-center text-sm text-white/60">
                    Daily question limit reached. Try again tomorrow!
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      maxLength={2000}
                      disabled={isLoading || remaining <= 0}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:border-[#a73dff] focus:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !inputMessage.trim() || remaining <= 0}
                      className="rounded-lg bg-gradient-to-br from-[#a73dff] to-[#8b2fd9] p-3 text-white transition-all hover:shadow-lg hover:shadow-[#a73dff]/30 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Send message"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
