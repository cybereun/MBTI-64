import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WelcomePage from './components/WelcomePage';
import AssessmentView from './components/AssessmentView';
import ResultDashboard from './components/ResultDashboard';
import QuestionAdvisorModal from './components/QuestionAdvisorModal';
import TypeCatalogModal from './components/TypeCatalogModal';
import { calculateScores } from './utils/scoringEngine';
import typeCatalog from './data/typeCatalog.json';

export default function App() {
  const [isAppOpened, setIsAppOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('test');
  const [result, setResult] = useState(() => {
    try {
      const saved = localStorage.getItem('mbti64_result');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [typeInfo, setTypeInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('mbti64_type_info');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 진단 완료 시
  const handleCompleteAssessment = (answers, questions) => {
    const calculated = calculateScores(answers, questions);
    const info = typeCatalog[calculated.code] || null;

    setResult(calculated);
    setTypeInfo(info);

    try {
      localStorage.setItem('mbti64_result', JSON.stringify(calculated));
      localStorage.setItem('mbti64_type_info', JSON.stringify(info));
    } catch (e) {
      console.warn('LocalStorage 저장 실패:', e);
    }

    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 다시 검사하기
  const handleReset = () => {
    if (window.confirm('기존 진단 결과를 초기화하고 새로운 검사를 시작하시겠습니까?')) {
      localStorage.removeItem('mbti64_result');
      localStorage.removeItem('mbti64_type_info');
      setResult(null);
      setTypeInfo(null);
      setActiveTab('test');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isAppOpened) {
    return <WelcomePage onOpenApp={() => setIsAppOpened(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-black px-3 py-4 md:px-6 md:py-6 selection:bg-[#FFE600] selection:text-black">
      <div className="max-w-6xl mx-auto">
        {/* 상단 브루탈리즘 헤더 */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onReset={handleReset}
          hasResult={!!result}
          onBackToWelcome={() => setIsAppOpened(false)}
        />

        {/* 탭 본문 영역 */}
        <main className="mt-4">
          {activeTab === 'test' && (
            <AssessmentView onComplete={handleCompleteAssessment} />
          )}

          {activeTab === 'result' && (
            result ? (
              <ResultDashboard
                result={result}
                typeInfo={typeInfo}
                onOpenAdvisor={() => setActiveTab('advisor')}
                onOpenCatalog={() => setActiveTab('catalog')}
                onReset={handleReset}
              />
            ) : (
              <div className="brutal-card bg-white p-8 text-center max-w-lg mx-auto space-y-4">
                <h3 className="text-xl font-black">아직 완료된 진단 결과가 없습니다</h3>
                <p className="text-xs text-gray-600">
                  간편한 16문항 퀵 모드나 64문항 정밀 모드를 통해 64가지 세분화 성향을 판정받아 보세요!
                </p>
                <button
                  onClick={() => setActiveTab('test')}
                  className="brutal-btn bg-[#FFE600] px-4 py-2 text-sm font-black cursor-pointer"
                >
                  진단 시작하기
                </button>
              </div>
            )
          )}

          {activeTab === 'advisor' && (
            <QuestionAdvisorModal
              result={result}
              typeInfo={typeInfo}
              onGoToTest={() => setActiveTab('test')}
            />
          )}

          {activeTab === 'catalog' && (
            <TypeCatalogModal />
          )}
        </main>

        {/* 브루탈리즘 푸터 */}
        <footer className="mt-12 brutal-card bg-white p-4 text-center text-xs space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono font-bold">
            <span>64-MBTI DIAGNOSTIC ENGINE</span>
            <span>•</span>
            <span>MBTI 16 × DCNH 4</span>
            <span>•</span>
            <span>NEO-BRUTALISM ARCHITECTURE</span>
          </div>
          <p className="text-gray-500 text-[11px]">
            * 본 검사는 심리학적 연구(소시오닉스 DCNH 하위유형 및 MBTI 지표)를 결합한 자기이해 및 인터랙티브 분석 도구입니다.
          </p>
        </footer>
      </div>
    </div>
  );
}
