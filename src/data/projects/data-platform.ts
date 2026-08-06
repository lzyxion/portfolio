import type { Project } from './types'

export const dataPlatform: Project = {
    slug: 'data-platform',
    title: '데이터 파이프라인 구축 및 사내 자체 관리 대시보드 · 확장형 API 서버 개발',
    period: '2025.11 ~ 2026.06',
    year: 3,
    contribution: 100,
    contributionScope: '백엔드 · 프론트엔드 · 인프라 · 파이프라인 전담',
    tags: ['Airflow', 'dbt', 'FastAPI', 'Vue.js', 'Docker', 'Nginx', 'GitLab CI/CD'],
    summary:
      'Grafana 시각화의 한계와 파이프라인 파편화를 계기로, Airflow·dbt 표준화 파이프라인과 멀티테넌시 기반 사내 자체 관리 대시보드·확장형 API 서버를 개발해 완성한 프로젝트입니다.',
    problem: {
      situation: [
        '업체가 누적되면서 집계 방식과 업체별 DB 에 흩어진 파이프라인은 관리 비용이 계속 늘어났고, Grafana 기본 시각화로는 업체별 맞춤 요구를 담기 어려워 자체 대시보드에 대한 요구가 커졌습니다. 여기에 신규 비즈니스 대응까지 겹치면서, 파이프라인 중앙화와 자체 서비스 기반을 함께 마련해야 하는 상황이었습니다.',
      ],
      issues: [
        {
          title: 'Cagg 의 한계에 부딪힌 집계',
          description:
            '1년차부터 집계를 TimescaleDB Continuous Aggregate(Cagg) 로 운영해왔지만, 업체가 늘자 단일 SELECT 표현 제약으로 복잡한 JOIN·전처리·조건 분기를 담기 어렵고, refresh 주기 기반이라 정확한 시점 스케줄링이 안 되며, 업체별 DB 마다 정의가 흩어져 관리 비용이 누적됐습니다.',
        },
        {
          title: '제각각인 센서 테이블 — 작업 한 건에 3시간',
          description:
            '업체·장비별 센서 테이블이 컬럼 명세·단위·이상값 처리 기준까지 제각각이라, 새 집계·리포트를 추가할 때마다 수기 SQL 로 정제 로직을 다시 짜 작업 한 건에 3시간씩 걸렸습니다.',
        },
        {
          title: '전 영역을 떠안은 신규 서비스',
          description:
            '사내 자체 관리 대시보드와 후속 서비스의 공통 기반이 될 멀티테넌시 기반 API 서버를, 백엔드부터 프론트엔드·인프라까지 전담으로 빠르게 완성해야 했습니다.',
        },
      ],
    },
    goals: [
      '업체별 DB 에 흩어진 집계 정의를 중앙에서 관리·스케줄링하는 파이프라인 체계로 전환',
      '파편화된 센서 데이터의 표준화·이상값 정제 규칙을 코드로 강제해 데이터 품질과 작업 속도를 함께 확보',
      '여러 업체를 하나의 서비스로 수용하는 멀티테넌시 기반 자체 서비스 완성 — 후속 서비스 확장 대비',
    ],
    solutions: [
      {
        title: '집계를 코드로 — Airflow 파이프라인 중앙화',
        approach:
          '집계를 DB 기능에 묶는 대신 코드로 끌어내 Airflow 로 중앙화했습니다. DAG task 로 SQL·Python·외부 호출을 자유롭게 조합하고, cron 기반 정확한 실행 시점과 의존성·재시도·백필 같은 운영 컨트롤을 확보했으며, 흩어졌던 집계 정의를 단일 Airflow 인스턴스로 모았습니다.',
        result: '파이프라인 운영 공수 약 80% 절감',
      },
      {
        title: 'dbt 표준화 — 데이터 품질을 코드로 강제',
        approach:
          '전처리·표준화 로직을 코드로 통일하기 위해 Airflow 와 자연스럽게 결합되는 dbt 를 도입했습니다. ref()·sources 로 의존성·lineage 를 자동 추적해 staging → intermediate → mart 로 표준화하고, tests·macros 로 이상값 검출·정제 규칙을 모든 모델에 일관 적용해 데이터 품질을 코드로 강제했습니다.',
        result: '신규 집계/리포트 추가 약 3시간 → 약 15분 (약 12배 가속)',
      },
      {
        title: '생성형 AI 레버리지 — 설계부터 배포까지 전담',
        approach:
          '생성형 AI 를 단순 코드 자동완성을 넘어 설계·리팩터링·반복 작업까지 맡기는 방식으로 활용해 생산성을 끌어올렸습니다. 그 위에서 멀티테넌시 기반 사내 자체 관리 대시보드를 아키텍처 설계부터 Docker·Nginx·GitLab CI/CD 배포까지 전담 개발로 완성하고, 후속 서비스가 그대로 올라탈 확장 기반까지 마련했습니다.',
        result: '멀티테넌시 기반 서비스 전담 완성 — 후속 서비스 확장 기반 마련',
      },
    ],
    review: [
      {
        label: '배운 점',
        text: '1년차에 스스로 도입한 Cagg 의 한계를 스스로 걷어내며, 도구 선택은 "지금 규모" 가 아니라 "확장 경로" 를 기준으로 해야 한다는 것을 체감했습니다. 업체가 늘어도 운영 공수가 선형으로 늘지 않는 구조(중앙화·표준화)가 확장의 전제였습니다.',
      },
      {
        label: '배운 점',
        text: '생성형 AI 를 단순 자동완성이 아니라 설계·리팩터링·반복 작업을 맡기는 파트너로 쓰는 개발 워크플로를 확립했고, 그 생산성이 멀티테넌시 서비스를 전담으로 완성할 수 있었던 바탕이 되었습니다.',
      },
      {
        label: '이어진 과제',
        text: 'dbt tests 로 정제 규칙을 강제하는 단계까지 왔지만, 품질 지표를 상시 관측하는 데이터 품질 모니터링과 후속 서비스 도메인 기능 고도화는 다음 단계로 이어가고 있습니다.',
      },
    ],
    outcome:
      'Airflow + dbt 표준화 파이프라인 도입으로 운영 공수 약 80% 절감·신규 집계 추가 작업 약 12배 가속, 멀티테넌시 기반 사내 자체 관리 대시보드를 아키텍처 설계부터 배포까지 전담 개발 — 후속 서비스 확장 기반 마련.',
    metrics: [
      {
        label: '데이터 파이프라인 운영 공수 (상대 비율)',
        beforeValue: 100,
        beforeDisplay: '100%',
        afterValue: 20,
        afterDisplay: '20%',
        improvement: '약 80% 절감',
        unit: '%',
      },
      {
        label: '신규 집계/리포트 추가 작업 시간',
        beforeValue: 3,
        beforeDisplay: '약 3시간',
        afterValue: 0.25,
        afterDisplay: '약 15분',
        improvement: '약 12× 빨라짐',
        unit: 'h',
      },
    ],
    roles: [
      'Apache Airflow 기반의 자동화 배치 파이프라인 및 집계 DAGs 를 구축하여 운영 공수 80% 절감',
      'dbt 를 도입하여 파편화된 제조 데이터 표준화 및 데이터 이상치 (Outlier) 정제 파이프라인 구현',
      '생성형 AI 를 활용한 생산성 극대화로 멀티테넌시 기반 사내 자체 관리 대시보드 (후속 서비스 확장 기반) 를 아키텍처 설계부터 배포까지 전담 개발',
    ],
    media: [
      {
        label: '아키텍처',
        src: `${import.meta.env.BASE_URL}architectures/iot_dataplatform_architecture.svg`,
        alt: '데이터 표준화 파이프라인 · 사내 자체 관리 대시보드 API 서버 아키텍처',
        description: [
          '3년차에 구현한 범위를 중심으로 그린 아키텍처입니다. 1·2년차에 구축한 수집·복제 인프라는 클라우드 TimescaleDB Primary 와 사내 Replica 두 노드 (기존 표기) 로만 남기고, 사내 내부 서버에 신설한 Airflow + dbt 표준화 파이프라인과 FastAPI · Vue 서비스 계층을 다룹니다.',
          '이 파이프라인이 다루는 원본은 현재 전체 업체 기준 센서 약 2,000개를 1분 주기로 받아 하루 288만 행 · 약 600MB 규모입니다. Airflow 가 dbt 모델 (staging → intermediate → mart) 을 스케줄링해 클라우드 원본을 표준화·집계된 마트 테이블로 가공·적재하고 (mart write), 마트는 Streaming Replication 으로 사내 Replica 에 내려옵니다. FastAPI 가 Replica 의 마트를 읽어 사내 자체 관리 대시보드 (Vue) 와 관리자 페이지에 REST API 로 제공하며, 후속 서비스가 올라갈 공통 API 기반이 됩니다.',
        ],
      },
    ],
    techRationale: [
      {
        question: 'Airflow 를 도입한 이유',
        tech: 'Airflow',
        preface:
          '1년차에 도입한 TimescaleDB Continuous Aggregate(Cagg) 로 대부분의 집계 처리를 운영해왔지만, 업체 수가 늘어나면서 한계가 드러났습니다. Cagg 는 단일 SELECT 표현 안에서만 가능해 복잡한 JOIN·전처리·조건 분기를 담기 어려웠고, refresh_interval 기반이라 "정확한 시점" 스케줄링이 불가능했으며, 업체별 DB 가 늘면서 각 DB 의 Cagg 정의·관리 비용이 누적되었습니다. 이를 해소하기 위해 표준화·집계 파이프라인을 Airflow 로 전환·중앙화하기로 결정했습니다.',
        decision:
          'Cagg 를 더 잘게 쪼개거나 뷰를 겹쳐 버티는 방법도 있었지만, 그건 업체가 늘어날 때마다 관리 대상이 같이 늘어나는 방향이었습니다. 집계를 DB 기능 안에 두느냐 코드로 꺼내느냐의 문제로 보고, 업체가 늘어도 운영 공수가 선형으로 늘지 않으려면 정의가 한 곳에 모여야 한다는 기준으로 코드 쪽을 택했습니다.',
        reasons: [
          'DAG task 로 SQL · Python · 외부 호출까지 자유롭게 조합 가능 — Cagg 의 단일 SELECT 표현력 제약을 우회하고 복잡한 전처리·집계 로직을 코드로 구성할 수 있습니다.',
          'cron 기반 정확한 실행 시점 + 의존성·재시도·SLA·백필 같은 운영 컨트롤 확보 — 단순 "주기 refresh" 만 가능한 Cagg 대비 운영 시점 통제력이 강화됩니다.',
          '업체별 DB 마다 흩어져 있던 Cagg 정의를 단일 Airflow 인스턴스의 DAG 으로 중앙 집중 관리 — 업체가 늘어도 운영·변경 공수가 선형으로 증가하지 않습니다.',
        ],
        tradeoffs: [
          'DB 안에서 알아서 돌던 갱신이 이제 별도 스케줄러 위에서 돕니다. 집계가 DB 와 함께 죽고 사는 대신, 상시 운영해야 할 컴포넌트가 하나 늘었습니다.',
          '모든 업체의 집계가 단일 Airflow 인스턴스에 의존하게 됩니다. 테넌트별 3분 간격 staggered cron 과 Pool 슬롯으로 동시 실행·동시 쓰기를 분산해 이 집중도를 관리하고 있습니다.',
        ],
      },
      {
        question: 'dbt 를 도입한 이유',
        tech: 'dbt',
        preface:
          '업체·장비별로 누적되어 온 센서 테이블이 파편화되어 컬럼 명세·단위·이상값 처리 기준이 제각각이라 관리 비용이 누적되었고, 이상값(Outlier) 정제 필요성도 함께 커졌습니다. 전처리·표준화 로직을 코드로 통일·중앙 관리할 수단이 필요했고, Airflow 와 자연스럽게 결합되는 dbt 를 채택해 데이터 표준화·중앙 관리 체계를 구축했습니다.',
        decision:
          '전처리를 Python 으로 옮겨 파이프라인 코드 안에서 처리하는 방법도 있었지만, 그러면 팀이 이미 쓰고 있던 SQL 자산을 버리고 다시 쓰는 일이 됩니다. SQL 을 그대로 두고 그 위에 의존성·테스트·문서만 얹는 쪽을 택했고, 그래서 도입 비용이 거의 들지 않았습니다.',
        reasons: [
          'ref() · sources 로 모델 간 의존성·lineage 가 자동 추적되어 파편화된 테이블을 staging → intermediate → mart 의 일관된 흐름으로 표준화·중앙 관리할 수 있게 되었습니다.',
          'tests · macros 로 이상값 검출·전처리 규칙을 모든 모델에 일관 적용 — 수기 SQL 로 흩어져 있던 정제 로직을 제거하고 데이터 품질을 코드로 강제했습니다.',
          '기존 팀 SQL 자산을 그대로 살리면서 모델링·테스트·문서화·lineage 가 한 번에 결합 — 도입 학습 곡선이 낮고 운영 공수 절감 효과가 빠르게 가시화되었습니다.',
        ],
        tradeoffs: [
          'dbt 는 SELECT 결과를 테이블로 만드는 도구라 적재 이전 단계(수집·외부 API 호출)는 담을 수 없습니다. 그 부분은 Airflow task 로 남겨 두 도구의 역할을 갈랐습니다.',
          'Cosmos 가 dbt 모델 하나를 Airflow 태스크 하나로 펼치기 때문에, 모델이 늘수록 공유 DB 호스트에 동시 쓰기가 폭증할 수 있습니다. 전용 Pool 슬롯으로 동시 쓰기에 상한을 두고 씁니다.',
        ],
      },
      {
        question: 'FastAPI 를 선택한 이유',
        tech: 'FastAPI',
        preface:
          '사내 자체 관리 대시보드와 후속 서비스가 공통으로 올라갈 API 백엔드는 다룰 수 있는 후보인 Spring Boot 와 FastAPI 사이에서 검토했고, 빠른 출시·시계열 조회 성능·API 명세 동기화 비용을 종합적으로 고려해 FastAPI 를 채택했습니다.',
        decision:
          '판단 기준을 프레임워크의 완성도가 아니라 "혼자 전담하는 상황에서 어디에 시간을 덜 쓰는가" 에 뒀습니다. 백엔드와 프론트엔드를 같은 사람이 만드는 구조라 API 명세를 따로 맞추는 비용이 특히 크게 다가왔고, pydantic 모델 하나에서 입력 검증과 OpenAPI 스펙이 동시에 나오는 쪽을 택했습니다. 파이프라인이 이미 Python 이라 언어를 하나로 유지할 수 있다는 점도 함께 봤습니다.',
        reasons: [
          'pydantic 모델 기반으로 OpenAPI(Swagger) 스펙이 자동 생성·동기화되어 프론트엔드(Vue) 와의 API 계약을 별도 어노테이션·설정 없이 일치시킬 수 있습니다.',
          '타입 힌트 기반 자동 검증과 가벼운 의존성 주입으로 보일러플레이트가 적어, 전담 개발 환경에서 백엔드 개발 속도를 빠르게 확보할 수 있었습니다.',
          'async/await 비동기 처리로 시계열 데이터 조회 같은 I/O 바운드 워크로드에서 Spring Boot 동기 처리 대비 더 높은 동시성을 확보할 수 있을 것으로 판단했습니다.',
        ],
        tradeoffs: [
          'Spring Boot 처럼 인증·권한·트랜잭션에 정해진 방식이 있는 것이 아니라, 구조를 직접 정해야 하는 범위가 넓습니다. 미들웨어 → Depends 체인으로 테넌트·세션 주입 경로를 만들고 Casbin 으로 RBAC 을 붙인 것도 그래서였습니다.',
          '동시성 이점은 I/O 바운드일 때의 이야기라, 비동기 드라이버를 쓰지 않거나 블로킹 호출이 섞이면 그대로 사라집니다. 세션·엔진 계층을 전부 async SQLAlchemy 로 맞춰야 했습니다.',
        ],
      },
      {
        question: 'Vue 를 선택한 이유',
        tech: 'Vue',
        preface:
          '프론트엔드는 React 와 Vue 두 후보를 검토했고, 생성형 AI 를 활용한 개발 환경·생태계 표준화·UI 라이브러리 통합 비용을 종합적으로 고려해 Vue 를 채택했습니다.',
        decision:
          '판단 기준을 프레임워크 자체의 우열이 아니라 "생성형 AI 가 만든 코드를 내가 얼마나 빨리 읽고 고칠 수 있는가" 에 뒀습니다. 프론트엔드가 제 주력이 아닌 상태에서 검토 속도가 곧 개발 속도였고, 상태 관리·라우팅처럼 선택지가 갈리는 지점마다 공식 표준이 정해져 있다는 점이 그 속도를 지켜줬습니다.',
        reasons: [
          'React 대비 직관적인 SFC(Single File Component) 문법으로, 생성형 AI 가 만든 코드를 빠르게 검토·수정할 수 있어 초기 개발 생산성을 극대화했습니다.',
          '컴포넌트를 직접 설계·관리할 정도의 프론트엔드 경험이 부족했고 프로젝트 규모도 그 정도가 아니었기에, Vue Router · Pinia 같은 공식 표준 생태계가 정해져 있다는 점이 적합했습니다.',
          'PrimeVue 컴포넌트 라이브러리를 그대로 도입해 UI 구성 시간을 단축하고, 사내 자체 관리 대시보드의 비즈니스 로직에 더 많은 시간을 투입할 수 있었습니다.',
        ],
        tradeoffs: [
          'React 에 비해 참고할 자료와 서드파티 선택지가 좁고, 이후 팀이 붙을 때 React 를 쓰던 사람에게는 새로 익혀야 하는 스택이 됩니다.',
          'UI 를 PrimeVue 에 맡긴 만큼 디자인은 그 라이브러리가 허용하는 범위 안에서 움직입니다. 화면 구성 시간을 산 대가로 세밀한 커스터마이징 자유도를 내줬습니다.',
        ],
      },
    ],
    codeSections: [
      {
        slug: 'dbt',
        title: 'dbt Model · 표준화 + 정제',
        icon: 'pi pi-filter',
        headline:
          '파편화된 9개 벤더별 raw 테이블을 단일 표준 스키마로 통합(staging) → IQR + 룰 기반 정제(intermediate) → TimescaleDB hypertable 위에 incremental 적재(mart) 의 흐름으로 데이터 표준화·중앙 관리 체계를 코드화했습니다.',
        note: [
          'source_exists() 매크로로 환경별 raw 테이블 존재 여부를 런타임에 확인해 조건부 CTE 만 활성화 — 같은 dbt 코드가 업체별 DB 에 그대로 배포됩니다.',
          'staging 은 컬럼·단위 표준화, intermediate 는 dedup + range·IQR 정제, mart 는 집계 + hypertable 적재로 책임을 계층 분리했습니다.',
          'mart 는 incremental + delete+insert 전략 + post_hook 으로 TimescaleDB hypertable·인덱스 생성을 자동화 — 1년차 인프라와 매끄럽게 연결됩니다.',
        ],
        snippets: [
          {
            title: 'powermeter_union 매크로 — 9개 벤더 raw 테이블 → 단일 표준 스키마',
            description:
              'source_exists() 로 환경에 존재하는 테이블만 감지 → 컬럼·단위·구조 패턴별 src CTE 로 정규화 → UNION ALL.',
            language: 'sql',
            code: `{% macro powermeter_union() %}
{#
  9개 벤더별 powermeter raw 테이블을 단일 표준 스키마(v1/i1/kw/pf/kwh)로 통합합니다.
  - 컬럼 패턴: 약어형(v1/i1/kw) vs 서술형(phase_a_voltage_magnitude / total_active_power)
  - 단위 패턴: kW·kWh 그대로 vs W·Wh → kW·kWh 로 정규화
  - 구조 패턴: 단일 테이블 vs 채널·합계·누적 3-table JOIN
  - source_exists() 매크로로 환경(업체 DB)에 실제 존재하는 테이블만 조건부 UNION ALL
#}
{%- set has_short = source_exists('raw', 'tbl_powermeter_reading')      -%}
{%- set has_long  = source_exists('raw', 'tbl_powermeter_reading_long') -%}
{# ... 나머지 7개 변형도 동일 패턴으로 감지 #}

with empty as (
    {# 모든 src CTE 가 맞춰 정규화될 표준 컬럼 스키마 정의 #}
    select
        null::int4 as sensor_id,
        null::float8 as voltage_phase1_v, null::float8 as voltage_phase2_v, null::float8 as voltage_phase3_v,
        null::float8 as voltage_ln_avg_v,
        null::float8 as current_phase1_a, null::float8 as current_total_a,
        null::float8 as power_total_kw,
        null::float8 as power_factor,
        null::float8 as energy_kwh,
        null::timestamptz as measured_at
    where false
)

{# ── 약어형 + kW (변환 없음) ── #}
{% if has_short %}
, src_short as (
    select
        sensor_id,
        v1::float8 as voltage_phase1_v, v2::float8 as voltage_phase2_v, v3::float8 as voltage_phase3_v,
        vln::float8 as voltage_ln_avg_v,
        i1::float8 as current_phase1_a, it::float8 as current_total_a,
        kw::float8 as power_total_kw,
        pf::float8 as power_factor,
        kwh::float8 as energy_kwh,
        dt_insert as measured_at
    from {{ source('raw', 'tbl_powermeter_reading') }}
)
{% endif %}

{# ── 서술형 + W (단위 정규화 필요) ── #}
{% if has_long %}
, src_long as (
    select
        sensor_id,
        phase_a_voltage_magnitude::float8 as voltage_phase1_v,
        phase_b_voltage_magnitude::float8 as voltage_phase2_v,
        phase_c_voltage_magnitude::float8 as voltage_phase3_v,
        (phase_a_voltage_magnitude + phase_b_voltage_magnitude + phase_c_voltage_magnitude)::float8 / 3 as voltage_ln_avg_v,
        phase_a_current_magnitude::float8 as current_phase1_a,
        (phase_a_current_magnitude + phase_b_current_magnitude + phase_c_current_magnitude)::float8 as current_total_a,
        total_active_power::float8 / 1000 as power_total_kw,   -- W → kW
        total_power_factor::float8 as power_factor,
        active_energy::float8 / 1000 as energy_kwh,            -- Wh → kWh
        dt_insert as measured_at
    from {{ source('raw', 'tbl_powermeter_reading_long') }}
)
{% endif %}

{# ── 나머지 변형(3-table JOIN, 단일 테이블 내 컬럼 분기 등)도 같은 패턴으로 표준 스키마 정규화 ── #}

select * from empty
{% if has_short %} union all select * from src_short {% endif %}
{% if has_long %}  union all select * from src_long  {% endif %}
{# ... #}
{% endmacro %}`,
          },
          {
            title: 'mart_powermeter_15min — incremental mart + TimescaleDB hypertable post_hook',
            description:
              'delete+insert 증분 적재 + post_hook 으로 hypertable·인덱스 자동 생성. 1년차 TimescaleDB 인프라 위에서 mart 가 직접 hypertable 로 동작.',
            language: 'sql',
            code: `{{ config(
    materialized='incremental',
    unique_key=['sensor_id', 'bucket_15min'],
    incremental_strategy='delete+insert',
    on_schema_change='append_new_columns',
    post_hook=[
        "SELECT create_hypertable('{{ this }}', 'bucket_15min',
            chunk_time_interval => interval '1 day',
            if_not_exists => true, migrate_data => true)",
        "CREATE INDEX IF NOT EXISTS idx_{{ this.name }}_sensor_bucket
            ON {{ this }} (sensor_id, bucket_15min)"
    ]
) }}

with cleaned as (
    select * from {{ ref('int_powermeter_cleaned') }}
    {% if is_incremental() %}
    where measured_at >= (select max(bucket_15min) from {{ this }})
    {% endif %}
),

sensor_info as (
    select * from {{ source('raw', 'tbl_sensor_meta') }}
)

select
    c.sensor_id,
    max(s.name) as name,
    max(s.site) as site,
    {{ time_bucket('15 minutes', 'c.measured_at') }} as bucket_15min,

    avg(c.voltage_ln_avg_v) as avg_voltage_ln_v,
    avg(c.voltage_ll_avg_v) as avg_voltage_ll_v,

    avg(c.current_total_a) as avg_current_a,
    max(c.current_total_a) as max_current_a,

    avg(c.power_total_kw) as avg_power_kw,
    max(c.power_total_kw) as max_power_kw,

    -- 15분 구간 사용량 = last − first (카운터 리셋 시 0 으로 클램프)
    greatest(last(c.energy_kwh, c.measured_at) - first(c.energy_kwh, c.measured_at), 0) as delta_kwh,

    -- 피크전력 (15분 kWh × 4 = kW 환산)
    greatest(last(c.energy_kwh, c.measured_at) - first(c.energy_kwh, c.measured_at), 0) * 4 as demand_kw,

    avg(c.power_factor) as avg_power_factor,
    count(*) as reading_count
from cleaned c
left join sensor_info s on c.sensor_id = s.sensor_id
group by c.sensor_id, {{ time_bucket('15 minutes', 'c.measured_at') }}`,
          },
        ],
      },
      {
        slug: 'airflow',
        title: 'Airflow DAG · 멀티테넌시 동적 스케줄링',
        icon: 'pi pi-clock',
        headline:
          'Cosmos DbtTaskGroup 으로 dbt manifest 에서 모델을 task 로 자동 변환하고, 업체별 보유 센서 태그로 모델을 선택 실행하는 동적 멀티테넌시 DAG 패턴입니다.',
        note: [
          'load_clients() 로 마스터 DB 에서 업체 목록을 읽어 글로벌 네임스페이스에 DAG 를 동적 등록 — 신규 업체 추가 시 코드 변경 없이 DAG 자동 생성됩니다.',
          'tag-based select(`tag:powermeter` 등)로 업체가 보유한 센서 종류의 모델만 실행 — 불필요한 모델·테스트를 스킵해 실행 시간·DB 부하를 절감합니다.',
          '테넌트별 3분 간격 staggered cron + Airflow Pool 로 동시 fork·동시 쓰기 부하를 분산·캡 — 공유 DB 호스트의 WAL 버스트와 replica replay 충돌을 사전 차단합니다.',
        ],
        snippets: [
          {
            title: 'create_dag — 업체별 동적 DAG 생성 (Cosmos + tag-based select)',
            description:
              'DbtTaskGroup 으로 dbt 모델을 task 로 자동 변환, 업체 보유 센서 태그로 모델 선택 실행, staggered cron + Pool 로 부하 분산.',
            language: 'python',
            code: `"""dbt 모델을 업체별로 분리해 매일 새벽 staggered 스케줄로 실행하는 동적 멀티테넌시 DAG.

각 업체 DB 는 보유 센서 종류가 다르므로(예: powermeter+solar / flow+thd),
업체 메타에서 보유 센서 태그를 읽어 해당 dbt 모델만 선택 실행한다.
"""
import os
from datetime import datetime, timedelta
from pathlib import Path

from airflow import DAG
from airflow.operators.python import PythonOperator
from cosmos import (
    DbtTaskGroup, ExecutionConfig, ProfileConfig, ProjectConfig, RenderConfig,
)
from cosmos.constants import ExecutionMode, InvocationMode, LoadMode
from cosmos.profiles import PostgresUserPasswordProfileMapping

from utils.dag_utils import load_clients, check_connection

DBT_PROJECT_DIR = os.environ["DBT_PROJECT_PATH"]
DBT_MANIFEST_PATH = Path(DBT_PROJECT_DIR) / "target" / "manifest.json"
DBT_EXECUTABLE_PATH = f"{os.environ['DBT_VENV_PATH']}/bin/dbt"
# 공유 PG 호스트 동시 쓰기 캡 — Cosmos 가 모델 1개 = 태스크 1개로 만들기 때문에
# worker_concurrency × worker 수만큼 동시 쓰기가 폭증하는 것을 Pool 슬롯으로 제어.
DBT_WRITE_POOL = "dbt_db_write"

default_args = {
    "retries": 2,
    "retry_delay": timedelta(minutes=5),
    # 정상 dbt 태스크는 수 초~수 분 — 30분 초과 시 hang 으로 판단해 강제 종료 + retry.
    "execution_timeout": timedelta(minutes=30),
}


def _staggered_schedule(offset_min: int) -> str:
    """00:30 KST(15:30 UTC) 기준 offset_min 분만큼 밀린 cron 생성 (테넌트별 시작 분산)."""
    base_minute, base_hour = 30, 15
    total = base_minute + offset_min
    return f"{total % 60} {(base_hour + total // 60) % 24} * * *"


def create_dag(client_id: str, conn_id: str, sensors: list[str], offset_min: int = 0) -> DAG:
    """업체별 DAG 동적 생성. 보유 센서 태그 기반으로 모델 선택 실행."""
    dag = DAG(
        dag_id=f"dbt_sensor_{client_id}",
        schedule=_staggered_schedule(offset_min),
        start_date=datetime(2026, 1, 1),
        catchup=False,
        max_active_runs=1,
        tags=["dbt", "sensor", "analytics", client_id],
        default_args=default_args,
    )

    # 업체 보유 센서 태그 + common(공통 mart) 선택
    select_tags = [f"tag:{s}" for s in sensors] + ["tag:common"]

    with dag:
        verify_conn = PythonOperator(
            task_id="verify_connection",
            python_callable=check_connection,
            op_kwargs={"conn_id": conn_id},
        )

        dbt_group = DbtTaskGroup(
            group_id="dbt_sensor_analytics",
            project_config=ProjectConfig(
                dbt_project_path=Path(DBT_PROJECT_DIR),
                manifest_path=DBT_MANIFEST_PATH,
                dbt_vars={"sensor_types": sensors},
            ),
            profile_config=ProfileConfig(
                profile_name="sensor_analytics",
                target_name="prod",
                profile_mapping=PostgresUserPasswordProfileMapping(
                    conn_id=conn_id,
                    profile_args={"schema": "public", "threads": 4},
                ),
            ),
            render_config=RenderConfig(
                load_method=LoadMode.DBT_MANIFEST,
                select=select_tags,
                test_behavior="after_all",
                emit_datasets=False,
            ),
            execution_config=ExecutionConfig(
                execution_mode=ExecutionMode.LOCAL,
                dbt_executable_path=DBT_EXECUTABLE_PATH,
                invocation_mode=InvocationMode.SUBPROCESS,
            ),
            operator_args={
                "dbt_cmd_flags": ["--target-path", f"/tmp/dbt_target/{client_id}"],
                "pool": DBT_WRITE_POOL,  # 공유 호스트 동시 쓰기 캡
            },
        )

        verify_conn >> dbt_group

    return dag


# 마스터 DB 에서 업체 목록 동적 로딩 — 신규 추가 시 코드 변경 없이 DAG 생성.
# 정렬로 테넌트 순서 고정 → 신규 업체 추가에도 기존 스케줄 변동 최소화.
CLIENTS = sorted(load_clients(), key=lambda c: c["id"])

# 업체별 DAG 글로벌 등록 + 3분 간격 staggered → 동시 fork 부하 분산.
for i, client in enumerate(CLIENTS):
    globals()[f"dbt_sensor_{client['id']}"] = create_dag(
        client["id"], client["conn_id"], client["sensors"], offset_min=i * 3,
    )`,
          },
        ],
      },
      {
        slug: 'fastapi',
        title: 'FastAPI · 멀티테넌시 API 서버 (후속 서비스 확장 기반)',
        icon: 'pi pi-bolt',
        headline:
          '하나의 API 인스턴스가 X-Tenant-ID 헤더로 업체별 DB 엔진을 동적 라우팅하고, 1·2년차에 구축한 Read Replica 를 자동 fallback 하는 멀티테넌시 패턴 위에, 사내 자체 관리 대시보드와 후속 서비스가 공통으로 올라갈 도메인 라우터 기반을 마련했습니다.',
        note: [
          'TenantMiddleware → request.state → FastAPI Depends 체인으로 모든 라우터에 tenant_id·세션이 일관 주입 — 도메인 핸들러는 테넌트 분기를 신경 쓰지 않습니다.',
          'EngineRegistry 가 테넌트별 read·write AsyncEngine 을 lazy 생성·캐시하고, Replica 연결 실패 시 자동으로 write 엔진으로 fallback + 1회만 Slack 알림 발송합니다.',
          'Casbin AsyncEnforcer 기반 require_permission(resource, action) 으로 라우터마다 한 줄 RBAC — reader → writer → admin 역할 계층이 자동 상속됩니다.',
        ],
        snippets: [
          {
            title: 'Sensors Router — pydantic + async SQLAlchemy + Casbin RBAC',
            description:
              'pydantic 모델로 입력 검증·OpenAPI 자동 생성, Depends 로 Replica/Primary 세션 자동 라우팅, Casbin require_permission 으로 라우터 한 줄 RBAC.',
            language: 'python',
            code: `"""센서(Sensor) CRUD — pydantic + async SQLAlchemy 2.0 + Casbin RBAC."""

router = APIRouter()


# ── pydantic 스키마 (자동 OpenAPI 생성 + 입력 검증) ──

class SensorCreate(BaseModel):
    sensor_code: str | None = None
    name: str
    sensor_type: str = "powermeter"         # powermeter | flow | thd ...
    unit: str = "kW"
    collect_interval_s: int = 60            # 수집 주기 (초)
    asset_id: int | None = None             # 자산 계층 연결
    is_active: bool = True

    @model_validator(mode="after")
    def _validate_sensor(self):
        if self.collect_interval_s < 1:
            raise ValueError("collect_interval_s 는 1초 이상이어야 합니다")
        if self.sensor_type not in SENSOR_TYPES:
            raise ValueError(f"지원하지 않는 센서 타입: {self.sensor_type}")
        return self


class SensorResponse(BaseModel):
    id: int
    sensor_code: str | None
    name: str
    sensor_type: str
    unit: str
    collect_interval_s: int
    asset_id: int | None
    is_active: bool
    model_config = {"from_attributes": True}


# ── 라우터 ──

@router.get("/sensors", response_model=list[SensorResponse])
async def list_sensors(
    sensor_type: str | None = Query(None),
    asset_id: int | None = Query(None),
    session: AsyncSession = Depends(get_read_session),                   # ← Replica 라우팅
    _auth: AuthContext = Depends(require_permission("sensors", "read")), # ← Casbin RBAC
):
    stmt = (
        select(SensorModel)
        .where(SensorModel.is_active.is_(True))
        .order_by(SensorModel.id)
    )
    if sensor_type is not None:
        stmt = stmt.where(SensorModel.sensor_type == sensor_type)
    if asset_id is not None:
        stmt = stmt.where(SensorModel.asset_id == asset_id)
    return (await session.execute(stmt)).scalars().all()


@router.post("/sensors", response_model=SensorResponse, status_code=201)
async def create_sensor(
    payload: SensorCreate,
    session: AsyncSession = Depends(get_db_session),                      # ← Primary 라우팅
    _auth: AuthContext = Depends(require_permission("sensors", "write")),
):
    # 자산 계층에 연결하는 센서는 대상 자산이 실제 존재해야 등록 가능
    if payload.asset_id is not None:
        asset = (await session.execute(
            select(AssetModel).where(AssetModel.id == payload.asset_id)
        )).scalar_one_or_none()
        if asset is None:
            raise HTTPException(400, f"자산 #{payload.asset_id} 을(를) 찾을 수 없습니다")

    # 센서 코드 중복 차단 — 코드가 유일해야 수집 파이프라인 매핑이 안전
    if payload.sensor_code is not None:
        dup = (await session.execute(
            select(SensorModel).where(SensorModel.sensor_code == payload.sensor_code)
        )).scalar_one_or_none()
        if dup is not None:
            raise HTTPException(409, f"센서 코드 '{payload.sensor_code}' 는 이미 등록되어 있습니다")

    sensor = SensorModel(**payload.model_dump())
    session.add(sensor)
    await session.flush()
    await session.refresh(sensor)
    return sensor   # pydantic from_attributes 로 SensorResponse 자동 직렬화`,
          },
        ],
        mediaAbove: true,
        media: [
          {
            label: 'FastAPI 아키텍처',
            src: `${import.meta.env.BASE_URL}architectures/fastapi-multitenant-architecture.svg`,
            alt: 'Multi-Tenant FastAPI Gateway · 확장형 API 서버 아키텍처',
            caption: 'Multi-Tenant FastAPI Gateway — Middleware Chain → Depends 체인 → 테넌트별 read/write 엔진 자동 라우팅 (Replica fallback 포함)',
          },
        ],
      },
    ],
}
