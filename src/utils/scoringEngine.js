/**
 * 64-MBTI Scoring Engine
 * MBTI 4대 축 (E-I, S-N, T-F, J-P) 및 DCNH 4대 하위유형 (D, C, N, H) 점수 계산 엔진
 */

export function calculateScores(responses, questions) {
  // responses: { [questionId]: 1 ~ 5 }
  
  // 1. 초기 점수 및 문항 수 집계
  const stats = {
    E: { score: 0, count: 0 },
    I: { score: 0, count: 0 },
    S: { score: 0, count: 0 },
    N: { score: 0, count: 0 },
    T: { score: 0, count: 0 },
    F: { score: 0, count: 0 },
    J: { score: 0, count: 0 },
    P: { score: 0, count: 0 },
    D: { score: 0, count: 0 },
    C: { score: 0, count: 0 },
    Norm: { score: 0, count: 0 }, // 'N' of DCNH (to avoid clash with Intuition N)
    H: { score: 0, count: 0 },
  };

  questions.forEach((q) => {
    const val = responses[q.id];
    if (val === undefined || val === null) return;

    if (q.dimension === 'EI') {
      if (q.positive === 'E') {
        stats.E.score += val;
        stats.E.count += 1;
        stats.I.score += (6 - val);
        stats.I.count += 1;
      } else {
        stats.I.score += val;
        stats.I.count += 1;
        stats.E.score += (6 - val);
        stats.E.count += 1;
      }
    } else if (q.dimension === 'SN') {
      if (q.positive === 'S') {
        stats.S.score += val;
        stats.S.count += 1;
        stats.N.score += (6 - val);
        stats.N.count += 1;
      } else {
        stats.N.score += val;
        stats.N.count += 1;
        stats.S.score += (6 - val);
        stats.S.count += 1;
      }
    } else if (q.dimension === 'TF') {
      if (q.positive === 'T') {
        stats.T.score += val;
        stats.T.count += 1;
        stats.F.score += (6 - val);
        stats.F.count += 1;
      } else {
        stats.F.score += val;
        stats.F.count += 1;
        stats.T.score += (6 - val);
        stats.T.count += 1;
      }
    } else if (q.dimension === 'JP') {
      if (q.positive === 'J') {
        stats.J.score += val;
        stats.J.count += 1;
        stats.P.score += (6 - val);
        stats.P.count += 1;
      } else {
        stats.P.score += val;
        stats.P.count += 1;
        stats.J.score += (6 - val);
        stats.J.count += 1;
      }
    } else if (q.dimension === 'DCNH') {
      const sub = q.subType === 'N' ? 'Norm' : q.subType;
      if (stats[sub]) {
        stats[sub].score += val;
        stats[sub].count += 1;
      }
    }
  });

  // 2. 백분율 계산 헬퍼
  const calcPairPercent = (posKey, negKey) => {
    const posScore = stats[posKey].score;
    const negScore = stats[negKey].score;
    const total = posScore + negScore;
    if (total === 0) return { posPercent: 50, negPercent: 50 };
    const posPercent = Math.round((posScore / total) * 100);
    return {
      posPercent,
      negPercent: 100 - posPercent
    };
  };

  const ei = calcPairPercent('E', 'I');
  const sn = calcPairPercent('S', 'N');
  const tf = calcPairPercent('T', 'F');
  const jp = calcPairPercent('J', 'P');

  // MBTI 결정
  const mbti = [
    ei.posPercent >= 50 ? 'E' : 'I',
    sn.posPercent >= 50 ? 'S' : 'N',
    tf.posPercent >= 50 ? 'T' : 'F',
    jp.posPercent >= 50 ? 'J' : 'P'
  ].join('');

  // DCNH 점수 정규화 (1~5점 평균 기준 0~100점 변환)
  const calcDcnhAvg = (key) => {
    const item = stats[key];
    if (!item.count) return 50;
    // 1~5 -> 0~100
    return Math.round(((item.score / item.count - 1) / 4) * 100);
  };

  const dcnhScores = {
    D: calcDcnhAvg('D'),
    C: calcDcnhAvg('C'),
    N: calcDcnhAvg('Norm'),
    H: calcDcnhAvg('H')
  };

  // 최고 점수 하위유형 도출
  let topSubType = 'D';
  let maxScore = -1;
  const sortedDcnh = Object.entries(dcnhScores).sort((a, b) => b[1] - a[1]);
  topSubType = sortedDcnh[0][0];
  maxScore = sortedDcnh[0][1];

  // 경계선 분석 (Borderline Warning)
  const warnings = [];
  if (Math.abs(ei.posPercent - 50) <= 6) warnings.push('외향(E)과 내향(I)의 성향이 균형을 이루고 있습니다.');
  if (Math.abs(sn.posPercent - 50) <= 6) warnings.push('감각(S)과 직관(N)의 균형 상태로, 상황에 따라 현실과 비전을 넘나듭니다.');
  if (Math.abs(tf.posPercent - 50) <= 6) warnings.push('사고(T)와 감정(F)의 균형 상태로, 이성과 공감의 조화를 중시합니다.');
  if (Math.abs(jp.posPercent - 50) <= 6) warnings.push('판단(J)과 인식(P)의 유연한 균형으로 계획과 즉흥성을 겸비했습니다.');
  
  if (sortedDcnh[0][1] - sortedDcnh[1][1] <= 5) {
    warnings.push(`주 하위유형(${sortedDcnh[0][0]})과 차순위(${sortedDcnh[1][0]})의 격차가 미세하여 복합적인 행동 특성을 보입니다.`);
  }

  const finalCode = `${mbti}-${topSubType}`;

  return {
    code: finalCode,
    mbti,
    subType: topSubType,
    secondarySubType: sortedDcnh[1][0],
    dimensions: {
      EI: { E: ei.posPercent, I: ei.negPercent, dominant: ei.posPercent >= 50 ? 'E' : 'I' },
      SN: { S: sn.posPercent, N: sn.negPercent, dominant: sn.posPercent >= 50 ? 'S' : 'N' },
      TF: { T: tf.posPercent, F: tf.negPercent, dominant: tf.posPercent >= 50 ? 'T' : 'F' },
      JP: { J: jp.posPercent, P: jp.negPercent, dominant: jp.posPercent >= 50 ? 'J' : 'P' }
    },
    dcnhScores,
    sortedDcnh,
    warnings,
    answeredCount: Object.keys(responses).length,
    totalQuestions: questions.length
  };
}
