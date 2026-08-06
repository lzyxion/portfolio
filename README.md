# 제조 현장의 시계열 데이터를 다루는 데이터 엔지니어

**이진열 · Lee Jinyeol**

🔗 **https://leejinyeol170.github.io**

스마트 팩토리·IIoT 도메인에서 약 50개 제조업체, 2,000여 개 센서가 연결된 시계열 데이터 플랫폼의 데이터 처리·관제 영역을 담당해 왔습니다. **시계열 데이터 최적화** · **인프라 고도화** · **표준화 파이프라인 구축**으로 시스템 안정성과 운영 효율을 개선했고, 최근에는 **사내 문서 RAG 챗봇**을 설계·구현했습니다.

> 아래는 포트폴리오 사이트 메인 페이지의 내용입니다. 프로젝트별 문제 정의·해결 과정·아키텍처 다이어그램·운영 화면은 사이트의 상세 페이지에서 확인하실 수 있습니다.

---

## Skills

| 분류 | |
| --- | --- |
| Language | Java · Python |
| Backend | Spring Boot · FastAPI |
| Frontend | Vue |
| Database | PostgreSQL · TimescaleDB · pgvector · SQL |
| Data Engineering | Airflow · dbt |
| Monitoring | Grafana · Prometheus · Grafana Alloy |
| DevOps | Docker · Nginx · Linux · GitLab |
| AI · LLM | LangChain · RAG · vLLM · Claude Code |

---

## Career

**2026.07 ~ 진행중 · 프로젝트 — 사내 문서 RAG 챗봇 구축**  
*(주) 이노비 · 선임 연구원*  
LangChain 과 사내 자체 호스팅 vLLM(생성·임베딩·리랭커)·pgvector 로 사내 문서 RAG 챗봇을 전담 설계·구현하며, 2단 검색(리랭크)·함수콜링 에이전트·인라인 출처 인용으로 환각을 억제한 사내 지식 어시스턴트 기반을 마련하고 있습니다.

**2025.11 ~ 2026.06 · 프로젝트 — 파이프라인 구축 및 비즈니스 확장**  
*(주) 이노비 · 선임 연구원*  
Airflow·dbt 표준화 파이프라인을 구축하고, 멀티테넌시 기반 사내 자체 관리 대시보드를 아키텍처 설계부터 배포까지 전담 개발하며 후속 서비스의 확장 기반을 마련했습니다.

**2025.07 · 자격증 — 빅데이터분석기사**  
*한국데이터산업진흥원*

**2024.10 ~ 2025.05 · 프로젝트 — 인프라 고도화 및 장애 예방**  
*(주) 이노비 · 주임 연구원*  
Prometheus 메트릭으로 DB 부하를 진단해 복제(Replica) 격리를 도입하고, Grafana Alloy 알림 체계를 구축해 인프라 안정성과 장애 대응력을 높였습니다.

**2023.11 · 자격증 — 정보처리기사**  
*한국산업인력공단*

**2023.11 ~ 2024.04 · 프로젝트 — 데이터 아키텍처 및 쿼리 최적화**  
*(주) 이노비 · 연구원*  
TimescaleDB 기반으로 IIoT 시계열 데이터의 조회·집계·저장 구조를 최적화하고, 제조 현장 맞춤형 통합 관제 대시보드를 구축했습니다.

**2021.10 ~ 2022.04 · 교육 — 국비지원 교육 과정 수료: 자바/코틀린 웹&앱 개발**

**2014.03 ~ 2020.08 · 학력 — 광운대학교 화학공학과 학사**

---

## Projects

### 1. 사내 문서 기반 RAG 챗봇 구축 — 사내 지식 검색·질의응답 어시스턴트

`2026.07 ~ 진행중`

> **성과** — 사내 문서 RAG 챗봇을 설계·구현. 멀티쿼리·2단 리랭크로 검색 관련성을 높이고 강제 검색·인라인 출처 인용으로 환각을 억제해, 부서별 NAS 에 흩어진 문서를 뒤지던 평균 8분을 30초 질의로 줄인 사내 지식 어시스턴트. (진행중)

**역할**

- 멀티쿼리 확장 + bge-reranker 2단 검색(top_k → top_n)으로 컨텍스트 관련성 향상 (recall@5 68% → 94%)
- strict 강제 검색 + 인라인 `[n]` 출처 인용으로 무근거 답변(환각) 비율 25% → 4% 억제
- HWP·스캔 PDF(OCR) 멀티포맷 적재 + NAS 부서별 증분 동기화로 사내 문서 코퍼스 구축
- LangChain LCEL 파이프라인 + FastAPI SSE 스트리밍 · React(assistant-ui) UI·API 단일 이미지(:8000) 사내 서버 배포

