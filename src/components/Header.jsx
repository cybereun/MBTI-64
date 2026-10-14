import React from 'react';
import { Sparkles, Compass, BookOpen, MessageSquareText, RefreshCw } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onReset, hasResult }) {
  return (
    <header className="brutal-card bg-[#FFE600] p-3 mb-6">
      {/* OS Window Bar */}
      <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="window-dots">
            <span className="window-dot bg-[#FF4D4D]"></span>
            <span className="window-dot bg-[#FFE600]"></span>
            <span className="window-dot bg-[#00D084]"></span>
          </div>
          <span className="font-black text-xs md:text-sm tracking-wider uppercase pl-2">
            64-MBTI ENGINE // NEO-BRUTALISM EDITION
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono bg-white border border-black px-2 py-0.5 font-bold shadow-[2px_2px_0px_#000]">
            MBTI 16 × DCNH 4 = 64
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono bg-[#2563EB] text-white border border-black px-2 py-0.5 font-bold">
            v1.0.0
          </span>
        </div>
      </div>

      {/* Main Nav Items */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-black text-[#FFE600] font-black px-3 py-1 text-base md:text-lg border-2 border-black shadow-[2px_2px_0px_#fff]">
            64-MBTI
          </div>
          <h1 className="font-extrabold text-sm md:text-base hidden lg:block">
            64가지 세분화 성격 진단 & AI 분석기
          </h1>
        </div>

        <nav className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('test')}
            className={`brutal-btn px-3 py-1.5 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'test' ? 'bg-[#2563EB] text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>진단하기</span>
          </button>

          {hasResult && (
            <button
              onClick={() => setActiveTab('result')}
              className={`brutal-btn px-3 py-1.5 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'result' ? 'bg-[#FF4D4D] text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>진단 결과</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('advisor')}
            className={`brutal-btn px-3 py-1.5 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'advisor' ? 'bg-[#00D084] text-black' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <MessageSquareText className="w-4 h-4" />
            <span>질문/상황 분석</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`brutal-btn px-3 py-1.5 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'catalog' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>64유형 도감</span>
          </button>

          {hasResult && (
            <button
              onClick={onReset}
              title="검사 다시하기"
              className="brutal-btn bg-white hover:bg-red-100 px-2.5 py-1.5 text-xs flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">재진단</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
