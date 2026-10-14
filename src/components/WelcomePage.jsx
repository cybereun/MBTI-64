import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart, Star, Compass, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WelcomePage({ onOpenApp }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
    setTimeout(() => {
      onOpenApp();
    }, 350);
  };

  return (
    <div className={`min-h-screen bg-[#F8F5EE] flex flex-col items-center justify-center p-3 sm:p-6 transition-all duration-300 ${isOpening ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
      <div className="max-w-4xl w-full brutal-card-lg bg-white overflow-hidden shadow-[8px_8px_0px_#000]">
        
        {/* 상단 레트로 윈도우 타이틀바 */}
        <div className="bg-[#FFE600] border-b-4 border-black px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="window-dots">
              <span className="window-dot bg-[#FF4D4D]"></span>
              <span className="window-dot bg-[#FFE600]"></span>
              <span className="window-dot bg-[#00D084]"></span>
            </div>
            <span className="font-black text-xs sm:text-sm tracking-wider uppercase pl-2 font-mono">
              WELCOME TO MBTI 64 // SPECIAL EDITION
            </span>
          </div>
          <span className="text-[11px] font-mono bg-black text-[#FFE600] px-2 py-0.5 font-bold border border-black">
            START SCREEN
          </span>
        </div>

        {/* 웰컴 일러스트 배너 본체 */}
        <div className="relative bg-[#FAF7EE] p-3 sm:p-5 flex flex-col items-center text-center">
          
          {/* 캐릭터 애니메이션 배너 이미지 */}
          <div className="w-full relative border-3 border-black overflow-hidden shadow-[5px_5px_0px_#000] bg-white group">
            <img
              src="/assets/welcome_banner.jpg"
              alt="MBTI 64 웰컴 애니메이션 일러스트"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
              onError={(e) => {
                // 이미지 로드 실패 시 상대경로 대체
                e.target.src = './public/assets/welcome_banner.jpg';
              }}
            />
            {/* 부드러운 오버레이 샤인 효과 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* 인트로 설명 & 슬로건 배지 */}
          <div className="mt-5 space-y-2 max-w-2xl px-2">
            <div className="inline-flex items-center gap-2 bg-[#FFE600] border-2 border-black px-3 py-1 font-black text-xs sm:text-sm shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-4 h-4 text-red-500 fill-red-500" />
              <span>16가지 기본 MBTI × 4가지 DCNH 세부 유형</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-black tracking-tight leading-tight pt-1">
              "나를 가장 나답게 설명하는 64가지 성향의 세계"
            </h2>

            <p className="text-xs sm:text-sm text-gray-700 font-bold leading-relaxed">
              기존 16가지 성격 유형으로 다 담지 못했던 나의 숨겨진 주도성·창의성·체계성·조화성을 분석하고, 직면한 고민과 질문에 딱 맞는 성향 맞춤 솔루션을 지금 바로 만나보세요!
            </p>
          </div>

          {/* 핵심 포인트 4개 미니 태그 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-2xl mt-4 text-xs font-black">
            <div className="bg-pink-100 border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
              🧠 16가지 기본 유형
            </div>
            <div className="bg-purple-100 border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
              🔍 4가지 DCNH 세부 성향
            </div>
            <div className="bg-blue-100 border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
              📊 64유형 종합 대시보드
            </div>
            <div className="bg-emerald-100 border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
              💡 AI 성향 맞춤 질문 상담
            </div>
          </div>

          {/* ★ 핵심 OPEN 버튼 ★ */}
          <div className="mt-6 mb-2 w-full max-w-md">
            <button
              onClick={handleOpen}
              className="w-full brutal-btn bg-[#FF4D4D] hover:bg-[#ff3333] text-white py-4 px-8 text-xl sm:text-2xl font-black flex items-center justify-center gap-3 cursor-pointer shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_#000] transition-all"
            >
              <Zap className="w-6 h-6 text-[#FFE600] fill-[#FFE600] animate-bounce" />
              <span>O P E N</span>
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
            <span className="text-[11px] font-bold text-gray-500 mt-2 block font-mono">
              CLICK 'OPEN' TO LAUNCH MBTI 64 CONSOLE
            </span>
          </div>

        </div>

        {/* 윈도우 하단 바 */}
        <div className="bg-black text-[#FFE600] px-4 py-2 text-xs flex justify-between items-center font-mono font-bold border-t-4 border-black">
          <span>MBTI-64 APPLICATION SYSTEM</span>
          <span>PRESS OPEN TO START ➔</span>
        </div>

      </div>
    </div>
  );
}
