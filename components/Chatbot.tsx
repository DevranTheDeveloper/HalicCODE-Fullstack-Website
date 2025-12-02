'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Merhaba! Haliç CODE topluluğu hakkında size nasıl yardımcı olabilirim?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages // Geçmiş mesajları gönder
                })
            });

            const data = await response.json();

            if (data.error) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.'
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.reply
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Bağlantı hatası. Lütfen daha sonra tekrar deneyin.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Link'leri buton olarak render et
    const renderMessageWithButtons = (content: string) => {
        // URL regex pattern (http/https veya /news/ ile başlayanlar)
        const urlPattern = /((?:https?:\/\/[^\s]+)|(?:\/news\/[^\s]+))/g;
        const parts = content.split(urlPattern);

        return (
            <div className="space-y-2">
                {parts.map((part, index) => {
                    // Eğer bu bir link ise
                    if (part.match(urlPattern)) {
                        const isNewsLink = part.includes('/news/');
                        const buttonText = isNewsLink ? 'Haberin Devamını Oku' : 'Şimdi Katıl!';

                        return (
                            <a
                                key={index}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg group"
                            >
                                {isNewsLink ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )}
                                {buttonText}
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        );
                    }
                    // Normal text
                    return part ? <p key={index} className="text-sm whitespace-pre-wrap">{part}</p> : null;
                })}
            </div>
        );
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple-600 hover:from-accent-hover hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${isOpen ? 'rotate-180' : ''
                    }`}
                aria-label="Chatbot"
            >
                {isOpen ? (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <>
                    {/* Backdrop for both mobile and desktop */}
                    <div
                        className="fixed inset-0 bg-black/30 md:bg-transparent z-40 animate-overlay-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Chat Window - Centered on mobile, bottom-right on desktop */}
                    <div className="fixed z-50 animate-overlay-in
                        md:bottom-24 md:right-6 md:w-96 md:h-[500px]
                        max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2
                        max-md:w-[calc(100%-2rem)] max-md:max-w-md max-md:h-[600px] max-md:max-h-[85vh]
                        bg-primary-light border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-accent to-purple-600 p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold">CODE Asistan</h3>
                                <p className="text-white/80 text-xs">Topluluk Destek Botu</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user'
                                            ? 'bg-accent text-white'
                                            : 'bg-primary-dark text-gray-200 border border-gray-700'
                                            }`}
                                    >
                                        {msg.role === 'assistant' ? renderMessageWithButtons(msg.content) : (
                                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-primary-dark border border-gray-700 rounded-2xl px-4 py-2">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-800 safe-area-bottom">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Mesajınızı yazın..."
                                    disabled={isLoading}
                                    className="flex-1 bg-primary-dark border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all disabled:opacity-50"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
