const SKILL_ICON_MAP: Record<string, string> = {
  // Backend
  'Spring Boot': 'logos:spring-icon',
  'Spring Boot (Java/Kotlin)': 'logos:spring-icon',
  'Spring Data JPA': 'logos:spring-icon',
  'Spring Security': 'logos:spring-icon',
  FastAPI: 'logos:fastapi-icon',
  'FastAPI (Python)': 'logos:fastapi-icon',
  SQLAlchemy: 'simple-icons:sqlalchemy',
  Java: 'logos:java',
  Kotlin: 'logos:kotlin-icon',

  // Frontend
  'Vue.js': 'logos:vue',
  Vue: 'logos:vue',

  // Database
  PostgreSQL: 'logos:postgresql',
  TimescaleDB: 'simple-icons:timescale',
  PgBouncer: 'mdi:database-arrow-right',
  SQL: 'mdi:database',
  'Streaming Replication': 'mdi:database-sync',
  VictoriaMetrics: 'simple-icons:victoriametrics',
  'Grafana Alloy': 'material-icon-theme:grafana-alloy',

  // DevOps / Infra
  Docker: 'logos:docker-icon',
  Nginx: 'logos:nginx',
  Linux: 'logos:linux-tux',
  'GitLab CI/CD': 'devicon:gitlab',
  GitLab: 'devicon:gitlab',

  // Data Engineering
  Airflow: 'logos:airflow-icon',
  'Apache Airflow': 'logos:airflow-icon',
  dbt: 'logos:dbt-icon',
  Grafana: 'logos:grafana',
  Prometheus: 'logos:prometheus',
  'OPC UA': 'mdi:transit-connection-variant',
  Python: 'logos:python',
  'Python (데이터분석)': 'logos:python',
  'Python (Pandas, Scikit-learn, etc.)': 'logos:python',
  Pandas: 'logos:pandas-icon',
  'Scikit-learn': 'logos:scikit-learn',

  // Security
  JWT: 'logos:jwt-icon',
  Casbin: 'simple-icons:casbin',

  // Collaboration
  '요구사항 분석': 'mdi:clipboard-text-search-outline',
  '이해관계자 커뮤니케이션': 'mdi:account-voice',
  '이슈 공유·조치 협업': 'mdi:handshake-outline',
  '프로젝트 문서화': 'mdi:file-document-edit-outline',

  // AI · Productivity
  'Claude Code': 'simple-icons:anthropic',
  LangChain: 'simple-icons:langchain',
  RAG: 'mdi:file-search-outline',
  vLLM: 'simple-icons:vllm',
  pgvector: 'simple-icons:postgresql',
  unstructured: 'mdi:file-document-multiple-outline',
}

const FALLBACK_ICON = 'mdi:code-tags'

export function getSkillIcon(name: string): string {
  return SKILL_ICON_MAP[name] ?? FALLBACK_ICON
}
