import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    const query = input.toLowerCase();
    setInput('');

    // Simulate typing delay
    setTimeout(() => {
      let botResponse = "I'm not quite sure I understand. Could you rephrase, or reach out to us at support@offside.com?";

      // Professional AI Shopping Assistant Logic
      if (query.includes('where is my order') || query.includes('track') || query.includes('status')) {
        botResponse = "I'd be happy to help. Please provide your Order ID or the email address used during checkout so I can guide you.";
      } 
      else if (query.includes('oversized') || query.includes('t-shirt') || query.includes('product') || query.includes('recommend')) {
        botResponse = "Yes, we offer oversized fits in selected collections. Let me know your preferred color, size, or collection, and I'll help you find the best option.";
      } 
      else if (query.includes('return') || query.includes('refund') || query.includes('exchange')) {
        botResponse = "Most items can be returned within our 7-day return window if they are unused and in their original condition. Let me know the product or order, and I'll guide you through the process.";
      } 
      else if (query.includes('password') || query.includes('login') || query.includes('account')) {
        botResponse = "You can reset your password using the 'Forgot Password' option on the login page. If you're still having trouble, our support team can assist you.";
      } 
      else if (query.includes('shipping') || query.includes('delivery') || query.includes('how long')) {
        botResponse = "We offer express shipping across India within 3-5 business days. You'll receive a tracking link once your order ships.";
      } 
      else if (query.includes('size') || query.includes('fit') || query.includes('chart')) {
        botResponse = "Our clothing generally features a relaxed, oversized streetwear fit. Check the specific size chart on each product page for exact measurements.";
      } 
      else if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
        botResponse = "Hello! I am your OFFSIDE shopping assistant. Looking for something specific? Ask me about shipping, returns, or our products.";
      } 
      else if (query.includes('contact') || query.includes('support') || query.includes('help')) {
        botResponse = "You can reach our dedicated support team anytime at support@offside.com, and we will get back to you as soon as possible.";
      } 
      else {
        botResponse = "I'm sorry, I don't have the exact answer for that right now. Could you please rephrase, or reach out to our customer support at support@offside.com? We're always here to help.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[320px] sm:w-[360px] h-[480px] bg-[#fdfbf7] border border-gray-300 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-offside-black text-white p-4 flex justify-between items-center border-b border-gray-800">
              <div>
                <h3 className="font-heading font-black text-xl uppercase tracking-widest leading-none">OFFSIDE</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Support Client v1.0</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-offside-black flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">O</span>
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] p-3 text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gray-200 text-offside-black rounded-l-xl rounded-tr-xl' 
                      : 'bg-white border border-gray-200 text-gray-700 rounded-r-xl rounded-tl-xl shadow-sm'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                      <User className="w-3 h-3 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about shipping, returns..."
                className="flex-1 bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white rounded px-3 py-2 text-sm outline-none transition-colors placeholder:text-gray-400"
              />
              <button 
                onClick={handleSend}
                className="bg-offside-black text-white p-2 rounded hover:bg-gray-800 transition-colors flex items-center justify-center w-10"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-offside-black text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

    </div>
  );
};

export default Chatbot;
