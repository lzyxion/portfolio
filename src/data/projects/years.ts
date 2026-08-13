import type { YearKey, YearMeta } from './types'

export const years: Record<YearKey, YearMeta> = {
  1: {
    key: 1,
    label: '1년차',
    range: '2023.06 ~ 2024.05',
    showcase: {
      title: '실제 적용 화면',
      description:
        '현장 데이터를 실시간으로 탐색하고, 설비 상태와 에너지 지표를 확인하도록 구성한 Grafana 관제 화면입니다.',
      items: [
        {
          label: '통합 관제',
          src: `${import.meta.env.BASE_URL}architectures/iiot-dashboard-overview.png`,
          alt: 'Grafana IIoT 실시간 통합 관제 대시보드',
          caption: '통합 관제 — 현장 시계열 데이터를 한 화면에서 조회하는 대표 대시보드',
        },
        {
          label: '설비 분석',
          src: `${import.meta.env.BASE_URL}architectures/iiot-dashboard-analysis.png`,
          alt: 'Grafana 설비별 시계열 분석 대시보드',
          caption: '설비 분석 — 기간과 설비 조건에 따라 시계열 데이터를 비교·탐색',
        },
        {
          label: '에너지 현황',
          src: `${import.meta.env.BASE_URL}architectures/iiot-dashboard-energy.png`,
          alt: 'Grafana 에너지 사용량 대시보드',
          caption: '에너지 현황 — 집계 지표와 추이를 함께 확인하는 화면',
        },
      ],
    },
  },
  2: {
    key: 2,
    label: '2년차',
    range: '2024.06 ~ 2025.05',
    showcase: {
      title: '실제 적용 화면',
      description:
        '현장 노드 상태를 통합 관제하고, 메모리 고갈 전에 조치할 수 있도록 알람을 구성한 화면입니다.',
      items: [
        {
          label: '알람',
          src: `${import.meta.env.BASE_URL}architectures/infra-alert-rule.png`,
          alt: 'Grafana Alert rule — Memory Used Over 85%',
          caption:
            'Memory Used Over 85% — MemAvailable 기준 사용률 임계치(>85%) 알람 룰 · 최근 발화 이력',
        },
        {
          label: '대시보드',
          src: `${import.meta.env.BASE_URL}architectures/infra-node-metrics.png`,
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
      title: '실제 적용 화면',
      description:
        '멀티테넌시 관리·분석 기능을 하나의 서비스에서 제공하는 사내 자체 관리 대시보드입니다. 민감 정보는 블러 처리했습니다.',
      items: [
        {
          label: '통합 관제',
          src: `${import.meta.env.BASE_URL}architectures/data-platform-admin-dashboard.png`,
          alt: 'Sensor Gateway 관리자 대시보드 — 전체 업체·센서 현황과 알림 설정',
          caption:
            '관리자 대시보드 — 전체 업체·센서 현황 · Slack/Discord 웹훅 알림 · 업체별 센서 상태 (연도·프로젝트 필터)',
        },
        {
          label: '사용자',
          src: `${import.meta.env.BASE_URL}architectures/data-platform-energy-dashboard.png`,
          alt: 'Sensor Gateway 사용자 대시보드 — 에너지 사용량과 설비·공정별 수요 전력',
          caption:
            '사용자 대시보드 — 에너지 사용량 · 전월 대비 · 설비/공정별 수요 전력 · 센서 상태',
        },
        {
          label: '사용자',
          src: `${import.meta.env.BASE_URL}architectures/data-platform-period-analysis.png`,
          alt: 'Sensor Gateway 기간 분석 — 자산 계층 트리 기반 사용량 조회',
          caption:
            '기간 분석 — 자산 계층 트리 · 기간/집계 간격 선택 조회 · CSV 다운로드',
        },
      ],
    },
  },
  4: {
    key: 4,
    label: '4년차',
    range: '2026.06 ~ 현재',
    showcase: {
      title: '실제 적용 화면',
      description:
        '사내 문서 검색 범위와 엄격 모드를 선택하고, 답변 근거를 원문으로 확인할 수 있는 챗봇 화면입니다. 민감 정보는 블러 처리했습니다.',
      items: [
        {
          label: '홈',
          src: `${import.meta.env.BASE_URL}architectures/rag-chat-home.png`,
          alt: 'Rocket-Desk 새 대화 화면 — 엄격/일반 모드와 부서 범위 선택, 예시 질문 칩',
          caption:
            '새 대화 화면 — 엄격/일반 모드 · 부서 검색 범위 선택 · 모델 표시 · 예시 질문 칩',
        },
        {
          label: '문서 질의',
          src: `${import.meta.env.BASE_URL}architectures/rag-chat-citations.png`,
          alt: 'Rocket-Desk 엄격 모드 질의응답 — 문장 단위 [n] 출처 각주와 원문 링크, 관련도 표기',
          caption:
            '엄격 모드 질의응답 — 문장 단위 [n] 출처 각주 · 원문 파일/페이지 링크 · 관련도 점수 표기',
        },
      ],
    },
  },
}
