/**
 * 64-MBTI AI Advisor Engine
 * 사용자의 고민/질문과 64유형 성향 데이터를 결합하여 맞춤형 해결 솔루션 제공
 */

export async function generatePersonalizedAdvice({ question, result, typeInfo, apiKey }) {
  if (!question || !question.trim()) {
    return {
      success: false,
      message: "고민이나 상황에 대한 질문을 입력해 주세요."
    };
  }

  // 1. Gemini API Key가 입력된 경우 실시간 AI 호출
  if (apiKey && apiKey.trim()) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `당신은 64가지 세분화 성격 유형(16 MBTI x DCNH 4하위유형) 전문 심리 분석가이자 라이프 코치입니다.
사용자의 유형: ${result.code} (${typeInfo.title})
- 기본 MBTI: ${result.mbti} (${typeInfo.baseName})
- DCNH 하위유형: ${typeInfo.dcnhTitle}
- 성향 수치: 외향/내향(${result.dimensions.EI.E}%/${result.dimensions.EI.I}%), 감각/직관(${result.dimensions.SN.S}%/${result.dimensions.SN.N}%), 사고/감정(${result.dimensions.TF.T}%/${result.dimensions.TF.F}%), 판단/인식(${result.dimensions.JP.J}%/${result.dimensions.JP.P}%)
- DCNH 척도: 주도형(D) ${result.dcnhScores.D}점, 창의형(C) ${result.dcnhScores.C}점, 체계형(N) ${result.dcnhScores.N}점, 조화형(H) ${result.dcnhScores.H}점

사용자의 질문/상황:
"${question}"

다음 형식으로 명확하고 실질적인 브루탈리즘 스타일의 한국어 조언 보고서를 작성해 주세요:
1. 🧠 [성향 분석]: 사용자의 유형 특성이 이 질문/상황에서 왜 스트레스를 받거나 그렇게 반응하는지 심층 분석
2. ⚡ [핵심 강점 활용법]: 이 유형의 DCNH 특성으로 문제를 돌파할 수 있는 무기
3. 🎯 [3단계 실천 행동 플랜]: 당장 실행할 수 있는 구체적 스텝 1, 2, 3
4. ⚠️ [주의할 맹점]: 성향상 빠지기 쉬운 함정과 보완책`
            }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            success: true,
            source: 'gemini',
            content: text
          };
        }
      }
    } catch (e) {
      console.warn("Gemini API 호출 실패, 지능형 로컬 분석 엔진으로 전환합니다.", e);
    }
  }

  // 2. 오프라인 및 기본 탑재된 지능형 규칙 기반 분석 엔진
  const dcnhTrait = {
    D: {
      action: "상황을 장악하고 명확한 결단을 내려 빠른 결과를 도출하는 '주도적 돌파'",
      trap: "결과에 너무 집중한 나머지 타인의 감정이나 숨은 의도를 성급하게 재단할 수 있습니다.",
      steps: [
        "지금 상황에서 내가 직접 통제할 수 있는 핵심 변수 1가지를 우선 식별하세요.",
        "주변 이해관계자에게 결론부터 명확하고 단호하게 소통하여 방향성을 제시하세요.",
        "목표 달성 기한을 단기 단위로 쪼개어 가시적인 성과를 빠르게 확인하세요."
      ]
    },
    C: {
      action: "기존 관행을 벗어나 완전히 새로운 시각으로 대안을 발굴하는 '창의적 우회'",
      trap: "아이디어만 풍성하고 실행과 마무리 정리가 지연되어 동력을 잃을 수 있습니다.",
      steps: [
        "‘당연하다’고 생각했던 전제들을 의심해보고, 전혀 다른 분야의 해결책을 접목해보세요.",
        "가장 흥미로운 아이디어를 프로토타입이나 가벼운 테스트 형태로 당장 시도해보세요.",
        "아이디어가 분산되지 않도록 핵심 아이디어 1가지를 정해 마감 기한을 고정하세요."
      ]
    },
    N: {
      action: "원칙과 데이터를 꼼꼼히 검증하여 안전하고 지속 가능한 체계를 세우는 '정밀 해결'",
      trap: "지나친 완벽주의로 인해 리스크 분석에 갇혀 실행 타이밍을 놓칠 수 있습니다.",
      steps: [
        "관련된 사실과 데이터를 시간 순서나 항목별로 엑셀/노트에 정리하여 가시화하세요.",
        "타인과의 규칙 및 역할 분담을 문서화하여 오해의 소지를 원천 차단하세요.",
        "‘80%의 완성도’에서 일단 1차 실행을 진행하고 점진적으로 보완하는 마인드를 가지세요."
      ]
    },
    H: {
      action: "상대방의 마음을 살피고 부드러운 분위기 속에서 접점을 찾는 '공감과 조율'",
      trap: "타인을 배려하느라 자신의 진짜 욕구나 손해를 감수하고 속앓이를 할 수 있습니다.",
      steps: [
        "갈등 당사자들의 속마음과 감정적 니즈를 1:1 티타임 등을 통해 경청하세요.",
        "내 의견을 말할 때 ‘나 전달법(I-Message)’을 활용해 부드럽지만 솔직하게 전달하세요.",
        "모두의 합의점을 찾기 전, 내가 양보할 수 없는 최소한의 기준선을 먼저 명확히 하세요."
      ]
    }
  }[result.subType] || {
    action: "균형 잡힌 성향을 활용한 유연한 대처",
    trap: "방향 선택에서 모호함이 생길 수 있습니다.",
    steps: ["상황 정리", "핵심 결정", "피드백 수렴"]
  };

  const localReport = `### 🧠 [성향 관점의 상황 분석]
당신은 **${result.code} (${typeInfo.title})** 유형으로, **${typeInfo.baseName}**의 깊은 통찰력과 **${typeInfo.dcnhTitle}**의 성향이 결합되어 있습니다.
입력해주신 고민("${question}")에 대해, 당신의 성향상 ${result.subType === 'D' ? '빠른 통제권과 결단이 서지 않을 때 가장 큰 피로' : result.subType === 'C' ? '틀에 박힌 해결책만 강요받을 때 답답함' : result.subType === 'N' ? '원칙이 무너지고 불확실성이 커질 때 극심한 스트레스' : '인간관계의 마찰과 냉랭한 분위기에 대한 부담'}을 느끼기 쉽습니다.

---

### ⚡ [핵심 강점 활용법]
당신이 가진 최고의 무기는 **${dcnhTrait.action}**입니다.
${result.mbti} 특유의 고유 역량(${typeInfo.domain})과 결합될 때 이 문제는 단순한 위기가 아닌, 당신의 영향력을 입증할 결정적 기회가 됩니다.

---

### 🎯 [3단계 실천 행동 가이드]
1. **1단계**: ${dcnhTrait.steps[0]}
2. **2단계**: ${dcnhTrait.steps[1]}
3. **3단계**: ${dcnhTrait.steps[2]}

---

### ⚠️ [성향상 주의할 맹점]
- ${dcnhTrait.trap}
- 특히 ${typeInfo.risks[0]}에 유의하세요.`;

  return {
    success: true,
    source: 'local',
    content: localReport
  };
}
