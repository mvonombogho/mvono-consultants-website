'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { sendEmail, useEmailJSInit } from '../../lib/emailjs';

interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  sender?: string;
}

interface WorkingEmailChatProps {
  position?: 'bottom-right' | 'bottom-left';
  businessName?: string;
}

const WorkingEmailChat: React.FC<WorkingEmailChatProps> = ({
  position = 'bottom-right',
  businessName = 'Mvono Consultants'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [isInfoCollected, setIsInfoCollected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [lastSendStatus, setLastSendStatus] = useState<'success' | 'error' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize EmailJS
  useEmailJSInit();

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: '1',
      text: 'Hello! Welcome to Mvono Consultants. Please share your contact details so we can assist you better.',
      timestamp: new Date(),
      isUser: false,
      sender: 'Support'
    };
    setMessages([welcomeMsg]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const collectContactInfo = () => {
    if (!visitorName.trim() || !visitorEmail.trim() || !visitorPhone.trim()) {
      alert('Please fill in all your contact details.');
      return;
    }

    setIsInfoCollected(true);
    
    const systemMsg: ChatMessage = {
      id: Date.now().toString(),
      text: `Thanks ${visitorName}! Now you can send us your message and we'll respond directly via email and WhatsApp.`,
      timestamp: new Date(),
      isUser: false,
      sender: 'Support'
    };
    
    setMessages(prev => [...prev, systemMsg]);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    // Add user message to chat immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date(),
      isUser: true,
      sender: visitorName
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setIsSending(true);
    
    // Prepare email template parameters
    const templateParams = {
      from_name: visitorName,
      from_email: visitorEmail,
      phone: visitorPhone,
      message: message,
      website_url: window.location.href,
      timestamp: new Date().toLocaleString(),
      to_email: 'sales@mvonoconsultants.com' // Your email
    };

    // Clear input immediately for better UX
    const currentMessage = message;
    setMessage('');
    
    try {
      // Send email using your existing EmailJS configuration
      const result = await sendEmail(templateParams);
      
      setIsTyping(false);
      setIsSending(false);
      
      if (result.success) {
        setLastSendStatus('success');
        
        // Show success message
        const successMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `✅ Message sent successfully! We've received your inquiry about "${currentMessage.substring(0, 50)}${currentMessage.length > 50 ? '...' : ''}". We'll respond within 24 hours via email and WhatsApp (+254 701 868 849).`,
          timestamp: new Date(),
          isUser: false,
          sender: 'Support'
        };
        
        setMessages(prev => [...prev, successMsg]);
        
        // Show additional help message
        setTimeout(() => {
          const helpMsg: ChatMessage = {
            id: (Date.now() + 2).toString(),
            text: `For immediate assistance, you can also call us at +254 701 868 849 or WhatsApp us directly. Feel free to continue chatting if you have more questions!`,
            timestamp: new Date(),
            isUser: false,
            sender: 'Support'
          };
          setMessages(prev => [...prev, helpMsg]);
        }, 2000);
        
      } else {
        throw new Error('EmailJS send failed');
      }
      
    } catch (error) {
      console.error('Send failed:', error);
      setIsTyping(false);
      setIsSending(false);
      setLastSendStatus('error');
      
      // Show error message with fallback options
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `❌ Sorry, there was an issue sending your message. Please try one of these alternatives:
        
📧 Email us directly: sales@mvonoconsultants.com
📞 Call us: +254 701 868 849  
💬 WhatsApp: +254 701 868 849

You can also try sending your message again.`,
        timestamp: new Date(),
        isUser: false,
        sender: 'Support'
      };
      
      setMessages(prev => [...prev, errorMsg]);
      
      // Restore the message for retry
      setMessage(currentMessage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isInfoCollected) {
        collectContactInfo();
      } else {
        handleSendMessage();
      }
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  const chatPositionClasses = {
    'bottom-right': 'bottom-24 right-6',
    'bottom-left': 'bottom-24 left-6'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Chat Window */}
      {isOpen && (
        <div className={`
          fixed ${chatPositionClasses[position]} 
          w-80 bg-white rounded-lg shadow-2xl 
          border border-gray-200 flex flex-col
          transition-all duration-300
          ${isMinimized ? 'h-16' : 'h-96'}
        `}>
          {/* Header */}
          <div className="bg-orange-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                ) : lastSendStatus === 'success' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : lastSendStatus === 'error' ? (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                ) : (
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{businessName}</h3>
                <p className="text-xs text-orange-100">
                  {isSending ? 'Sending message...' : 
                   lastSendStatus === 'success' ? 'Message sent!' :
                   lastSendStatus === 'error' ? 'Send failed' :
                   'Direct email delivery'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <MessageCircle size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Contact Info Collection */}
              {!isInfoCollected && (
                <div className="p-4 bg-gray-50 space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email Address *"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Your Phone Number *"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <button
                    onClick={collectContactInfo}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded text-sm transition-colors"
                  >
                    Start Chat
                  </button>
                </div>
              )}

              {/* Messages Area */}
              {isInfoCollected && (
                <>
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`
                              max-w-xs px-3 py-2 rounded-lg text-sm
                              ${msg.isUser 
                                ? 'bg-orange-600 text-white rounded-br-none' 
                                : 'bg-white text-gray-800 border rounded-bl-none'
                              }
                            `}
                          >
                            {!msg.isUser && (
                              <p className="text-xs font-semibold mb-1 text-orange-600">
                                {msg.sender}
                              </p>
                            )}
                            <p className="whitespace-pre-line">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.isUser ? 'text-orange-100' : 'text-gray-500'}`}>
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white border rounded-lg rounded-bl-none px-3 py-2">
                            <p className="text-xs font-semibold mb-1 text-orange-600">Support</p>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t bg-white rounded-b-lg">
                    <div className="flex space-x-2">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        rows={2}
                        disabled={isSending}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isSending}
                        className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white rounded-lg px-3 py-2 transition-colors self-end"
                      >
                        {isSending ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Send size={16} />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {isSending ? 'Sending to your email...' : 'Message will be sent directly to our email'}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          bg-orange-500 hover:bg-orange-600 
          text-white rounded-full p-4 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 
          transform hover:scale-110
          relative group
        "
        aria-label="Open Chat"
      >
        {/* Pulse animation ring */}
        {!isOpen && (
          <div className="
            absolute inset-0 rounded-full 
            bg-orange-500 opacity-75 
            animate-ping
          "></div>
        )}
        
        {/* Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </div>

        {/* Status indicator */}
        {!isOpen && lastSendStatus && (
          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
            lastSendStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {lastSendStatus === 'success' ? '✓' : '!'}
          </div>
        )}

        {/* Hover tooltip */}
        <div className="
          absolute bottom-full right-0 mb-2 
          bg-gray-900 text-white text-xs 
          px-2 py-1 rounded whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
        ">
          Chat with us
        </div>
      </button>
    </div>
  );
};

export default WorkingEmailChat;