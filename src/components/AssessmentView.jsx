import React, { useState, useEffect } from 'react';
import { Zap, HelpCircle, ArrowRight, ArrowLeft, CheckCircle2, Shuffle, Sparkles } from 'lucide-react';
import questionsData from '../data/questions.json';

export default function AssessmentView({ onComplete }) {
  const [mode, setMode] = useState('quick'); // 'quick' (16) or 'full' (64)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestions = mode === 'quick' ? questionsData.quickQuestions : questionsData.fullQuestions;
  const currentQ = currentQuestions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / currentQuestions.length) * 100);
  const answeredCount = Object.keys(answers).length;

  // 키보드 단축키 (1, 2, 3, 4, 5) 핸들러
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        handleSelectValue(parseInt(e.key, 10));
      } else if (e.key === 'ArrowRight' && currentIndex < currentQuestions.length - 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestions, answers]);

  const handleSelectValue = (val) => {
    if (!currentQ) return;
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (currentIndex < currentQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // 모든 문항 완료
        onComplete(newAnswers, currentQuestions);
      }
    }, 150);
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFillRandom = () => {
    const autoAnswers = {};
    currentQuestions.forEach((q) => {
      // 1~5 임의 값 할당
      autoAnswers[q.id] = Math.floor(Math.random() * 5) + 1;
    });
    setAnswers(autoAnswers);
    onComplete(autoAnswers, currentQuestions);
  };

  const options = [
    { value: 1, label: '전혀 아니다', tag: '1', color: 'hover:bg-red-200 active:bg-red-300' },
    { value: 2, label: '약간 아니다', tag: '2', color: 'hover:bg-orange-100 active:bg-orange-200' },
    { value: 3, label: '보통 / 반반', tag: '3', color: 'hover:bg-gray-200 active:bg-gray-300' },
    { value: 4, label: '약간 그렇다', tag: '4', color: 'hover:bg-emerald-100 active:bg-emerald-200' },
    { value: 5, label: '매우 그렇다', tag: '5', color: 'hover:bg-[#00D084] active:bg-[#00b06f]' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Mode Selector & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 brutal-card bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase px-2 py-1 bg-black text-white border border-black">
            진단 모드
          </span>
          <div className="flex border-2 border-black bg-gray-100 p-0.5">
            <button
              onClick={() => { setMode('quick'); setCurrentIndex(0); setAnswers({}); }}
              className={`px-3 py-1 text-xs font-black cursor-pointer transition-all ${
                mode === 'quick' ? 'bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]' : 'text-gray-600'
              }`}
            >
              ⚡ 퀵 모드 (16문항)
            </button>
            <button
              onClick={() => { setMode('full'); setCurrentIndex(0); setAnswers({}); }}
              className={`px-3 py-1 text-xs font-black cursor-pointer transition-all ${
                mode === 'full' ? 'bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]' : 'text-gray-600'
              }`}
            >
              🔬 정밀 모드 (64문항)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFillRandom}
            title="테스트용 임의 답변 자동 생성"
            className="brutal-btn bg-[#FFFDF5] hover:bg-yellow-200 text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-black" />
            <span className="font-bold">빠른 시연 생성</span>
          </button>
        </div>
      </div>

      {/* Progress Box */}
      <div className="brutal-card bg-[#2563EB] text-white p-4">
        <div className="flex items-center justify-between text-xs md:text-sm font-black mb-2">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#FFE600]" />
            QUESTION {String(currentIndex + 1).padStart(2, '0')} / {String(currentQuestions.length).padStart(2, '0')}
          </span>
          <span className="bg-black text-[#FFE600] px-2 py-0.5 border border-white">
            진행률: {progressPercent}% ({answeredCount}/{currentQuestions.length})
          </span>
        </div>
        <div className="w-full bg-white h-5 border-2 border-black p-0.5">
          <div
            className="bg-[#FFE600] h-full border-r-2 border-black transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Main Card */}
      <div className={`brutal-card-lg bg-white p-6 md:p-8 transition-transform duration-150 ${isAnimating ? 'scale-[0.99] opacity-90' : 'scale-100'}`}>
        <div className="flex items-center justify-between gap-2 border-b-2 border-black pb-3 mb-6">
          <span className="brutal-tag bg-[#FFE600] text-xs px-2.5 py-1">
            {currentQ?.category || (currentQ?.dimension === 'DCNH' ? 'DCNH 하위 성향' : `MBTI ${currentQ?.dimension} 차원`)}
          </span>
          <span className="text-xs font-mono font-bold text-gray-500">
            단축키 1~5 키로도 선택 가능 ⌨️
          </span>
        </div>

        <div className="min-h-[90px] flex items-center justify-center text-center my-3 px-2">
          <h2
            className="text-lg sm:text-xl md:text-2xl font-black text-black leading-relaxed break-keep px-2"
            style={{ wordBreak: 'keep-all', textWrap: 'balance' }}
          >
            "{currentQ?.text}"
          </h2>
        </div>

        {/* 5-Likert Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-8">
          {options.map((opt) => {
            const isSelected = answers[currentQ?.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelectValue(opt.value)}
                className={`brutal-btn p-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center relative ${
                  isSelected
                    ? 'bg-[#FFE600] text-black ring-2 ring-black scale-102 shadow-[5px_5px_0px_#000]'
                    : `bg-white text-black ${opt.color}`
                }`}
              >
                <div className="w-7 h-7 rounded-full border-2 border-black font-black flex items-center justify-center text-sm bg-white shadow-[1px_1px_0px_#000]">
                  {opt.tag}
                </div>
                <span className="text-xs md:text-sm font-black mt-1">
                  {opt.label}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-black absolute top-1.5 right-1.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Prev / Next Nav */}
        <div className="flex items-center justify-between border-t-2 border-black pt-5 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`brutal-btn px-4 py-2 text-xs md:text-sm flex items-center gap-1.5 ${
              currentIndex === 0 ? 'opacity-40 cursor-not-allowed bg-gray-200' : 'bg-white hover:bg-gray-100 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>이전 문항</span>
          </button>

          {answeredCount === currentQuestions.length ? (
            <button
              onClick={() => onComplete(answers, currentQuestions)}
              className="brutal-btn bg-[#FF4D4D] text-white px-5 py-2 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer shadow-[4px_4px_0px_#000] animate-bounce"
            >
              <Sparkles className="w-4 h-4" />
              <span>결과 확인하기!</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentIndex === currentQuestions.length - 1}
              className={`brutal-btn px-4 py-2 text-xs md:text-sm flex items-center gap-1.5 ${
                currentIndex === currentQuestions.length - 1 ? 'opacity-40 cursor-not-allowed bg-gray-200' : 'bg-white hover:bg-gray-100 cursor-pointer'
              }`}
            >
              <span>다음 문항</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
