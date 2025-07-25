import React, { useState, useRef, useEffect } from 'react';

interface ChatBoxProps {
  onSend: (message: string) => void;
  onClose?: () => void;
  isVisible?: boolean;
  imageContext?: string; // STEG 3: base64 image data for AI context
}

export default function ChatBox({ onSend, onClose, isVisible = true, imageContext }: ChatBoxProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animation state
  const [boxVisible, setBoxVisible] = useState(false);
  useEffect(() => {
    if (isVisible) {
      setBoxVisible(false);
      setTimeout(() => setBoxVisible(true), 10);
    } else {
      setBoxVisible(false);
    }
  }, [isVisible]);

  // Auto-focus input when component becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isSending) return;

    setIsSending(true);
    
    try {
      await onSend(trimmedMessage);
      setMessage(''); // Clear input after sending
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  // STEG 3: Dynamic placeholder based on image context
  const placeholder = imageContext ? "Ask about the selected area..." : "chat with ai";

  return (
    <div className={`relative z-50 transition-all duration-300 ease-out ${boxVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <div 
        className="bg-gray-900/95 backdrop-blur-[20px] border border-white/10 rounded-2xl p-2 mt-2 mb-1 h-12"
        style={{
          background: 'rgba(20, 20, 20, 0.95)',
        }}
      >
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isSending}
            className="flex-1 bg-transparent border-0 px-2 py-1 text-white/90 text-xs placeholder:text-white/30 placeholder:font-light outline-none focus:bg-transparent focus:shadow-none disabled:opacity-50"
            autoComplete="off"
            style={{ borderRadius: 0 }}
          />
          <button
            type="submit"
            disabled={!message.trim() || isSending}
            className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200
              ${!message.trim() || isSending
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-white/20 hover:bg-white/30 text-white/80 hover:text-white shadow-sm'}
            `}
            style={{ minWidth: 27, minHeight: 27 }}
          >
            {isSending ? (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 