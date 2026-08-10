export type YearKey = 1 | 2 | 3 | 4

export interface MediaItem {
  label: string
  src: string
  alt: string
  caption?: string
  fit?: 'cover' | 'contain'
  /** 그룹(같은 라벨이 연속된 첫 항목 기준) 라벨 아래에 렌더링되는 단락 설명 */
  description?: string[]
}

export interface Showcase {
  title: string
  description?: string
  items: MediaItem[]
}

export interface YearMeta {
  key: YearKey
  label: string
  range: string
  showcase?: Showcase
}

export interface CodeSnippet {
  title: string
  description?: string
  language:
    | 'sql'
    | 'python'
    | 'yaml'
    | 'typescript'
    | 'java'
    | 'kotlin'
    | 'ini'
    | 'river'
    | 'bash'
  code: string
}

export interface SectionTable {
  headers: string[]
  /** 셀이 배열이면 한 셀 안에서 여러 줄로 쌓아 렌더링 */
  rows: (string | string[])[][]
}

export interface CodeSection {
  slug: string
  title: string
  icon?: string
  headline?: string
  /** headline 과 note 사이에 렌더링되는 정리 표 */
  table?: SectionTable
  note?: string[]
  snippets: CodeSnippet[]
  media?: MediaItem[]
  /** true 면 media 를 코드 스니펫 위에 배치. 기본은 아래(false). */
  mediaAbove?: boolean
}

/**
 * 기술 선택의 흔적을 "배경 → 얻은 것 → 결정·감수한 것" 순으로 담는다.
 * question 을 제외한 모든 필드는 선택이다.
 */
export interface TechRationale {
  question: string
  preface?: string
  /** 이 결정이 만족해야 했던 제약 조건 */
  constraints?: string[]
  /** 무엇이 결정타였는지 — 여러 선택지 중 어디에 기준을 뒀는가 */
  decision?: string
  /** 채택으로 얻은 것 */
  reasons?: string[]
  /** 감수한 비용·포기한 것. 가능하면 이후 어떻게 관리했는지까지 함께 적는다 */
  tradeoffs?: string[]
  /** SkillBadge 로 좌측에 표시할 기술명. 비우면 question 텍스트가 헤더로 표시됩니다. */
  tech?: string
}

/**
 * "문제" 섹션의 한 항목 — 어떤 상황에서 무엇을 문제로 인식했는가.
 * 같은 인덱스의 SolutionStep 과 번호로 대응된다.
 */
export interface ProblemIssue {
  /** 짧은 문제명 (해결 단계와 같은 번호로 짝지어 읽힌다) */
  title: string
  /** 문제 상황과 인지 경위 (1~2문장) */
  description: string
}

/** "문제" 섹션 — 프로젝트가 놓인 상황과 인식한 문제들 */
export interface ProblemSection {
  /** 프로젝트가 놓인 상황·맥락 문단 */
  situation?: string[]
  /** 인식한 문제 목록 */
  issues: ProblemIssue[]
}

/** "해결" 섹션의 한 단계 — 같은 번호의 ProblemIssue 에 대응 */
export interface SolutionStep {
  title: string
  /** 해결 접근·판단·구현 (1~3문장) */
  approach: string
  /** 이 단계의 정량 성과 (선택) */
  result?: string
}

/** "리뷰" 섹션의 한 항목 — 회고 */
export interface ReviewItem {
  /** 예: '배운 점' · '아쉬운 점' · '이어진 개선' */
  label: string
  text: string
}

export interface ProjectMetric {
  label: string
  beforeValue: number
  beforeDisplay: string
  afterValue: number
  afterDisplay: string
  improvement?: string
  /** Y 축 tick 단위. 기본은 시간(ms/s 자동 변환). 'GB' | '%' 등 직접 지정 가능. */
  unit?: string
}

/**
 * 프로젝트 상세는 "헤더 → 문제 → 목표 → 해결 → 성과 → 리뷰" 의
 * 문제 해결 스토리텔링 순서로 렌더링된다.
 */
export interface Project {
  slug: string
  title: string
  period: string
  year: YearKey
  tags: string[]
  /** 헤더에 표시되는 한 줄 소개 */
  summary?: string
  /** 0~100 사이 본인 기여도 (%) — 헤더에 표시 */
  contribution?: number
  /** 본인 기여 영역에 대한 짧은 설명 (기여도 옆에 표시) */
  contributionScope?: string
  /** 헤더에 표시되는 공개 저장소 — 'owner/name' 형식 (예: 'lzyxion/rocket-desk') */
  repos?: string[]
  /** 문제 — 상황과 인식한 문제 */
  problem: ProblemSection
  /** 목표 — 무엇을 달성하려 했는가 */
  goals: string[]
  /** 해결 — 문제와 같은 번호로 대응되는 해결 단계 */
  solutions: SolutionStep[]
  /** 해결 하위: 아키텍처 도식 */
  media?: MediaItem[]
  /** 해결 하위: 기술 선택 이유 */
  techRationale?: TechRationale | TechRationale[]
  /** 해결 하위: 핵심 코드 */
  codeSections?: CodeSection[]
  /** 성과 — 한 줄 요약 (프로젝트 카드에도 사용) */
  outcome: string
  /** 성과 — Before/After 정량 지표 */
  metrics?: ProjectMetric[]
  /** 성과 — 핵심 기여 bullet (프로젝트 카드 '역할' 에도 사용) */
  roles: string[]
  /** 리뷰 — 회고 */
  review?: ReviewItem[]
}
