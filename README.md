# Data Engineering & Backend Portfolio

**Lee Jinyeol · 이진열**

제조 현장의 시계열 데이터를 바탕으로 데이터 파이프라인, 백엔드 서비스, 운영 환경을 연결해 온 엔지니어의 포트폴리오입니다.

약 50개 고객사와 2,000개 센서에서 하루 약 288만 행이 쌓이는 환경에서 데이터 모델링·변환 파이프라인·API·관측성을 구축했습니다.

**[포트폴리오 바로가기](https://lzyxion.github.io/portfolio/)** · [GitHub](https://github.com/lzyxion) · [Email](mailto:wlsduf17@gmail.com)

## About

- Airflow·dbt 기반 표준화 파이프라인으로 센서별 수기 집계 정의·수정 반복 작업을 약 80% 줄이고, 신규 집계 추가 작업을 약 3시간에서 약 15분으로 단축했습니다.
- TimescaleDB 하이퍼테이블·Continuous Aggregate·압축 정책으로 시계열 조회를 약 3배 개선하고, 월별 집계 시간을 약 70% 단축했습니다.
- FastAPI·Casbin 기반 멀티테넌시 API에 테넌트 격리·권한 제어·Replica fallback을 구성했습니다.
- 사내 GPU 환경에서 RAG 챗봇을 설계·구현해 검색 확인 시간을 약 8분에서 약 30초로 줄이고, recall@5를 68%에서 94%로 개선했습니다.

## Skills

| 영역 | 기술 |
| --- | --- |
| Backend | Python · FastAPI · Java · Spring Boot |
| Data Platform | Airflow · dbt · SQL · PostgreSQL · TimescaleDB |
| Infrastructure · Observability | Docker · Nginx · Linux · GitLab CI/CD · Prometheus · Grafana · Grafana Alloy |
| Frontend | Vue |

## Projects

| 프로젝트 | 기간 | 담당 | 핵심 성과 | 상세 |
| --- | --- | --- | --- | --- |
| 사내 문서 기반 RAG 챗봇 구축 | 2026.07 ~ 2026.08 | RAG 파이프라인·백엔드·프론트엔드·인프라 전담 | 문서 검색·확인 시간 약 8분 → 약 30초, recall@5 68% → 94% | [보기](https://lzyxion.github.io/portfolio/projects/internal-rag-chatbot) |
| Airflow·dbt 기반 데이터 표준화 파이프라인 및 멀티테넌시 API 구축 | 2025.11 ~ 2026.06 | 백엔드·프론트엔드·인프라·파이프라인 전담 | 반복 운영 작업 약 80% 감소, 신규 집계 추가 약 3시간 → 약 15분 | [보기](https://lzyxion.github.io/portfolio/projects/data-platform) |
| 시스템 인프라 고도화 및 모니터링·알림 구축 | 2024.10 ~ 2025.05 | DB 부하 진단·조회 부하 분리·Edge 모니터링/알림 | 메인 DB CPU 99% → 25%, 현장 Edge 장비 다운율 25% → 0% 예방 | [보기](https://lzyxion.github.io/portfolio/projects/infra-monitoring) |
| 스마트 팩토리 IIoT 시계열 데이터 최적화 및 통합 관제 대시보드 구축 | 2023.11 ~ 2024.04 | 데이터 시각화·통합 관제 대시보드 구축 | 조회 450ms → 150ms, 월별 집계 1.8s → 540ms, 저장 공간 약 80% 절감 | [보기](https://lzyxion.github.io/portfolio/projects/iiot-monitoring) |

각 상세 페이지에서는 문제 → 목표 → 해결 → 성과 → 리뷰 흐름으로 아키텍처, 기술 선택, 핵심 구현, 실제 적용 화면을 확인할 수 있습니다.

## Career

### (주) 이노비 · 선임 연구원

`2023.11 ~ 현재`

- 스마트팩토리·IIoT 시계열 데이터 플랫폼의 데이터 처리·관제·운영 고도화 담당
- 데이터 표준화 파이프라인과 멀티테넌시 API·사내 자체 관리 대시보드 설계·개발
- DB 부하 분석·복제 구성·모니터링 및 알림 체계 구축으로 서비스 안정성 개선

## Education & Certifications

- **광운대학교 화학공학과 학사** · 2014.03 ~ 2020.08
- **빅데이터분석기사** · 2025.07
- **정보처리기사** · 2023.11
