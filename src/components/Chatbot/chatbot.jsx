import React, { useState } from "react";

const WomenHealthChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleUserInput = (e) => {
    setQuestion(e.target.value);
  };

  const handleSend = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBA9TuWHWxPUnfoFpHENiI0sWa0m9P7o88",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              role: "user",
              parts: [{
                text: `Provide a professional, medically accurate response about women's health for this question: ${question}. Ensure the answer is informative, respectful, and scientifically sound in short not more than 100 words.`
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const answer = data.candidates[0].content.parts[0].text;
      setAnswers(answer);
    } catch (error) {
      console.error("Error generating answers:", error);
      setAnswers("Sorry, I couldn't process your health question right now.");
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 p-3 bg-pink-500 rounded-full shadow-lg text-white z-50 hover:bg-pink-600 transition-colors"
        >
          🤖
        </button>

        {isChatOpen && (
          <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg z-50">
            <div className="container mx-auto px-4 py-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg text-pink-600">Saathi - Women's Health Assistant</span>
                <button 
                  onClick={toggleChat}
                  className="text-xl text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto max-h-60 mb-3 p-2 bg-gray-100 rounded-lg">
                {isLoading ? (
                  <div className="flex justify-center items-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500"></div>
                  </div>
                ) : answers ? (
                  <div className="p-3 bg-white rounded-lg shadow-md border-l-4 border-pink-500 text-gray-800">
                    <div className="flex items-start mb-2">
                      <span className="mr-2 text-pink-600 font-bold">Saathi:</span>
                      <p className="text-pink-400 text-lg leading-relaxed">{answers}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 p-4">
                    Your health questions will be answered here
                  </div>
                )}
              </div>

              <div className="flex w-full">
                <input
                  type="text"
                  value={question}
                  onChange={handleUserInput}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-grow p-2 border border-gray-300 rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Ask about women's health..."
                />
                <button
                  onClick={handleSend}
                  disabled={!question.trim()}
                  className="bg-pink-500 px-4 rounded-r-lg text-white hover:bg-pink-600 disabled:opacity-50 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomenHealthChatbot;