// ============================================
// Zustand Chat Store
// Handles AI chat messages and state
// ============================================

import { create } from 'zustand';
import type { ChatMessage, ChatState } from '../types';

interface ChatStoreState extends ChatState {
  isOpen: boolean;
  sessionId: string | null;
  remaining: number;
  hasStartedSession: boolean;

  toggleChat: () => void;
  startSession: (name: string, email: string, subject?: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const useChatStore = create<ChatStoreState>()((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  isOpen: false,
  sessionId: null,
  remaining: 5,
  hasStartedSession: false,

  toggleChat: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },

  startSession: async (name: string, email: string, subject?: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/chat/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to start chat session');
      }

      const data = await response.json();
      set({
        sessionId: data.session_id,
        remaining: data.remaining,
        hasStartedSession: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to start session',
        isLoading: false,
      });
    }
  },

  sendMessage: async (message: string) => {
    const { sessionId, remaining } = get();

    if (!sessionId) {
      set({ error: 'No active session' });
      return;
    }

    if (remaining <= 0) {
      set({ error: 'Daily question limit reached' });
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send message');
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, assistantMessage],
        remaining: data.remaining,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to send message',
        isLoading: false,
      });
    }
  },

  addMessage: (content: string, role: 'user' | 'assistant') => {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date(),
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearMessages: () => {
    set({ messages: [], error: null });
  },
}));