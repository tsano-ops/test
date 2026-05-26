import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function Col4AIPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi <b>Sarah</b>! I'm here to help you navigate your PlanAfter journey.\n\nWhat would you like to know?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 60);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "I've noted that. Let me help you complete this section of your profile.",
          isUser: false,
        },
      ]);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  return (
    <div className="ai-card-col4" id="aiCardCol4">
      <div className="ai-bg" />

      {/* Header */}
      <div className="ai-header">
        <div className="ai-title">PlanAfter AI Assistant</div>
        <div className="ai-subtitle">Ready to help with your planning</div>
      </div>

      {/* Chat */}
      <div className="ai-chat" id="col4AiChat" ref={chatRef} onScroll={handleScroll}>
        {messages.map((msg) =>
          msg.isUser ? (
            <div key={msg.id} className="user-msg">
              <div className="user-bubble">{msg.text}</div>
              <div className="ai-status-dot user-dot" />
            </div>
          ) : (
            <div key={msg.id} className="ai-message">
              <div className="ai-status-dot" />
              <div className="ai-bubble">
                <p dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            </div>
          ),
        )}
        {isTyping && (
          <div className="ai-typing-msg" id="col4Typing">
            <div className="ai-status-dot" />
            <div className="ai-typing-dots"><span /><span /><span /></div>
          </div>
        )}
      </div>

      {/* Scroll to bottom */}
      {showScrollBtn && (
        <button className="ai-scroll-btn" id="col4ScrollBtn" onClick={scrollToBottom} title="Scroll to bottom">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          <div className="new-dot" />
        </button>
      )}

      {/* Input area */}
      <div className="ai-input-area">
        <button className="ai-attach" title="Attach document">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
        </button>
        <div className="ai-input-composite" id="col4Composite">
          <textarea
            ref={textareaRef}
            className="ai-input"
            id="col4AiInput"
            placeholder="Ask me anything about..."
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoGrow(e.target);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <span className="ai-enter-hint">Press Enter &#8629;</span>
        <button
          className={`ai-send ${input.trim() ? 'enabled' : ''}`}
          id="col4SendBtn"
          onClick={sendMessage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="21.5" height="21.572" viewBox="0 0 21.5 21.572"><g transform="translate(66.25 1.295)"><path d="M7.142,1.794a3.178,3.178,0,0,1,5.721,0l6.75,13.2A3.429,3.429,0,0,1,16.753,20c-2.4.039-3.286-2.351-6.662-2.351S5.66,20.012,3.253,20a3.419,3.419,0,0,1-2.86-5.006Z" transform="translate(-45.5 -0.509) rotate(90)" fill="none" stroke="#FFF" strokeWidth="1.5"/><line x2="5" transform="translate(-58.5 9.494)" fill="none" stroke="#FFF" strokeLinecap="round" strokeWidth="1.5"/></g></svg>
        </button>
      </div>
      <div className="ai-resize"><div className="ai-resize-handle" /></div>
    </div>
  );
}
