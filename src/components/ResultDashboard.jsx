import React, { useRef } from 'react';
import { 
  Sparkles, Download, MessageSquareText, RefreshCw, 
  Share2, Award, Zap, Compass, CheckCircle, AlertTriangle, ArrowUpRight 
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import confetti from 'canvas-confetti';

export default function ResultDashboard({ result, typeInfo, onOpenAdvisor, onOpenCatalog, onReset }) {
  const reportRef = useRef(null);

  // 축하 폭죽 효과
  React.useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handleDownloadImage = async () => {
    if (!reportRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(reportRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `64-MBTI-${result.code}-Report.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('이미지 저장 실패:', err);
      alert('이미지 저장 중 오류가 발생했습니다. 브라우저 인쇄 기능을 활용해 주세요.');
    }
  };

  const getDcnhColor = (sub) => {
    switch (sub) {
      case 'D': return 'bg-[#FF4D4D] text-white';
      case 'C': return 'bg-[#FFE600] text-black';
      case 'N': return 'bg-[#2563EB] text-white';
      case 'H': return 'bg-[#00D084] text-black';
      default: return 'bg-gray-200 text-black';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* 액션 컨트롤 바 */}
      <div className="flex flex-wrap items-center justify-between gap-3 brutal-card bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="brutal-tag bg-black text-[#FFE600] text-xs px-2.5 py-1">
            분석 완료
          </span>
          <span className="font-extrabold text-sm md:text-base">
            64-MBTI 다차원 대시보드 리포트
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadImage}
            className="brutal-btn bg-[#FFE600] text-black px-3 py-1.5 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>리포트 저장(PNG)</span>
          </button>
          <button
            onClick={() => onOpenAdvisor()}
            className="brutal-btn bg-[#FF4D4D] text-white px-3 py-1.5 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>내 성향으로 고민/질문 상담</span>
          </button>
          <button
            onClick={onReset}
            className="brutal-btn bg-white hover:bg-gray-100 px-3 py-1.5 text-xs md:text-sm flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>다시하기</span>
          </button>
        </div>
      </div>

      {/* 리포트 캡처 영역 (브루탈리즘 대시보드 본체) */}
      <div ref={reportRef} className="brutal-card-lg bg-[#FAF7EE] p-4 md:p-6 space-y-6">
        
        {/* 상단 윈도우 타이틀 바 */}
        <div className="flex items-center justify-between bg-black text-white px-3 py-2 border-2 border-black">
          <div className="flex items-center gap-2">
            <div className="window-dots">
              <span className="window-dot bg-[#FF4D4D]"></span>
              <span className="window-dot bg-[#FFE600]"></span>
              <span className="window-dot bg-[#00D084]"></span>
            </div>
            <span className="text-xs md:text-sm font-black tracking-widest uppercase">
              ANALYTICS CONSOLE // TYPE ID: {result.code}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#FFE600] font-bold">
            CONFIDENTIAL PERSONAL REPORT
          </div>
        </div>

        {/* 1. 상단 4대 핵심 스탯 카드 (레퍼런스 이미지 스타일) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Stat 1 */}
          <div className="brutal-card bg-white p-3.5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-black border border-black"></div>
              <span className="text-xs font-black uppercase text-gray-700">진단 성격 유형</span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-black tracking-tight">
              {result.code}
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-gray-500">
              <span className="bg-yellow-100 text-yellow-800 border border-black px-1">
                {typeInfo?.badge || result.mbti}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#FFE600] border-t border-black mt-2"></div>
          </div>

          {/* Stat 2 */}
          <div className="brutal-card bg-white p-3.5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-[#FF4D4D] border border-black"></div>
              <span className="text-xs font-black uppercase text-gray-700">DCNH 하위 성향</span>
            </div>
            <div className="text-xl md:text-2xl font-black text-black">
              {typeInfo?.dcnhTitle?.split(' ')[0] || result.subType}
            </div>
            <div className="mt-1 text-[11px] font-bold text-gray-600 truncate">
              {typeInfo?.dcnhTitle}
            </div>
            <div className="h-1.5 w-full bg-[#FF4D4D] border-t border-black mt-2"></div>
          </div>

          {/* Stat 3 */}
          <div className="brutal-card bg-white p-3.5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-[#2563EB] border border-black"></div>
              <span className="text-xs font-black uppercase text-gray-700">최고 하위성향 점수</span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-black">
              {result.dcnhScores[result.subType]}점
            </div>
            <div className="mt-1 text-[11px] font-bold text-blue-600">
              2위: {result.secondarySubType} ({result.dcnhScores[result.secondarySubType]}점)
            </div>
            <div className="h-1.5 w-full bg-[#2563EB] border-t border-black mt-2"></div>
          </div>

          {/* Stat 4 */}
          <div className="brutal-card bg-white p-3.5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-[#FFE600] border border-black"></div>
              <span className="text-xs font-black uppercase text-gray-700">응답 완료 문항</span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-black">
              {result.answeredCount} / {result.totalQuestions}
            </div>
            <div className="mt-1 text-[11px] font-bold text-emerald-700">
              100% 정상 판정 산출
            </div>
            <div className="h-1.5 w-full bg-[#00D084] border-t border-black mt-2"></div>
          </div>
        </div>

        {/* 2. 메인 대시보드 그리드 (좌측 사이드바 + 중앙 차트 + 우측 분석) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* 좌측 패널 (블루 사이드바 위젯) */}
          <div className="lg:col-span-4 brutal-card bg-[#2563EB] text-white p-4 flex flex-col justify-between">
            <div>
              <div className="border-b-2 border-black pb-2 mb-3">
                <span className="text-xs font-black uppercase bg-black text-[#FFE600] px-2 py-0.5 border border-white">
                  PROFILE OVERVIEW
                </span>
                <h3 className="text-2xl font-black mt-2 leading-tight">
                  {typeInfo?.title}
                </h3>
                <p className="text-xs text-blue-100 font-semibold mt-1">
                  {typeInfo?.slogan}
                </p>
              </div>

              {/* MBTI 4대 축 게이지 바 */}
              <div className="space-y-3 my-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#FFE600]">
                  MBTI 4대 축 비율
                </h4>
                
                {/* E - I */}
                <div className="bg-white text-black p-2 border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="flex justify-between text-xs font-black mb-1">
                    <span>외향 (E) {result.dimensions.EI.E}%</span>
                    <span>내향 (I) {result.dimensions.EI.I}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 border border-black p-0.5 flex">
                    <div className="bg-[#FFE600] h-full" style={{ width: `${result.dimensions.EI.E}%` }}></div>
                    <div className="bg-[#2563EB] h-full" style={{ width: `${result.dimensions.EI.I}%` }}></div>
                  </div>
                </div>

                {/* S - N */}
                <div className="bg-white text-black p-2 border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="flex justify-between text-xs font-black mb-1">
                    <span>감각 (S) {result.dimensions.SN.S}%</span>
                    <span>직관 (N) {result.dimensions.SN.N}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 border border-black p-0.5 flex">
                    <div className="bg-[#00D084] h-full" style={{ width: `${result.dimensions.SN.S}%` }}></div>
                    <div className="bg-[#FF4D4D] h-full" style={{ width: `${result.dimensions.SN.N}%` }}></div>
                  </div>
                </div>

                {/* T - F */}
                <div className="bg-white text-black p-2 border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="flex justify-between text-xs font-black mb-1">
                    <span>사고 (T) {result.dimensions.TF.T}%</span>
                    <span>감정 (F) {result.dimensions.TF.F}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 border border-black p-0.5 flex">
                    <div className="bg-[#2563EB] h-full" style={{ width: `${result.dimensions.TF.T}%` }}></div>
                    <div className="bg-[#FFE600] h-full" style={{ width: `${result.dimensions.TF.F}%` }}></div>
                  </div>
                </div>

                {/* J - P */}
                <div className="bg-white text-black p-2 border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="flex justify-between text-xs font-black mb-1">
                    <span>판단 (J) {result.dimensions.JP.J}%</span>
                    <span>인식 (P) {result.dimensions.JP.P}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 border border-black p-0.5 flex">
                    <div className="bg-[#FF4D4D] h-full" style={{ width: `${result.dimensions.JP.J}%` }}></div>
                    <div className="bg-[#00D084] h-full" style={{ width: `${result.dimensions.JP.P}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-2.5 border-2 border-white text-xs font-mono mt-3">
              BASE TYPE: {result.mbti} [{typeInfo?.baseName}]
            </div>
          </div>

          {/* 중앙 & 우측 패널 (DCNH 분석 & 행동 특징) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* DCNH 4대 성향 비교 막대 차트 */}
            <div className="brutal-card bg-white p-4">
              <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-black" />
                  <h4 className="font-black text-sm uppercase">DCNH 4대 하위 성향 스펙트럼</h4>
                </div>
                <span className="text-xs font-mono font-bold text-gray-500">SCALE: 0 ~ 100</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* D */}
                <div className="border-2 border-black p-3 bg-red-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-xs flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#FF4D4D] inline-block border border-black"></span>
                      주도형 (Dominant)
                    </span>
                    <span className="font-black text-sm">{result.dcnhScores.D}점</span>
                  </div>
                  <div className="w-full bg-white h-4 border border-black p-0.5">
                    <div className="bg-[#FF4D4D] h-full" style={{ width: `${result.dcnhScores.D}%` }}></div>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1">추진력, 목표 결단, 주도권 확보</p>
                </div>

                {/* C */}
                <div className="border-2 border-black p-3 bg-yellow-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-xs flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#FFE600] inline-block border border-black"></span>
                      창의형 (Creative)
                    </span>
                    <span className="font-black text-sm">{result.dcnhScores.C}점</span>
                  </div>
                  <div className="w-full bg-white h-4 border border-black p-0.5">
                    <div className="bg-[#FFE600] h-full" style={{ width: `${result.dcnhScores.C}%` }}></div>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1">혁신, 아이디어 실험, 틀 파괴</p>
                </div>

                {/* N */}
                <div className="border-2 border-black p-3 bg-blue-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-xs flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#2563EB] inline-block border border-black"></span>
                      체계형 (Normalizing)
                    </span>
                    <span className="font-black text-sm">{result.dcnhScores.N}점</span>
                  </div>
                  <div className="w-full bg-white h-4 border border-black p-0.5">
                    <div className="bg-[#2563EB] h-full" style={{ width: `${result.dcnhScores.N}%` }}></div>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1">원칙 준수, 정밀 분석, 표준화</p>
                </div>

                {/* H */}
                <div className="border-2 border-black p-3 bg-emerald-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-xs flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#00D084] inline-block border border-black"></span>
                      조화형 (Harmonizing)
                    </span>
                    <span className="font-black text-sm">{result.dcnhScores.H}점</span>
                  </div>
                  <div className="w-full bg-white h-4 border border-black p-0.5">
                    <div className="bg-[#00D084] h-full" style={{ width: `${result.dcnhScores.H}%` }}></div>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1">관계 배려, 갈등 완화, 환경 적응</p>
                </div>
              </div>
            </div>

            {/* 유형 심층 해석 카드 */}
            <div className="brutal-card bg-white p-4 space-y-3">
              <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                <Award className="w-4 h-4 text-[#FF4D4D]" />
                <h4 className="font-black text-sm">성격 및 행동 양식 심층 분석</h4>
              </div>

              <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-medium bg-gray-50 p-3 border border-black">
                {typeInfo?.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* 강점 */}
                <div className="bg-emerald-50 border-2 border-black p-3">
                  <div className="flex items-center gap-1.5 font-black text-xs text-emerald-900 mb-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>핵심 강점 TOP 3</span>
                  </div>
                  <ul className="text-xs space-y-1 text-gray-700 font-medium">
                    {typeInfo?.strengths?.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="font-black text-emerald-600">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 주의할 점 */}
                <div className="bg-red-50 border-2 border-black p-3">
                  <div className="flex items-center gap-1.5 font-black text-xs text-red-900 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span>주의할 리스크 & 맹점</span>
                  </div>
                  <ul className="text-xs space-y-1 text-gray-700 font-medium">
                    {typeInfo?.risks?.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="font-black text-red-600">!</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 시너지 협업 */}
              <div className="bg-[#FFFDF0] border-2 border-black p-3 text-xs">
                <span className="font-black text-black block mb-1">
                  🤝 최상의 협업 파트너 시너지:
                </span>
                <span className="text-gray-700">{typeInfo?.synergy}</span>
              </div>
            </div>

            {/* 경계선 알림 (있을 경우) */}
            {result.warnings && result.warnings.length > 0 && (
              <div className="brutal-card bg-yellow-100 p-3 text-xs border-2 border-black">
                <div className="font-black text-black flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-black" />
                  <span>경계선 성향 감지 (Borderline Notice)</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-gray-800 font-medium">
                  {result.warnings.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 3. 하단 3개 바로가기 카드 (레퍼런스 이미지 하단 액션 블록) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Card 1 */}
          <div 
            onClick={() => onOpenAdvisor()}
            className="brutal-card bg-[#FF4D4D] text-white p-3.5 flex items-center justify-between cursor-pointer hover:translate-y-[-2px] transition-transform"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-black border border-white"></div>
              <div>
                <span className="font-black text-sm block">질문/상황 상담하기</span>
                <span className="text-[11px] text-red-100">내 유형 기반 맞춤 솔루션</span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5" />
          </div>

          {/* Card 2 */}
          <div 
            onClick={handleDownloadImage}
            className="brutal-card bg-white text-black p-3.5 flex items-center justify-between cursor-pointer hover:translate-y-[-2px] transition-transform"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-black"></div>
              <div>
                <span className="font-black text-sm block">리포트 이미지 저장</span>
                <span className="text-[11px] text-gray-500">SNS 공유용 고화질 PNG</span>
              </div>
            </div>
            <Download className="w-5 h-5" />
          </div>

          {/* Card 3 */}
          <div 
            onClick={onOpenCatalog}
            className="brutal-card bg-[#FFE600] text-black p-3.5 flex items-center justify-between cursor-pointer hover:translate-y-[-2px] transition-transform"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-black"></div>
              <div>
                <span className="font-black text-sm block">64유형 사전 탐색</span>
                <span className="text-[11px] text-gray-700">전체 세분화 유형 비교</span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

      </div>
    </div>
  );
}
