const fs = require('fs');
const path = require('path');

const mbtiData = {
  INTJ: {
    baseName: "전략가 (Mastermind)",
    core: "통찰력과 독립적 사고를 지닌 비전 설계자",
    domain: "전략적 분석 및 시스템 구축"
  },
  INTP: {
    baseName: "논리학자 (Logician)",
    core: "끝없는 지적 호기심과 정밀한 분석의 탐구자",
    domain: "원리 규명 및 이론 모델링"
  },
  ENTJ: {
    baseName: "통솔자 (Commander)",
    core: "대담한 비전과 거침없는 실행의 총사령관",
    domain: "조직 통솔 및 대규모 목표 달성"
  },
  ENTP: {
    baseName: "변론가 (Debater)",
    core: "기민한 두뇌와 재치로 통념에 도전하는 혁신가",
    domain: "새로운 패러다임 개척 및 브레인스토밍"
  },
  INFJ: {
    baseName: "옹호자 (Advocate)",
    core: "깊은 통찰력과 확고한 가치관을 지닌 선구자",
    domain: "인간 본질 이해 및 영감 부여"
  },
  INFP: {
    baseName: "중재자 (Mediator)",
    core: "진정성과 이상을 추구하는 사려 깊은 치유자",
    domain: "감성적 가치 창출 및 개인의 잠재력 지지"
  },
  ENFJ: {
    baseName: "선도자 (Protagonist)",
    core: "사람들의 마음을 움직이고 잠재력을 꽃피우는 조력자",
    domain: "공동체 결속 및 동기 부여 리더십"
  },
  ENFP: {
    baseName: "활동가 (Campaigner)",
    core: "자유로운 영혼과 넘치는 열정의 에너지 발전기",
    domain: "새로운 관계 촉진 및 창의적 영감 전파"
  },
  ISTJ: {
    baseName: "현실주의자 (Logistician)",
    core: "원칙과 사실을 수호하는 신뢰의 기둥",
    domain: "체계적 관리 및 프로세스 완결"
  },
  ISFJ: {
    baseName: "수호자 (Defender)",
    core: "헌신과 온기로 묵묵히 곁을 지키는 든든한 보호자",
    domain: "세심한 실무 지원 및 관계 안정화"
  },
  ESTJ: {
    baseName: "경영자 (Executive)",
    core: "탁월한 질서와 현실적 규율로 성과를 이끄는 관리자",
    domain: "자원 조직화 및 결과 지향 프로젝트 지휘"
  },
  ESFJ: {
    baseName: "집정관 (Consul)",
    core: "따뜻한 배려와 친화력으로 사람들을 잇는 허브",
    domain: "팀 분위기 조율 및 네트워크 활성화"
  },
  ISTP: {
    baseName: "장인 (Virtuoso)",
    core: "냉철한 관찰과 손끝의 기술로 문제를 해결하는 만능 해결사",
    domain: "즉각적인 기술적 문제해결 및 메커니즘 조작"
  },
  ISFP: {
    baseName: "모험가 (Adventurer)",
    core: "순간의 아름다움과 개성을 오롯이 표현하는 예술가",
    domain: "심미적 조형 및 감각적 경험 설계"
  },
  ESTP: {
    baseName: "사업가 (Entrepreneur)",
    core: "위험을 두려워하지 않고 현장에서 즉각 승부를 보는 행동파",
    domain: "위기 돌파 및 기회 포착 액션"
  },
  ESFP: {
    baseName: "연예인 (Entertainer)",
    core: "생동감 넘치는 매력으로 주변을 축제로 만드는 분위기 메이커",
    domain: "현장 에너지 극대화 및 공감대 형성"
  }
};

const dcnhData = {
  D: {
    name: "주도형 (Dominant)",
    suffix: "불도저 추진형",
    role: "결단과 지휘, 목표 돌파",
    color: "#FF4D4D",
    workStyle: "빠른 의사결정과 공격적인 목표 달성을 추구합니다.",
    subTrait: "방향이 흐려질 때 주저 없이 지휘권을 쥐고 장애물을 뚫고 나아갑니다."
  },
  C: {
    name: "창의형 (Creative)",
    suffix: "파격 혁신형",
    role: "새로운 가능성 발굴과 즉흥적 실험",
    color: "#FFE600",
    workStyle: "정형화된 틀을 깨고 예상치 못한 창의적 접근법을 모색합니다.",
    subTrait: "호기심을 자극하는 새로운 프로젝트에서 가장 빛을 발하며 기발한 아이디어를 쏟아냅니다."
  },
  N: {
    name: "체계형 (Normalizing)",
    suffix: "정밀 설계형",
    role: "규칙 수립, 품질 완결, 프로세스 표준화",
    color: "#2563EB",
    workStyle: "세부적인 디테일과 일관성 있는 절차를 통해 완성도를 극대화합니다.",
    subTrait: "감정 기복 없이 철저한 점검과 시스템화를 통해 오류 없는 결과를 만듭니다."
  },
  H: {
    name: "조화형 (Harmonizing)",
    suffix: "공감 조율형",
    role: "갈등 중재, 심리적 안정, 유연한 협업",
    color: "#00D084",
    workStyle: "구성원들의 마음을 보듬고 환경에 부드럽게 적응하며 평화를 유지합니다.",
    subTrait: "대립하는 의견들 사이에서 균형점을 찾아내고 구성원 모두가 편안한 환경을 조성합니다."
  }
};