**기술스택** — LangChain · RAG · vLLM · pgvector · FastAPI · React · PostgreSQL · Docker

[자세히 보기 →](https://leejinyeol170.github.io/projects/internal-rag-chatbot)

---

### 2. 데이터 파이프라인 구축 및 사내 자체 관리 대시보드 · 확장형 API 서버 개발

`2025.11 ~ 2026.06`

> **성과** — Airflow + dbt 표준화 파이프라인 도입으로 운영 공수 약 80% 절감·신규 집계 추가 작업 약 12배 가속, 멀티테넌시 기반 사내 자체 관리 대시보드를 아키텍처 설계부터 배포까지 전담 개발 — 후속 서비스 확장 기반 마련.

**역할**

- Apache Airflow 기반의 자동화 배치 파이프라인 및 집계 DAGs 를 구축하여 운영 공수 80% 절감
- dbt 를 도입하여 파편화된 제조 데이터 표준화 및 데이터 이상치(Outlier) 정제 파이프라인 구현
- 생성형 AI 를 활용한 생산성 극대화로 멀티테넌시 기반 사내 자체 관리 대시보드(후속 서비스 확장 기반)를 아키텍처 설계부터 배포까지 전담 개발

**기술스택** — Airflow · dbt · FastAPI · Vue.js · Docker · Nginx · GitLab CI/CD

[자세히 보기 →](https://leejinyeol170.github.io/projects/data-platform)

---

### 3. 시스템 인프라 고도화 및 모니터링, 알림 구축

`2024.10 ~ 2025.05`

> **성과** — Prometheus 진단·Slave DB 격리로 DB CPU 99% → 25% 안정화·아웃바운드 트래픽 10Mbps 이하 유지, Grafana Alloy 알림 체계 구축으로 현장 Edge 장비 다운율 25% → 0% 사전 예방.

**역할**

- 메인 DB CPU 과부하(99%) 문제를 Prometheus 메트릭으로 진단하여 팀 내 복제(Replication) 아키텍처 도입 근거 제시
- 실시간 관제 대시보드(Grafana)의 데이터 소스를 Slave DB 로 이전 — Master DB CPU 사용량 안정화(평균 25%) 및 네트워크 아웃바운드 트래픽 10Mbps 이하 유지로 초과 비용 개선
- 현장 PC 에 Grafana Alloy 에이전트를 도입하여 호스트 메트릭 수집 및 임계치 알림 체계를 구축, 메모리 고갈 전 사전 조치로 장비 다운율 25% → 0% 예방

**기술스택** — PostgreSQL · TimescaleDB · PgBouncer · Streaming Replication · Grafana · Grafana Alloy · Prometheus · VictoriaMetrics

[자세히 보기 →](https://leejinyeol170.github.io/projects/infra-monitoring)

---

### 4. 스마트 팩토리 IIoT 시계열 데이터 최적화 및 통합 관제 대시보드 구축

`2023.11 ~ 2024.04`

> **성과** — TimescaleDB 하이퍼테이블·연속집계·압축 정책 도입으로 IIoT 시계열 데이터 조회 2~3배 향상·집계 쿼리 70% 이상 단축·저장 공간 80% 이상 절감, 제조 현장 실시간 관제 시스템 토대 구축.

**역할**

- TimescaleDB 하이퍼테이블 아키텍처 및 하이퍼 함수 도입으로 시계열 데이터 조회 속도 평균 2~3배 향상
- 연속집계(Continuous Aggregates) 기능을 활용하여 수백만 건 규모의 통계/집계 쿼리 수행 시간 70% 이상 단축
- 하이퍼테이블 청크(Chunk) 단위 압축(Compression) 정책 수립으로 데이터 저장 공간 80% 이상 절감
- Grafana 를 활용하여 제조 현장 맞춤형 IIoT 센서 데이터 실시간 대시보드 구축

**기술스택** — TimescaleDB · Grafana · SQL

[자세히 보기 →](https://leejinyeol170.github.io/projects/iiot-monitoring)

---

## Contact

궁금한 점이나 협업 제안이 있다면 편하게 연락 주세요.

| | |
| --- | --- |
| Email | [wlsduf17@gmail.com](mailto:wlsduf17@gmail.com) |
| GitHub | [github.com/leejinyeol170](https://github.com/leejinyeol170) |
