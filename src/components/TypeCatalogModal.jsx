import React, { useState } from 'react';
import { BookOpen, Search, Filter, ExternalLink, X, Check } from 'lucide-react';
import typeCatalog from '../data/typeCatalog.json';

export default function TypeCatalogModal({ onSelectType }) {
  const [search, setSearch] = useState('');
  const [selectedDcnh, setSelectedDcnh] = useState('ALL'); // ALL, D, C, N, H
  const [selectedMbti, setSelectedMbti] = useState('ALL');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const mbtiList = [
    'ALL', 'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  const typesArray = Object.values(typeCatalog);

  const filteredTypes = typesArray.filter((t) => {
    const matchesSearch =
      t.code.toLowerCase().includes(search.toLowerCase()) ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.summary.toLowerCase().includes(search.toLowerCase()) ||
      t.baseName.toLowerCase().includes(search.toLowerCase());

    const matchesDcnh = selectedDcnh === 'ALL' || t.dcnh === selectedDcnh;
    const matchesMbti = selectedMbti === 'ALL' || t.mbti === selectedMbti;

    return matchesSearch && matchesDcnh && matchesMbti;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* 헤더 */}
      <div className="brutal-card bg-black text-white p-4">
        <div className="flex items-center justify-between border-b-2 border-white pb-2 mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#FFE600]" />
            <h2 className="text-lg md:text-xl font-black text-[#FFE600]">
              64가지 세분화 성격 유형 백과 (CATALOG)
            </h2>
          </div>
          <span className="text-xs font-mono font-bold bg-[#FFE600] text-black px-2 py-0.5 border border-white">
            총 64개 유형 데이터베이스
          </span>
        </div>
        <p className="text-xs md:text-sm text-gray-300">
          기본 16가지 MBTI에 DCNH 4대 하위유형(주도형 D, 창의형 C, 체계형 N, 조화형 H)이 결합된 모든 세분화 유형을 탐색하세요.
        </p>
      </div>

      {/* 필터 및 검색 바 */}
      <div className="brutal-card bg-white p-4 space-y-3">
        {/* 검색 인풋 */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="유형 코드(예: INTJ-C), 직함, 키워드로 검색..."
            className="w-full pl-9 pr-3 py-2 border-2 border-black text-xs md:text-sm font-bold shadow-[2px_2px_0px_#000] outline-none"
          />
        </div>

        {/* DCNH 필터 */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-black text-gray-700 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> DCNH:
          </span>
          {[
            { id: 'ALL', label: '전체' },
            { id: 'D', label: '주도형 (D)', bg: 'bg-[#FF4D4D] text-white' },
            { id: 'C', label: '창의형 (C)', bg: 'bg-[#FFE600] text-black' },
            { id: 'N', label: '체계형 (N)', bg: 'bg-[#2563EB] text-white' },
            { id: 'H', label: '조화형 (H)', bg: 'bg-[#00D084] text-black' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedDcnh(item.id)}
              className={`px-2.5 py-1 text-xs font-black border-2 border-black cursor-pointer transition-all ${
                selectedDcnh === item.id
                  ? `${item.bg || 'bg-black text-white'} shadow-[2px_2px_0px_#000] scale-102`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* MBTI 필터 */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-xs font-black text-gray-700 mr-2">MBTI:</span>
          {mbtiList.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMbti(m)}
              className={`px-2 py-0.5 text-[11px] font-bold border border-black cursor-pointer ${
                selectedMbti === m
                  ? 'bg-black text-white font-black'
                  : 'bg-gray-50 hover:bg-yellow-100 text-gray-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* 결과 수 */}
      <div className="flex justify-between items-center text-xs font-mono font-bold px-1">
        <span>FILTERED RESULTS: {filteredTypes.length} / 64</span>
        {(selectedDcnh !== 'ALL' || selectedMbti !== 'ALL' || search) && (
          <button
            onClick={() => { setSelectedDcnh('ALL'); setSelectedMbti('ALL'); setSearch(''); }}
            className="text-red-600 underline cursor-pointer"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 64유형 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTypes.map((item) => {
          const dcnhColors = {
            D: 'bg-[#FF4D4D] text-white',
            C: 'bg-[#FFE600] text-black',
            N: 'bg-[#2563EB] text-white',
            H: 'bg-[#00D084] text-black'
          };
          return (
            <div
              key={item.code}
              onClick={() => setActiveModalItem(item)}
              className="brutal-card bg-white p-4 flex flex-col justify-between cursor-pointer hover:translate-y-[-2px] transition-transform min-h-[320px] h-full"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                  <span className="text-xl font-black tracking-tight">{item.code}</span>
                  <span className={`text-xs font-black px-2 py-0.5 border border-black ${dcnhColors[item.dcnh]}`}>
                    {item.dcnhTitle.split(' ')[0]}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-black leading-snug break-keep">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 font-bold mt-1 italic">
                  {item.slogan}
                </p>
                <div className="text-xs text-gray-800 mt-3 bg-gray-50 p-2.5 border-2 border-black leading-relaxed break-keep">
                  {item.summary}
                </div>
              </div>

              <div className="pt-3 border-t-2 border-black mt-3 flex items-center justify-between text-xs font-bold text-gray-700">
                <span className="bg-black text-white px-1.5 py-0.5 text-[11px]">{item.baseName.split(' ')[0]}</span>
                <span className="flex items-center gap-0.5 text-black font-black underline">
                  자세히 보기 <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 상세 모달 팝업 */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="brutal-card-lg bg-white max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">{activeModalItem.code}</span>
                <span className="brutal-tag bg-[#FFE600] text-xs px-2 py-0.5">
                  {activeModalItem.dcnhTitle}
                </span>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="brutal-btn p-1 bg-white hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-black">{activeModalItem.title}</h3>
              <p className="text-xs font-bold text-gray-500 italic">
                {activeModalItem.slogan}
              </p>

              <div className="bg-[#FFFDF0] p-3 border-2 border-black text-xs md:text-sm leading-relaxed">
                {activeModalItem.summary}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-emerald-50 border-2 border-black p-2.5">
                  <span className="font-black text-emerald-900 block mb-1">핵심 강점</span>
                  <ul className="space-y-1 text-gray-700">
                    {activeModalItem.strengths?.map((s, idx) => (
                      <li key={idx}>✓ {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border-2 border-black p-2.5">
                  <span className="font-black text-red-900 block mb-1">주의할 점</span>
                  <ul className="space-y-1 text-gray-700">
                    {activeModalItem.risks?.map((r, idx) => (
                      <li key={idx}>! {r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-black p-2.5 text-xs">
                <span className="font-black text-blue-900 block mb-1">협업 스타일 & 시너지</span>
                <p className="text-gray-700">{activeModalItem.synergy}</p>
              </div>

              <div className="bg-yellow-50 border-2 border-black p-2.5 text-xs">
                <span className="font-black text-yellow-900 block mb-1">성장 처방전</span>
                <p className="text-gray-800">{activeModalItem.advice}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModalItem(null)}
                className="brutal-btn bg-black text-white px-4 py-2 text-xs font-bold cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
