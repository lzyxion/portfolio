import type { Project } from './types'

export const iiotMonitoring: Project = {
    slug: 'iiot-monitoring',
    title: '스마트 팩토리 IIoT 시계열 데이터 최적화 및 통합 관제 대시보드 구축',
    period: '2023.11 ~ 2024.04',
    year: 1,
    tags: ['TimescaleDB', 'Grafana', 'SQL'],
    contribution: 35,
    contributionScope: '데이터 시각화 · 통합 관제 대시보드 구축 담당',
    summary:
      'OPC UA → TimescaleDB → Grafana 로 이어지는 IIoT 수집·관제 파이프라인에서 시계열 데이터 가공·조회와 공장별 통합 관제 대시보드를 담당 — 데이터가 누적돼도 느려지지 않는 조회·집계·저장 구조를 만들었습니다.',
    problem: {
      situation: [
        'IIoT 기반 ICT 인프라를 구축하는 사내 신규 프로젝트에서, OPC UA·TimescaleDB·Grafana 오픈소스 스택으로 구성한 수집–적재–시각화 파이프라인 중 저는 적재된 시계열 데이터의 가공·조회와 공장별 통합 관제 대시보드를 맡았습니다.',
        '운영 초기에는 데이터가 적어 성능 문제가 드러나지 않았고, 처음인 TimescaleDB·Grafana 를 익히며 관제 화면을 세우는 데 집중하던 시기였습니다. 센서 데이터가 누적되면서부터 조회·집계·저장 세 지점에서 성능 저하가 동시에 나타나기 시작했습니다.',
      ],
      issues: [
        {
          title: '누적될수록 느려지는 시계열 조회',
          description:
            '데이터가 쌓일수록 조건 검색·RAW 추출이 풀스캔에 가까워져 조회 응답이 450ms를 넘겼고, 시간이 갈수록 더 느려질 수밖에 없는 구조였습니다.',
        },
        {
          title: '매 조회마다 반복되는 대규모 집계',
          description:
            '일·월 통계를 조회 시점마다 수백만 건씩 즉시 집계해 월별 집계가 1.8초까지 걸렸고, 여러 대시보드가 동시에 조회하면 DB 부하가 가중됐습니다.',
        },
        {
          title: '빠르게 차오르는 스토리지',
          description:
            '원본 시계열이 빠르게 누적되며 디스크 비용과 오래된 청크 조회 성능이 함께 나빠졌고, 데이터를 정리하는 수동 공수도 계속 늘었습니다.',
        },
      ],
    },
    goals: [
      '데이터가 계속 누적되는 환경에서도 대시보드 조회 응답 속도를 일정하게 유지',
      '조회 시점마다 반복되는 통계 집계 연산을 제거하고, 운영 개입 없는 자동 집계 체계 구축',
      '스토리지 증가 속도를 구조적으로 낮추고 데이터 정리 수동 공수 제거',
    ],
    solutions: [
      {
        title: '시간 청크로 가른 하이퍼테이블 전환',
        approach:
          '대시보드 질의가 대부분 특정 시간 범위를 본다는 데 착안해 measured_at 기준 시간 청크로 나눈 TimescaleDB 하이퍼테이블로 전환했습니다. 실행 계획에서 범위 밖 청크가 프루닝되는 것을 확인해 검증하고, time_bucket·하이퍼 함수로 조회 패턴을 표준화했습니다.',
        result: '기본 시계열 조회 450ms → 150ms (약 3배 향상)',
      },
      {
        title: '일 → 월 2단 연속집계와 카운터 리셋 보정',
        approach:
          '집계 결과를 미리 materialize 하고 증분만 갱신하도록 일 → 월 2단 캐스케이드 Continuous Aggregate 를 구성했습니다. 최신 구간은 materialized_only=false 로 실시간 결합했고, 장비 리셋 시 생기는 음수 델타는 greatest(…, 0) + Toolkit 의 counter_agg·delta 로 보정, 1시간 주기 자동 갱신으로 운영 개입을 없앴습니다.',
        result: '월별 통계/집계 1.8s → 540ms (약 70% 단축)',
      },
      {
        title: 'sensor_id 단위 청크 압축 정책',
        approach:
          '오래된 청크는 조회 빈도가 낮고 sensor_id 안에서 값이 유사하게 반복된다는 점에 착안해 compress_segmentby=\'sensor_id\' 컬럼 압축으로 7일 이전 청크를 자동 압축하는 정책을 세웠습니다. chunk_compression_stats 로 청크별 절감률을 검증하고, 압축을 정책으로 자동화해 수동 공수까지 제거했습니다.',
        result: '저장 공간 10GB → 2GB (약 80% 절감)',
      },
    ],
    review: [
      {
        label: '배운 점',
        text: '감으로 인덱스를 늘리는 대신 조회 패턴을 먼저 분석하고 구조(청크·집계·압축)를 그에 맞추는 접근이 성능 문제의 정공법이라는 것을 배웠습니다. 실행 계획과 chunk_compression_stats 처럼 측정으로 검증하며 최적화하는 습관도 이때 자리 잡았습니다.',
      },
      {
        label: '배운 점',
        text: '최적화를 일회성 작업이 아니라 정책(압축·갱신 주기)으로 걸어 자동화하면, 성능·비용 개선이 운영 공수 절감으로까지 이어진다는 것을 경험했습니다.',
      },
      {
        label: '아쉬운 점 · 이어진 개선',
        text: '집계를 DB 기능(Continuous Aggregate)에 묶어둔 선택은 당시 규모에서는 최선이었지만, 업체가 늘면서 표현력·스케줄링의 한계가 드러났습니다. 이 인식이 3년차에 Airflow·dbt 로 집계를 코드로 끌어내 중앙화하는 개선으로 이어졌습니다.',
      },
    ],
    outcome:
      'TimescaleDB 하이퍼테이블·연속집계·압축 정책 도입으로 IIoT 시계열 데이터 조회 2~3배 향상·집계 쿼리 70% 이상 단축·저장 공간 80% 이상 절감, 제조 현장 실시간 관제 시스템 토대 구축.',
    metrics: [
      {
        label: '기본 시계열 조건 조회 (RAW 추출)',
        beforeValue: 450,
        beforeDisplay: '450ms',
        afterValue: 150,
        afterDisplay: '150ms',
        improvement: '약 3× 향상',
      },
      {
        label: '월별 통계/집계 (분 단위 · 1년치)',
        beforeValue: 1800,
        beforeDisplay: '1.8s',
        afterValue: 540,
        afterDisplay: '540ms',
        improvement: '약 70% 단축',
      },
      {
        label: '스토리지 디스크 용량',
        beforeValue: 10,
        beforeDisplay: '10GB',
        afterValue: 2,
        afterDisplay: '2GB',
        improvement: '약 80% 절감',
        unit: 'GB',
      },
    ],
    roles: [
      'TimescaleDB 하이퍼테이블 아키텍처 및 하이퍼 함수 도입으로 시계열 데이터 조회 속도 평균 2~3배 향상',
      '연속집계 (Continuous Aggregates) 기능을 활용하여 수백만 건 규모의 통계/집계 쿼리 수행 시간 70% 이상 단축',
      '하이퍼테이블 청크 (Chunk) 단위 압축 (Compression) 정책 수립으로 데이터 저장 공간 80% 이상 절감',
      'Grafana 를 활용하여 제조 현장 맞춤형 IIoT 센서 데이터 실시간 대시보드 구축',
    ],
    media: [
      {
        label: '아키텍처',
        src: `${import.meta.env.BASE_URL}architectures/iiot-monitoring.svg`,
        alt: '스마트 팩토리 IIoT 데이터 통합 관제 시스템 아키텍처',
        description: [
          '팀 전체 시스템은 현장 엣지 서버가 IoT 센서·PLC 데이터를 RS-232·485 / LAN 으로 수집해 OPC UA 로 변환한 뒤 TimescaleDB 에 적재하고, Grafana 가 이를 조회해 실시간 관제 대시보드를 제공하는 구조입니다. 장비마다 다른 통신 규격을 엣지에서 OPC UA 한 겹으로 표준화해, 현장 구성이 달라져도 적재 이후 계층은 그대로 쓸 수 있게 했습니다.',
          '센서마다 1분 주기로 값을 읽고 한 행에 전압·전류·전력 같은 float8 20여 개가 담겨, 센서 하나만으로 하루 1,440행이 쌓입니다. 이 데이터를 현장이 아니라 클라우드에 모은 것이 구조의 핵심 경계입니다 — 엣지는 수집·변환까지만 맡고 저장·조회·집계는 전부 클라우드 TimescaleDB 에서 다뤄, 현장 장비 사양에 좌우되지 않고 조회 성능과 저장 정책을 한 곳에서 관리할 수 있게 했습니다.',
          '이 흐름 안에서 저는 적재된 데이터를 쿼리로 가공·조회하고 시각화하는 역할을 담당했습니다. 다이어그램의 TimescaleDB 박스 안 세 줄 — 하이퍼테이블·하이퍼 함수, 연속집계(Cagg) 자동 갱신, 압축·파티셔닝 정책 — 이 제가 설계·운영한 범위이고, 그 위에서 Grafana 통합 관제 대시보드를 구축했습니다.',
        ],
      },
    ],
    techRationale: [
      {
        question: 'TimescaleDB 를 쓰게 된 배경과 그 위에서 내린 설계 결정',
        tech: 'TimescaleDB',
        preface:
          '기존 MySQL 등 일반 RDBMS 로는 시계열 데이터의 조회 성능이 나오지 않아, 팀에서 시계열 DB 도입을 결정하고 TimescaleDB 를 채택했습니다. 이 스택 위에서 조회·집계·저장 구조를 설계하고 운영하는 일을 제가 맡았습니다.',
        reasons: [
          '팀에 전용 시계열 DB 를 운영해 본 경험이 없었는데, TimescaleDB 는 PostgreSQL 확장이라 기존 SQL·RDBMS 지식을 그대로 활용해 빠르게 도입할 수 있었습니다.',
          '마스터 데이터·메타정보 테이블과의 JOIN 이 자유로워, 기존 RDBMS 모델링·관계 쿼리 자산을 그대로 살릴 수 있었습니다.',
        ],
        decision:
          '제가 판단한 지점은 무엇을 쓸지가 아니라 그 위를 어떻게 설계할지였습니다. 인덱스를 더 얹는 대신 조회 패턴에 구조를 맞춘다는 기준으로 시간 청크 분할·일 → 월 2단 연속집계·sensor_id 세그먼트 압축을 정했고, 세 가지 모두 실행 계획과 chunk_compression_stats 로 효과를 확인한 뒤 정책으로 고정했습니다.',
        tradeoffs: [
          '집계를 미리 쌓는 만큼 원본 외에 집계 테이블의 저장 공간이 추가로 들고, 집계 정의를 바꾸면 다시 채워야 합니다. 조회 시점의 연산 비용을 저장 공간과 재구축 비용으로 옮긴 선택이었습니다.',
          '압축한 청크는 개별 행을 고치기 어려워집니다. 7일이라는 기준은 그 이전 데이터를 사실상 고정된 것으로 두겠다는 뜻이고, 세그먼트 키(sensor_id)와 다른 패턴으로 조회하면 압축의 이득도 줄어듭니다.',
        ],
      },
      {
        question: 'Grafana 를 쓰게 된 배경',
        tech: 'Grafana',
        preface:
          '센서 데이터 시각화·통합 관제 대시보드를 빠르게 구축해야 했고, 라이선스 비용·데이터 소스 연동·권한 격리라는 제약을 모두 만족하는 Grafana 가 채택됐습니다. 저는 이 위에서 패널마다 SQL 쿼리를 직접 작성하고, 현장 사용자가 요구한 관제 항목에 맞춰 공장별 통합 관제 대시보드를 구성했습니다.',
        reasons: [
          '오픈소스라 라이선스 비용이 들지 않고, 이후 업체가 늘어나는 동안에도 비용이 업체 수에 비례해 증가하지 않았습니다.',
          '다양한 데이터 소스와 플러그인 생태계를 지원해, TimescaleDB(PostgreSQL) 를 그대로 붙이고 시계열·게이지·상태 패널을 조합하는 것만으로 프론트엔드 개발 없이 화면을 채울 수 있었습니다.',
          '템플릿 변수와 $__timeFilter · $__timeGroup 같은 매크로를 지원해, 패널 쿼리 하나로 공장·설비·기간을 바꿔가며 재사용할 수 있습니다. 대시보드에서 고른 시간 범위가 그대로 WHERE 절로 내려가 TimescaleDB 청크 프루닝까지 이어집니다.',
          '업체별 폴더·대시보드 분리 + RBAC 기반 권한 관리로 다중 업체 환경에서도 안전하게 격리·공유 운영이 가능합니다.',
        ],
      },
    ],
    codeSections: [
      {
        slug: 'query',
        title: 'Query · 대시보드 실시간 조회',
        icon: 'pi pi-search',
        headline:
          '대시보드 조회는 두 매크로로 범위와 해상도를 함께 잡았습니다. $__timeFilter 로 받은 시간 범위가 그대로 WHERE 절로 내려가 범위 밖 청크를 읽지 않고, 버킷 폭은 $__interval 로 패널 해상도에 맞춰 화면에 그릴 만큼만 집계합니다.',
        note: [
          '$__timeFilter 로 범위 밖 청크가 프루닝되고, $__interval 로 버킷 폭이 패널 폭에 맞춰 자동 조정돼 조회 구간을 넓게 잡아도 반환 포인트 수가 일정하게 유지됩니다.',
          'time_bucket 에 표준 집계(avg·max)와 하이퍼 함수(last)를 함께 묶어, 구간별 평균·피크와 마지막 관측값을 단일 쿼리에서 얻습니다.',
          '적산 계량기는 교체·재기동으로 카운터가 0 으로 돌아갑니다. 누적값의 단순 차이는 이 구간을 음수로 만들어 버리므로, TimescaleDB Toolkit 의 counter_agg + delta 로 리셋 지점을 인식해 실제 증분을 산출합니다.',
        ],
        snippets: [
          {
            title: 'time_bucket + $__interval — 패널 해상도에 맞춘 구간 집계',
            description:
              '고정 버킷 폭 대신 Grafana 의 $__interval 을 써서, 조회 구간을 넓혀도 반환 포인트 수가 패널이 그릴 수 있는 범위로 유지되도록 했습니다. 데이터 소스에 TimescaleDB 옵션이 켜져 있으면 $__timeGroup(measured_at, $__interval) 도 같은 time_bucket 호출로 컴파일됩니다.',
            language: 'sql',
            code: `SELECT
  -- $__interval 은 '5m' 같은 문자열로 치환되므로 따옴표로 감싸 interval 로 넘긴다
  time_bucket('$__interval', measured_at) AS "time",
  sensor_id,

  -- 전압 평균
  avg(voltage_ln_avg_v) AS avg_voltage_ln_v,
  avg(voltage_ll_avg_v) AS avg_voltage_ll_v,

  -- 전류 평균/최대
  avg(current_total_a) AS avg_current_a,
  max(current_total_a) AS max_current_a,

  -- 전력 평균/최대 + 구간 마지막 값 (현재값 패널용)
  avg(power_total_kw) AS avg_power_kw,
  max(power_total_kw) AS max_power_kw,
  last(power_total_kw, measured_at) AS last_power_kw,

  -- 역률 평균
  avg(power_factor) AS avg_power_factor,

  count(*) AS reading_count
FROM tbl_powermeter_reading
WHERE $__timeFilter(measured_at)   -- Grafana 대시보드 시간 범위 → 청크 프루닝
GROUP BY 1, 2
ORDER BY 1;`,
          },
          {
            title: 'counter_agg + delta — 리셋되는 카운터 장비의 실제 증분',
            description:
              '적산 계량기·카운터 장비는 교체나 재기동으로 값이 0 으로 돌아갑니다. 누적값의 단순 차이로는 그 구간이 음수가 되어 버려지므로, TimescaleDB Toolkit 의 counter_agg + delta 로 리셋 지점을 인식해 끊긴 구간을 이어 붙인 실제 증분을 산출했습니다.',
            language: 'sql',
            code: `SELECT
  sensor_id,
  time_bucket('1 day', measured_at) AS bucket_day,
  -- 리셋을 인식해 끊긴 구간을 이어 붙인 실제 증분
  delta(counter_agg(measured_at, counter)) AS delta_count
FROM tbl_counter_reading
WHERE $__timeFilter(measured_at)
GROUP BY sensor_id, time_bucket('1 day', measured_at)
ORDER BY sensor_id, bucket_day;`,
          },
        ],
      },
      {
        slug: 'cagg',
        title: 'Continuous Aggregate · 일 → 월 2단 자동 집계',
        icon: 'pi pi-sync',
        headline:
          '조회 시점마다 수백만 건을 즉시 집계하던 통계를 일 → 월 2단 캐스케이드로 미리 쌓고 증분만 갱신하도록 바꿨습니다.',
        note: [
          '일/월 2단 Continuous Aggregate 캐스케이드 + 자동 갱신 정책으로 매 조회 시 즉시 연산하던 통계 쿼리 부담 제거. 최신 구간은 materialized_only=false 로 실시간 데이터와 결합했고 (v2.13 부터 기본 비활성이라 명시적으로 켰습니다), 일·월 정책이 같은 주기라 실행 순서는 보장되지 않지만 월 정책의 3개월 재갱신 창이 이를 덮습니다.',
        ],
        snippets: [
          {
            title: 'Continuous Aggregate — 일/월 2단 캐스케이드 자동 집계',
            description:
              '일 → 월 2단 캐스케이드 Cagg + 1시간 주기 자동 갱신 정책 (materialized_only=false 로 실시간 데이터 결합 조회). 일별 사용량은 하이퍼 함수 last − first 로 잡되, 리셋으로 음수가 나오는 구간은 0 으로 막아 집계가 오염되지 않게 했습니다.',
            language: 'sql',
            code: `-- 일별 에너지 사용량 Cagg
CREATE MATERIALIZED VIEW cagg_powermeter_reading_1d
WITH (timescaledb.continuous) AS
SELECT
  sensor_id,
  time_bucket('1 day', measured_at) AS bucket_day,
  -- 리셋으로 음수가 나오면 0 으로 막는다 (정밀 보정은 counter_agg 쪽)
  greatest(
    last(energy_kwh, measured_at) - first(energy_kwh, measured_at),
    0
  ) AS delta_kwh
FROM tbl_powermeter_reading
GROUP BY sensor_id, time_bucket('1 day', measured_at)
WITH NO DATA;

CALL refresh_continuous_aggregate('cagg_powermeter_reading_1d', NULL, now()::date);

SELECT add_continuous_aggregate_policy('cagg_powermeter_reading_1d',
  start_offset      => INTERVAL '3 days',
  end_offset        => INTERVAL '1 day',
  schedule_interval => INTERVAL '1 hour');

ALTER MATERIALIZED VIEW cagg_powermeter_reading_1d
  SET (timescaledb.materialized_only = false);

-- 월별 Cagg (일 단위 Cagg 위에 캐스케이드)
CREATE MATERIALIZED VIEW cagg_powermeter_reading_1m
WITH (timescaledb.continuous) AS
SELECT
  sensor_id,
  time_bucket('1 month', bucket_day) AS bucket_month,
  sum(delta_kwh) AS delta_kwh
FROM cagg_powermeter_reading_1d
GROUP BY sensor_id, time_bucket('1 month', bucket_day)
WITH NO DATA;

SELECT add_continuous_aggregate_policy('cagg_powermeter_reading_1m',
  start_offset      => INTERVAL '3 months',
  end_offset        => INTERVAL '1 day',
  schedule_interval => INTERVAL '1 hour');`,
          },
        ],
      },
      {
        slug: 'compression',
        title: 'Compression · sensor_id 세그먼트 청크 압축',
        icon: 'pi pi-database',
        headline:
          '오래된 청크는 조회 빈도가 낮고 sensor_id 안에서 값이 유사하게 반복된다는 점에 착안해, sensor_id 를 세그먼트 키로 7일 이전 청크를 자동 압축했습니다.',
        note: [
          '하이퍼테이블 청크 단위 압축(Compression) 정책으로 데이터 저장 공간 80% 이상 절감. 압축은 7일 이후 청크부터, 집계 갱신은 최근 3일까지만 건드리도록 창을 겹치지 않게 잡아 압축된 청크를 재집계로 다시 열지 않습니다.',
        ],
        snippets: [
          {
            title: 'Compression Policy — sensor_id 기준 청크 압축 및 효과 검증',
            description:
              'sensor_id 단위 segmentby 로 7일 이전 청크 자동 압축 + 청크별 크기·절감률 검증 쿼리.',
            language: 'sql',
            code: `-- 압축 정책 활성화 (sensor_id 단위 segmentby)
ALTER TABLE tbl_powermeter_reading SET (
  timescaledb.compress,
  timescaledb.compress_segmentby = 'sensor_id'
);
SELECT add_compression_policy('tbl_powermeter_reading', INTERVAL '7 days');

-- 기존 데이터 수동 압축 (정책 적용 전 청크 일괄 처리)
SELECT compress_chunk(c)
FROM show_chunks('tbl_powermeter_reading', older_than => INTERVAL '7 days') c;

-- 압축 전/후 크기 비교
SELECT
  chunk_name,
  compression_status,
  pg_size_pretty(before_compression_total_bytes) AS before,
  pg_size_pretty(after_compression_total_bytes)  AS after,
  ROUND(
    (1 - after_compression_total_bytes::numeric / before_compression_total_bytes) * 100, 1
  ) AS saved_pct
FROM chunk_compression_stats('tbl_powermeter_reading')
WHERE compression_status = 'Compressed';`,
          },
        ],
      },
    ],
}
