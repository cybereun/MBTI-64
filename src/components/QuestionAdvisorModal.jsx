import React, { useState } from 'react';
import { 
  MessageSquareText, Sparkles, Send, Key, ChevronDown, 
  ChevronUp, Lightbulb, Compass, AlertCircle, Copy, Check, RotateCcw 
} from 'lucide-react';
import { generatePersonalizedAdvice } from '../utils/aiAdvisor';
import typeCatalog from '../data/typeCatalog.json';

export default function QuestionAdvisorModal({ result, typeInfo, onGoToTest }) {
  const [question, setQuestion] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adviceResult, setAdviceResult] = useState(null);
  const [selectedFallbackCode, setSelectedFallbackCode] = useState('INTJ-C');
  const [copied, setCopied] = useState(false);

  // 현재 분석에 사용할 성격 유형 결정
  const activeResult = result || {
    code: selectedFallbackCode,
    mbti: selectedFallbackCode.split('-')[0],
    subType: selectedFallbackCode.split('-')[1],
    dimensions: {
      EI: { E: 30, I: 70 },
      SN: { S: 25, N: 75 },
      TF: { T: 80, F: 20 },
      JP: { J: 70, P: 30 }
    },
    dcnhScores: { D: 60, C: 85, N: 55, H: 45 }
  };

  const activeTypeInfo = typeInfo || typeCatalog[selectedFallbackCode] || typeCatalog['INTJ-C'];

  const sampleQuestions = [
    "새로운 프로젝트 팀에서 리더 역할을 맡게 되었는데, 소통 방식을 어떻게 잡아야 할까요?",
    "상대방과의 의견 충돌이나 갈등이 생겼을 때, 제 성향상 어떻게 조율하는 것이 최선일까요?",
    "최근 번아웃과 동기부여 저하가 왔습니다. 제 유형에 맞는 회복 루틴이 궁금합니다.",
    "중요한 이직 또는 진로 결정을 앞두고 있는데, 어떤 기준을 최우선으로 삼아야 할까요?"
  ];

  const handleAnalyze = async () => {
    if (!question.trim()) {
      alert("고민이나 분석받고 싶은 상황/질문을 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setAdviceResult(null);

    try {
      const response = await generatePersonalizedAdvice({
        question,
        result: activeResult,
        typeInfo: activeTypeInfo,
        apiKey
      });
      setAdviceResult(response);
    } catch (err) {
      console.error(err);
      alert("분석 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAdvice = () => {
    if (!adviceResult?.content) return;
    navigator.clipboard.writeText(adviceResult.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetAdvisor = () => {
    setQuestion('');
    setAdviceResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* 타이틀 헤더 */}
      <div className="brutal-card bg-[#00D084] p-4 text-black">
        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
          <div className="flex items-center gap-2">
            <MessageSquareText className="w-5 h-5" />
            <h2 className="text-lg md:text-xl font-black">
              성향 기반 질문 & 상황 심층 분석기
            </h2>
          </div>
          <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
            TYPE-ADVISOR
          </span>
        </div>
        <p className="text-xs md:text-sm font-semibold">
          본인의 64가지 세분화 유형({activeResult.code}) 성향을 바탕으로 고민, 갈등, 의사결정 상황에 대한 맞춤형 행동 전략을 도출합니다.
        </p>
      </div>

      {/* 진단 상태 알림 카드 */}
      {!result ? (
        <div className="brutal-card bg-yellow-100 p-4 border-2 border-black flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-black" />
            <div>
              <span className="font-black text-sm block">아직 성향 진단을 완료하지 않으셨나요?</span>
              <span className="text-xs text-gray-700">임의 유형으로 테스트하거나, 정확한 분석을 위해 1분 퀵 진단을 진행하세요.</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedFallbackCode}
              onChange={(e) => setSelectedFallbackCode(e.target.value)}
              className="bg-white border-2 border-black px-2 py-1 text-xs font-bold shadow-[2px_2px_0px_#000]"
            >
              <option value="INTJ-C">INTJ-C (창의형 전략가)</option>
              <option value="INTJ-D">INTJ-D (주도형 전략가)</option>
              <option value="ENFP-C">ENFP-C (창의형 활동가)</option>
              <option value="ESTJ-D">ESTJ-D (주도형 경영자)</option>
              <option value="INFJ-H">INFJ-H (조화형 옹호자)</option>
              <option value="INTP-N">INTP-N (체계형 논리학자)</option>
            </select>
            <button
              onClick={onGoToTest}
              className="brutal-btn bg-[#2563EB] text-white px-3 py-1 text-xs flex items-center gap-1 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>진단하러 가기</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="brutal-card bg-white p-3 border-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="brutal-tag bg-[#FFE600] text-xs px-2 py-0.5">
              적용된 성향
            </span>
            <span className="font-black text-sm">
              {result.code} : {activeTypeInfo?.title}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-mono hidden sm:inline">
            DCNH: {activeTypeInfo?.dcnhTitle}
          </span>
        </div>
      )}

      {/* 질문 입력 카드 */}
      <div className="brutal-card-lg bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-black uppercase text-gray-800">
            분석받고 싶은 질문이나 직면한 상황을 입력하세요:
          </label>
          <button
            type="button"
            onClick={handleResetAdvisor}
            className="brutal-btn bg-[#FFE600] hover:bg-yellow-300 text-black text-xs px-3 py-1 flex items-center gap-1 cursor-pointer font-black shadow-[2px_2px_0px_#000]"
            title="입력한 질문 내용 지우기"
          >
            <RotateCcw className="w-3.5 h-3.5 text-black" />
            <span>입력 비우기</span>
          </button>
        </div>
        
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="예: 새로운 팀 프로젝트에서 동료와 갈등이 생겼는데, 제 주도적인 성향 때문에 팀원들이 부담스러워하는 것 같아요. 어떻게 소통해야 원만하게 성과를 낼 수 있을까요?"
          rows={4}
          className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white text-sm font-medium outline-none shadow-[3px_3px_0px_#000] resize-y"
        />

        {/* 추천 질문 칩 */}
        <div className="space-y-1.5">
          <span className="text-xs font-black text-gray-600 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
            자주 묻는 질문 템플릿 (클릭하여 자동 입력):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((sq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuestion(sq)}
                className="text-xs bg-gray-100 hover:bg-yellow-100 border border-black px-2 py-1 text-left font-medium rounded-none transition-all cursor-pointer truncate max-w-full"
              >
                "{sq.length > 32 ? sq.slice(0, 32) + '...' : sq}"
              </button>
            ))}
          </div>
        </div>

        {/* Gemini API Key 설정 (선택 사항) */}
        <div className="border-t-2 border-black pt-3">
          <button
            type="button"
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-xs font-bold text-gray-600 flex items-center gap-1 hover:text-black cursor-pointer"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Google Gemini 실시간 AI 엔진 연동 설정 (선택 사항)</span>
            {showKeyInput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          
          {showKeyInput && (
            <div className="mt-2 p-3 bg-gray-50 border border-black text-xs space-y-2">
              <p className="text-gray-600">
                API Key가 없어도 내장된 <strong>지능형 64유형 규칙 엔진</strong>이 즉시 정밀 솔루션을 생성합니다. 직접 키를 입력하시면 Google Gemini 1.5 Pro/Flash를 통한 자유 생성이 진행됩니다.
              </p>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Google Gemini API Key 입력..."
                className="w-full p-2 border border-black bg-white text-xs font-mono"
              />
            </div>
          )}
        </div>

        {/* 분석 및 상시 표시 초기화 버튼 그룹 */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="flex-1 min-w-[200px] brutal-btn bg-[#FF4D4D] text-white py-3 text-sm md:text-base font-black flex items-center justify-center gap-2 cursor-pointer shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>{activeResult.code} 성향 기반 심층 솔루션 분석 중...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>성향 맞춤 솔루션 분석받기</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetAdvisor}
            type="button"
            title="질문 내용 및 분석 결과 모두 초기화"
            className="brutal-btn bg-white hover:bg-gray-100 text-black px-5 py-3 text-sm font-black flex items-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_#000] active:translate-x-1 active:translate-y-1"
          >
            <RotateCcw className="w-4 h-4 text-red-600" />
            <span>전체 초기화</span>
          </button>
        </div>
      </div>

      {/* 분석 결과 리포트 */}
      {adviceResult && (
        <div className="brutal-card-lg bg-white p-6 space-y-4 border-4 border-black">
          <div className="flex flex-wrap items-center justify-between border-b-2 border-black pb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="brutal-tag bg-[#FFE600] text-xs px-2.5 py-1">
                솔루션 리포트
              </span>
              <h3 className="font-black text-base md:text-lg">
                [{activeResult.code}] 맞춤형 성향 처방전
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 bg-gray-100 border border-black hidden sm:inline">
                엔진: {adviceResult.source === 'gemini' ? 'Google Gemini AI' : '64유형 분석 규칙 엔진'}
              </span>
              <button
                onClick={handleResetAdvisor}
                className="brutal-btn bg-white hover:bg-red-50 px-2.5 py-1 text-xs flex items-center gap-1 cursor-pointer text-red-600"
                title="기존 결과를 지우고 새로운 질문 작성하기"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>새 질문 (초기화)</span>
              </button>
              <button
                onClick={handleCopyAdvice}
                className="brutal-btn bg-white hover:bg-gray-100 px-2.5 py-1 text-xs flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨' : '결과 복사'}</span>
              </button>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed font-sans whitespace-pre-line bg-[#FFFDF0] p-4 border-2 border-black">
            {adviceResult.content}
          </div>
        </div>
      )}
    </div>
  );
}
