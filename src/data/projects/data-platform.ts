import type { Project } from './types'

export const dataPlatform: Project = {
    slug: 'data-platform',
    title: 'Airflow·dbt 기반 데이터 표준화 파이프라인 및 멀티테넌시 API 구축',
    period: '2025.11 ~ 2026.06',
    year: 3,
    contribution: 100,
    contributionScope: '백엔드 · 프론트엔드 · 인프라 · 파이프라인 전담',
    repos: ['lzyxion/dbt-sensor', 'lzyxion/sensor-gateway-portfolio'],
    tags: ['Airflow', 'dbt', 'FastAPI', 'Vue.js', 'Docker', 'Nginx', 'GitLab CI/CD'],
    summary:
      '파이프라인 파편화와 Grafana 시각화의 한계를 계기로, Airflow·dbt 표준화 파이프라인과 멀티테넌시 API·사내 자체 관리 대시보드를 구축한 프로젝트입니다.',
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
          title: '업체별 데이터·권한을 분리해야 하는 공통 API',
          description:
            '업체마다 DB와 센서 구성이 다른 환경에서, 고객사별 서비스를 따로 만들면 기능 추가·배포·권한 관리가 반복됩니다. 하나의 API로 여러 업체를 수용하되, 다른 업체 데이터에 접근할 수 없도록 격리와 권한 통제가 필요했습니다.',
        },
      ],
    },
    goals: [
      '업체별 DB 에 흩어진 집계 정의를 중앙에서 관리·스케줄링하는 파이프라인 체계로 전환',
      '파편화된 센서 데이터의 표준화·이상값 정제 규칙을 코드로 강제해 데이터 품질과 작업 속도를 함께 확보',
      '테넌트별 데이터·권한을 분리하면서 여러 업체를 하나의 API·관리 서비스로 수용',
    ],
    solutions: [
      {
        title: '집계를 코드로 — Airflow 파이프라인 중앙화',
        approach:
          '집계를 DB 기능에 묶는 대신 코드로 끌어내 Airflow 로 중앙화했습니다. DAG task 로 SQL·Python·외부 호출을 자유롭게 조합하고, cron 기반 정확한 실행 시점과 의존성·재시도·백필 같은 운영 컨트롤을 확보했으며, 흩어졌던 집계 정의를 단일 Airflow 인스턴스로 모았습니다.',
        result: '센서별 수기 집계 정의·수정 반복 작업 기준 약 80% 감소',
      },
      {
        title: 'dbt 표준화 — 데이터 품질을 코드로 강제',
        approach:
          '전처리·표준화 로직을 코드로 통일하기 위해 Airflow 와 자연스럽게 결합되는 dbt 를 도입했습니다. ref()·sources 로 의존성·lineage 를 자동 추적해 staging → intermediate → mart 로 표준화하고, tests·macros 로 이상값 검출·정제 규칙을 모든 모델에 일관 적용해 데이터 품질을 코드로 강제했습니다.',
        result: '신규 집계 추가: 센서별 수기 SQL·Cagg 작성 약 3시간 → 표준 모델 설정·검증 약 15분',
      },
      {
        title: '테넌트 격리와 RBAC을 갖춘 공통 API 구축',
        approach:
          '여러 업체를 하나의 서비스에서 안전하게 다루기 위해 FastAPI 기반 API 서버에 테넌트·세션 주입 경로와 Casbin RBAC 을 구성하고, async SQLAlchemy 로 Replica 의 마트 데이터를 조회하도록 설계했습니다. 테넌트별 연결 풀과 요청 제한을 두고, Replica 연결 실패 시 Primary 로 전환·알림하도록 구성했습니다. Vue 관리 대시보드와 함께 Docker·Nginx·GitLab CI/CD 배포 기반까지 구축해, 후속 서비스가 공통으로 사용할 API·운영 기반을 마련했습니다.',
        result: '테넌트별 DB 격리·권한 통제·연결 풀·Replica fallback을 갖춘 공통 API와 관리 서비스 기반 마련',
      },
    ],
    review: [
      {
        label: '배운 점',
        text: '1년차에 스스로 도입한 Cagg 의 한계를 스스로 걷어내며, 도구 선택은 "지금 규모" 가 아니라 "확장 경로" 를 기준으로 해야 한다는 것을 체감했습니다. 업체가 늘어도 운영 공수가 선형으로 늘지 않는 구조(중앙화·표준화)가 확장의 전제였습니다.',
      },
      {
        label: '배운 점',
        text: '데이터 파이프라인과 API 서버를 한 흐름으로 설계하면서, 데이터 모델의 표준화가 서비스 API 의 일관성과 후속 기능 확장성까지 좌우한다는 점을 배웠습니다.',
      },
      {
        label: '이어진 과제',
        text: 'dbt tests 로 정제 규칙을 강제하는 단계까지 왔지만, 품질 지표를 상시 관측하는 데이터 품질 모니터링과 후속 서비스 도메인 기능 고도화는 다음 단계로 이어가고 있습니다.',
      },
    ],
    outcome:
      'Airflow + dbt 표준화 파이프라인으로 센서별 수기 집계 정의·수정 반복 작업을 약 80% 줄이고, 신규 집계 추가 작업을 약 3시간에서 약 15분으로 단축. 멀티테넌시 API·사내 자체 관리 대시보드와 배포 기반을 구축해 후속 서비스 확장 기반을 마련했습니다.',
    metrics: [
      {
        label: '반복 운영 작업 시간 (체감 기준)',
        beforeValue: 100,
        beforeDisplay: '100%',
        afterValue: 20,
        afterDisplay: '20%',
        improvement: '약 80% 감소',
        unit: '%',
      },
      {
        label: '신규 집계 추가 작업 시간',
        beforeValue: 3,
        beforeDisplay: '약 3시간',
        afterValue: 0.25,
        afterDisplay: '약 15분',
        improvement: '약 3시간 → 약 15분',
        unit: 'h',
      },
    ],
    roles: [
      'Apache Airflow 기반 자동화 배치 파이프라인과 집계 DAG를 구축해 센서별 수기 집계 정의·수정 반복 작업 약 80% 감소',
      'dbt 를 도입하여 파편화된 제조 데이터 표준화 및 데이터 이상치 (Outlier) 정제 파이프라인 구현',
      'FastAPI·Casbin 기반 멀티테넌시 API에 테넌트별 연결 풀·요청 제한·Replica fallback을 구성하고, 사내 자체 관리 대시보드를 Docker·Nginx·GitLab CI/CD 배포까지 개발',
    ],
    media: [
      {
        label: '아키텍처',
        src: `${import.meta.env.BASE_URL}architectures/data-platform-multitenant.svg`,
        alt: '공유 TimescaleDB Primary·Replica 기반 데이터 표준화 파이프라인과 멀티테넌시 FastAPI 아키텍처',
        description: [
          '클라우드의 단일 TimescaleDB Primary 인스턴스 안에 Master DB와 업체별 Tenant DB가 함께 있습니다. Primary의 전체 DB를 사내 TimescaleDB Replica 인스턴스로 Streaming Replication해, Replica에서도 Tenant A·B…N DB를 구분해 조회합니다.',
          'Airflow가 업체별 Tenant DB의 원본을 읽어 dbt 모델(staging → intermediate → mart)을 실행하고, 표준화·집계한 마트를 해당 Primary DB에 적재합니다. 전체 업체 기준 약 2,000개 센서에서 1분마다 수집되는 데이터(하루 약 288만 행)를 테넌트별 DAG로 처리합니다.',
          'FastAPI는 JWT·X-Tenant-ID로 요청 테넌트를 식별하고, Master DB의 접속 정보와 RBAC 정책을 바탕으로 해당 Tenant Replica에 연결합니다. 관리 대시보드·관리자 페이지에는 REST API를 제공하고, Replica 연결에 실패하면 해당 Tenant Primary로 fallback합니다.',
        ],
      },
    ],
    techRationale: [
      {
        question: 'Airflow 를 도입한 이유',
        tech: 'Airflow',
        preface:
          '업체별 Cagg 정의가 늘면서 복잡한 전처리·집계와 운영 시점 제어가 어려워졌습니다. 집계 정의를 중앙에서 관리할 수 있도록 Airflow로 전환했습니다.',
        reasons: [
          '스케줄·의존성·재시도·백필을 코드로 관리해 집계 실행을 통제했습니다.',
          '테넌트별 동적 DAG와 Pool으로 신규 업체 추가 및 동시 쓰기 부하를 관리했습니다.',
        ],
      },
      {
        question: 'dbt 를 도입한 이유',
        tech: 'dbt',
        preface:
          '업체·장비별 센서 테이블은 컬럼·단위·정제 기준이 달랐습니다. 기존 SQL 자산을 유지하면서 표준화 규칙을 코드로 관리하기 위해 dbt를 도입했습니다.',
        reasons: [
          'staging → intermediate → mart 계층과 lineage로 변환 흐름을 표준화했습니다.',
          'macros·tests로 이상값 정제와 검증 규칙을 공통 적용했습니다.',
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
      },
    ],
}
