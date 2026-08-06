import type { YearKey, YearMeta } from './types'

export const years: Record<YearKey, YearMeta> = {
  1: {
    key: 1,
    label: '1년차',
    range: '2023.06 ~ 2024.05',
    showcase: {
      title: 'Showcase',
      description:
        'TimescaleDB, Grafana 기반 위에서 재직 기간 동안 누적·확장된 제조 현장 맞춤형 실시간 대시보드입니다. 다양한 플러그인을 활용했으며, 특히 ECharts.js 를 활용해 커스텀 차트를 직접 구성하여 제조 현장 요구에 맞는 시각화를 제공했습니다.',
      items: Array.from({ length: 6 }, (_, i) => {
        const n = String(i + 1).padStart(2, '0')
        return {
          label: '대시보드',
          src: `${import.meta.env.BASE_URL}architectures/dashboard-${n}.png`,
          alt: `Grafana IIoT 실시간 모니터링 대시보드 ${n}`,
        }
      }),
    },
  },
  2: {
    key: 2,
    label: '2년차',
    range: '2024.06 ~ 2025.05',
    showcase: {
      title: 'Showcase',
      description:
        '현장 Edge 서버에 일괄 배포한 Grafana Alloy 가 호스트 메트릭을 VictoriaMetrics 로 push 수집하고, 이를 Grafana 에서 감시·시각화하는 화면입니다. 단순 Used 가 아닌 MemAvailable 기준으로 사용률을 계산하는 PromQL 룰로 메모리 고갈 이전에 사전 알람을 발송하며, 다중 노드의 자원 상태는 하나의 대시보드에서 통합해 확인합니다.',
      items: [
        {
          label: '알람',
          src: `${import.meta.env.BASE_URL}architectures/project2-01.png`,
          alt: 'Grafana Alert rule — Memory Used Over 85%',
          caption:
            'Memory Used Over 85% — MemAvailable 기준 사용률 임계치(>85%) 알람 룰 · 최근 발화 이력',
        },
        {
          label: '대시보드',
          src: `${import.meta.env.BASE_URL}architectures/project2-02.png`,
          alt: 'Grafana Node Exporter Full 대시보드 — 다중 노드 호스트 메트릭 통합 조회',
          caption:
            'Node Exporter Full — 다중 노드 CPU · 메모리 · 디스크 · 네트워크 통합 대시보드',
        },
      ],
    },
  },
  3: {
    key: 3,
    label: '3년차',
    range: '2025.06 ~ 2026.05',
    showcase: {
      title: 'Showcase',
      description:
        '멀티테넌시 사내 자체 관리 대시보드의 화면입니다. 관리자용 통합 관제·테넌트 관리부터 사용자용 에너지 대시보드·분석 화면까지 하나의 서비스로 제공합니다. (업체명 등 민감 정보는 블러 처리)',
      items: [
        {
          label: '관리자',
          src: `${import.meta.env.BASE_URL}architectures/project3-01.png`,
          alt: 'Sensor Gateway 관리자 대시보드 — 전체 업체·센서 현황과 알림 설정',
          caption:
            '관리자 대시보드 — 전체 업체·센서 현황 · Slack/Discord 웹훅 알림 · 업체별 센서 상태 (연도·프로젝트 필터)',
        },
        {
          label: '관리자',
          src: `${import.meta.env.BASE_URL}architectures/project3-02.png`,
          alt: 'Sensor Gateway 테넌트 관리 — 업체별 상태·DB 연결 관리 테이블',
          caption:
            '테넌트 관리 — 업체별 상태 · Airflow On/Off · 센서 타입 · Master/Replica DB 연결 관리',
        },
        {
          label: '사용자',
          src: `${import.meta.env.BASE_URL}architectures/project3-03.png`,
          alt: 'Sensor Gateway 사용자 대시보드 — 에너지 사용량과 설비·공정별 수요 전력',
          caption:
            '사용자 대시보드 — 에너지 사용량 · 전월 대비 · 설비/공정별 수요 전력 · 센서 상태',
        },
        {
          label: '사용자',
          src: `${import.meta.env.BASE_URL}architectures/project3-04.png`,
          alt: 'Sensor Gateway 기간 분석 — 자산 계층 트리 기반 사용량 조회',
          caption:
            '기간 분석 — 자산 계층 트리 · 기간/집계 간격 선택 조회 · CSV 다운로드',
        },
        {
          label: '사용자',
          src: `${import.meta.env.BASE_URL}architectures/project3-05.png`,
          alt: 'Sensor Gateway 계측 분석 — 센서 단위 원본 데이터 차트 조회',
          caption:
            '계측 분석 — 센서 단위 원본 데이터 조회 · 표시 컬럼 선택 · 구간 줌 탐색',
        },
      ],
    },
  },
  4: {
    key: 4,
    label: '4년차',
    range: '2026.06 ~ 현재',
    showcase: {
      title: 'Showcase',
      description:
        '사내 문서 RAG 챗봇의 실제 화면입니다. React (assistant-ui) 챗 UI 로 엄격/일반 모드 · 부서 검색 범위 선택 · SSE 스트리밍 · [n] 출처 인용을 제공하며, 함수콜링으로 사내 설비 데이터 조회까지 확장했습니다. (대화 목록 · 업체명 등 민감 정보는 블러 처리)',
      items: [
        {
          label: '홈',
          src: `${import.meta.env.BASE_URL}architectures/project4-01.png`,
          alt: 'Rocket-Desk 새 대화 화면 — 엄격/일반 모드와 부서 범위 선택, 예시 질문 칩',
          caption:
            '새 대화 화면 — 엄격/일반 모드 · 부서 검색 범위 선택 · 모델 표시 · 예시 질문 칩',
        },
        {
          label: '문서 질의',
          src: `${import.meta.env.BASE_URL}architectures/project4-02.png`,
          alt: 'Rocket-Desk 엄격 모드 질의응답 — 문장 단위 [n] 출처 각주와 원문 링크, 관련도 표기',
          caption:
            '엄격 모드 질의응답 — 문장 단위 [n] 출처 각주 · 원문 파일/페이지 링크 · 관련도 점수 표기',
        },
        {
          label: '데이터 질의',
          src: `${import.meta.env.BASE_URL}architectures/project4-03.png`,
          alt: 'Rocket-Desk 설비 데이터 질의 — 함수콜링으로 센서 집계를 조회해 차트와 CSV 로 응답',
          caption:
            '설비 데이터 질의 — 함수콜링으로 센서 집계 조회 · 차트 시각화 · CSV 다운로드',
        },
      ],
    },
  },
}