const catalog = {};

Object.entries(mbtiData).forEach(([mbti, mInfo]) => {
  ['D', 'C', 'N', 'H'].forEach(sub => {
    const dInfo = dcnhData[sub];
    const code = `${mbti}-${sub}`;

    let title = "";
    let slogan = "";
    let strengths = [];
    let risks = [];
    let synergy = "";

    if (sub === 'D') {
      title = `행동력으로 비전을 관철하는 ${mInfo.baseName}`;
      slogan = `“생각을 머뭇거리지 않고 즉각적인 행동과 결과로 증명한다.”`;
      strengths = [
        "신속한 위기 돌파력과 목표 추진력",
        "명확한 우선순위 설정 및 결단력",
        "주변을 강하게 이끄는 주도적 에너지"
      ];
      risks = [
        "속도를 중시하다 팀원의 피로도나 정서적 반응을 간과할 위험",
        "타인의 신중한 의견을 답답하게 여길 수 있음"
      ];
      synergy = "체계형(N)의 꼼꼼한 백업과 조화형(H)의 완충 지원이 있을 때 최상의 시너지를 냅니다.";
    } else if (sub === 'C') {
      title = `기존 틀을 깨는 실험적 ${mInfo.baseName}`;
      slogan = `“정답은 하나가 아니다. 세상에 없던 새로운 길을 만든다.”`;
      strengths = [
        "파격적인 발상 전환과 독창적 아이디어 창출",
        "위기 상황에서의 임기응변과 유연한 적응력",
        "호기심과 지적 자극을 통한 주변 영감 고취"
      ];
      risks = [
        "새로운 시작은 빠르나 지루한 반복 뒷정리에 소홀해질 수 있음",
        "기존 규범이나 정해진 절차를 건너뛰려는 경향"
      ];
      synergy = "주도형(D)이 실행을 결단해주고 체계형(N)이 뒷수습 및 표준화를 맡아줄 때 혁신이 완성됩니다.";
    } else if (sub === 'N') {
      title = `원칙과 무결성을 수호하는 정밀 ${mInfo.baseName}`;
      slogan = `“완벽한 디테일과 견고한 시스템이 최고의 결과를 보장한다.”`;
      strengths = [
        "탁월한 품질 관리와 오차 없는 세부 분석력",
        "한결같은 신뢰성과 높은 약속 이행률",
        "복잡한 구조를 일목요연하게 정리하는 표준화 능력"
      ];
      risks = [
        "지나친 완벽주의로 인해 의사결정이 지연될 수 있음",
        "예상치 못한 급격한 변화나 모호한 상황에 스트레스"
      ];
      synergy = "창의형(C)의 번뜩이는 아이디어를 현실적 제도로 안착시키고, 주도형(D)의 속도를 안정적으로 통제합니다.";
    } else if (sub === 'H') {
      title = `사람과 균형을 연결하는 현자형 ${mInfo.baseName}`;
      slogan = `“모두가 화합하고 안정을 찾을 때 진정한 시너지가 일어난다.”`;
      strengths = [
        "탁월한 공감 능력과 심리적 완충 지대 역할",
        "어떤 환경에도 부드럽게 스며드는 유연한 적응력",
        "숨겨진 갈등을 조용히 치유하는 따뜻한 서포트"
      ];
      risks = [
        "자신의 솔직한 욕구나 주장을 억누르다 속앓이를 할 수 있음",
        "갈등을 피하려다 단호한 결단을 내려야 할 시기를 놓칠 위험"
      ];
      synergy = "추진력이 강한 주도형(D)의 마찰을 줄여주고, 정밀한 체계형(N)에게 유연한 쉼표를 제공합니다.";
    }

    catalog[code] = {
      code,
      mbti,
      dcnh: sub,
      dcnhTitle: dInfo.name,
      baseName: mInfo.baseName,
      title,
      slogan,
      color: dInfo.color,
      badge: `${mInfo.baseName.split(' ')[0]} × ${dInfo.name.split(' ')[0]}`,
      summary: `${mInfo.core}인 ${mbti}의 본질 위에, ${dInfo.subTrait}`,
      domain: mInfo.domain,
      workStyle: dInfo.workStyle,
      strengths,
      risks,
      synergy,
      advice: `[${code}를 위한 성장 처방전] ${dInfo.name}의 성향이 당신의 ${mbti} 강점을 독보적으로 만듭니다. 다만 ${risks[0]}에 유의하여 협업 시 시야를 넓히면 더욱 완벽해집니다.`
    };
  });
});

fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'typeCatalog.json'),
  JSON.stringify(catalog, null, 2),
  'utf8'
);

console.log(`성공적으로 64개 성격 유형 카탈로그를 생성했습니다! (총 ${Object.keys(catalog).length}개)`);
