import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const quizCategories = {
  General: {
    Easy: [
      { question: "What is the capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], answer: "Delhi" },
      { question: "Which animal is known as the King of the Jungle?", options: ["Tiger", "Elephant", "Lion", "Cheetah"], answer: "Lion" },
      { question: "How many days are there in a week?", options: ["5", "6", "7", "8"], answer: "7" },
    ],
    Medium: [
      { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia", "Europe"], answer: "Africa" },
      { question: "What is the boiling point of water?", options: ["50°C", "80°C", "100°C", "120°C"], answer: "100°C" },
      { question: "Which gas do humans inhale to survive?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
    ],
    Hard: [
      { question: "Who invented the telephone?", options: ["Bell", "Edison", "Newton", "Tesla"], answer: "Bell" },
      { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
      { question: "Which ocean is the deepest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
    ],
  },
};

export default function QuizApp() {
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!category || !difficulty || finished) return;
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finished, category, difficulty]);

  const startQuiz = (cat, level) => {
    setCategory(cat);
    setDifficulty(level);
    setQuizData(quizCategories[cat][level]);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setTimeLeft(20);
  };

  const handleAnswer = (option) => {
    if (option === quizData[current].answer) {
      setScore(score + 1);
    }
    handleNext();
  };

  const handleNext = () => {
    if (current + 1 < quizData.length) {
      setCurrent(current + 1);
      setTimeLeft(20);
    } else {
      setFinished(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); // stop confetti after 4s
    }
  };

  const resetQuiz = () => {
    setCategory(null);
    setDifficulty(null);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setTimeLeft(20);
    setShowConfetti(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 p-6">
      {showConfetti && <Confetti numberOfPieces={300} recycle={false} />}

      <div className="backdrop-blur-xl bg-white/20 shadow-2xl rounded-3xl p-8 max-w-xl w-full text-center border border-white/30">
        <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg"> Quiz App</h1>

        {!category ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-white">Choose a Category 🎯</h2>
            <div className="grid gap-4">
              {Object.keys(quizCategories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-5 rounded-2xl shadow-md hover:shadow-pink-500/50 hover:scale-105 transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        ) : !difficulty ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-white">Select Difficulty 🎚️</h2>
            <div className="grid gap-4">
              {["Easy", "Medium", "Hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => startQuiz(category, level)}
                  className="bg-gradient-to-r from-green-400 to-emerald-600 text-white py-3 px-5 rounded-2xl shadow-md hover:shadow-green-400/50 hover:scale-105 transition"
                >
                  {level}
                </button>
              ))}
            </div>
          </>
        ) : !finished ? (
          <>
            {/* Timer */}
            <div className="mb-6">
              <p className="text-red-300 font-bold">⏳ Time Left: {timeLeft}s</p>
              <div className="w-full bg-white/30 rounded-full h-3 mt-2">
                <div
                  className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all"
                  style={{ width: `${(timeLeft / 20) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-semibold mb-6 text-white drop-shadow-md">{quizData[current].question}</h2>

            {/* Options */}
            <div className="grid gap-4">
              {quizData[current].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-5 rounded-2xl shadow-md hover:shadow-indigo-500/50 hover:scale-105 transition"
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Progress Info */}
            <p className="mt-6 text-gray-200 text-sm">
              Question {current + 1} of {quizData.length} | Difficulty:{" "}
              <span className="font-semibold text-green-300">{difficulty}</span>
            </p>
          </>
        ) : (
          <>
            {/* Final Score */}
            <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-md">🎉 Quiz Finished!</h2>
            <p className="text-xl mb-6 text-gray-200">
              Your Score:{" "}
              <span className="font-bold text-yellow-300">
                {score} / {quizData.length}
              </span>
            </p>

            {/* Restart */}
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-6 rounded-2xl shadow-lg hover:shadow-rose-500/50 hover:scale-105 transition"
            >
              🔁 Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
