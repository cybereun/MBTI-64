# 🧩 64-MBTI // 세분화 성격 진단 & AI 분석기

> **네오 브루탈리즘(Neo-Brutalism)** 대시보드 디자인과 소시오닉스 **DCNH 4대 하위유형**을 결합한 64가지 성격 분석 및 질문 해결 웹 애플리케이션입니다.

---

## ✨ 핵심 기능

1. **MBTI 16 × DCNH 4 = 64가지 세분화 유형 판정**
   - 기본 16가지 MBTI 축 (E/I, S/N, T/F, J/P)
   - 소시오닉스 DCNH 하위성향 (주도형 D, 창의형 C, 체계형 N, 조화형 H)
   - 8대 척도 백분율 게이지 및 스펙트럼 차트 제공
2. **간편하고 재미있는 입력 인터랙션**
   - 키보드 단축키(1~5) 지원
   - 카드 넘김 햅틱 반응
   - 지능형 단어 단위 줄바꿈 (`word-break: keep-all`, `text-wrap: balance`)
   - 퀵 모드 (16문항) & 빠른 시연 자동응답 기능
3. **네오 브루탈리즘(Neo-Brutalism) 대시보드**
   - 굵은 3~4px 블랙 테두리와 하드 오프셋 그림자
   - 고대비 컬러 블록 (옐로우, 블루, 레드, 그린, 크림)
   - SNS 공유용 고화질 리포트 이미지(PNG) 다운로드
4. **성향 기반 질문 & 상황 심층 분석기 (`TYPE-ADVISOR`)**
   - 사용자가 고민이나 직면한 갈등/선택 상황을 입력하면 본인의 64유형 성향을 바탕으로 맞춤 솔루션 도출
   - 4단 분석 리포트: [성향 분석] → [핵심 강점 무기] → [3단계 실천 행동 플랜] → [주의할 맹점]
   - 상시 노출 초기화 버튼(`입력 비우기`, `전체 초기화`, `새 질문`) 제공
   - Google Gemini API 실시간 연동 옵션 지원
5. **64가지 세분화 성격 백과 (도감)**
   - 64개 전체 유형 검색 및 필터링, 상세 모달 열람
6. **Poor Story 감성 폰트 적용**
   - 친근하고 키치한 감성의 손글씨 폰트 기본 적용

---

## 🚀 빠른 시작

### 방법 1. 무설치 독립형 실행 (권장)
- `run.bat` 파일을 더블클릭하거나 `standalone.html`을 브라우저(크롬, 엣지 등)로 열면 별도 설치 없이 즉시 실행됩니다.

### 방법 2. 개발 서버 실행
```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev
```

---

## 🛠️ 기술 스택
- **Frontend**: React 18 / Vite / Tailwind CSS (Neo-Brutalism Custom)
- **Typography**: Poor Story (Google Fonts & Local TTF)
- **Icons & Graphics**: Lucide Icons, Canvas Confetti, HTML-to-Image
- **Scoring Engine**: 8-Dimension Normalized Algorithm
- **AI Advisor**: Dual Engine (Built-in Rule Engine & Google Gemini 1.5)
