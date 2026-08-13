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
        src: `${import.meta.env.BASE_URL}architectures/iiot-architecture.svg`,
        alt: '현장 수집부터 TimescaleDB 저장과 Grafana 관제까지의 IIoT 데이터 흐름',
        description: [
          '현장 Edge가 IoT 센서·PLC 데이터를 수집해 OPC UA로 변환하고, 클라우드 TimescaleDB에 적재합니다.',
          'TimescaleDB에서 시계열 데이터를 저장·집계하고, Grafana가 이를 조회해 실시간 관제 화면을 제공합니다.',
          '저는 TimescaleDB 조회 쿼리·Continuous Aggregate와 Grafana 대시보드를 담당했습니다.',
        ],
      },
    ],
    techRationale: [
      {
        question: 'TimescaleDB 를 쓰게 된 배경과 그 위에서 내린 설계 결정',
        tech: 'TimescaleDB',
        preface:
          '일반 RDBMS로는 누적되는 센서 데이터의 조회 성능을 유지하기 어려워 TimescaleDB를 도입했습니다. 이 위에서 조회·집계·저장 정책을 설계했습니다.',
        reasons: [
          'PostgreSQL 확장이라 기존 SQL과 메타데이터 JOIN 구조를 유지할 수 있었습니다.',
          '하이퍼테이블·Continuous Aggregate·압축 정책으로 조회·집계·저장을 역할별로 최적화했습니다.',
        ],
      },
      {
        question: 'Grafana 를 쓰게 된 배경',
        tech: 'Grafana',
        preface:
          '센서 데이터의 통합 관제 화면을 빠르게 구축하고, 업체별로 안전하게 분리할 수 있는 Grafana를 사용했습니다. 패널 SQL과 공장별 대시보드를 직접 구성했습니다.',
        reasons: [
          'TimescaleDB를 직접 연결해 시계열·게이지·상태 패널을 프론트엔드 개발 없이 구성했습니다.',
          '변수와 시간 매크로로 공장·설비·기간별 쿼리를 재사용하고, 업체별 폴더·권한으로 대시보드를 분리했습니다.',
        ],
      },
    ],
    codeSections: [
      {
        slug: 'query',
        title: 'Query · 대시보드 실시간 조회',
        icon: 'pi pi-search',
        headline:
          '조회 범위와 화면 해상도에 맞춰 필요한 시계열 데이터만 반환하도록 쿼리를 구성했습니다.',
        implementationCard: {
          approach: [
            '$__timeFilter와 $__interval로 시간 범위를 청크 프루닝하고, 패널 해상도에 맞춰 버킷을 조정했습니다.',
            'time_bucket·last와 counter_agg·delta로 현재값과 리셋을 고려한 실제 증분을 계산했습니다.',
          ],
          result: '데이터가 누적되어도 기본 시계열 조건 조회를 450ms에서 150ms로 줄였습니다.',
        },
        snippets: [
          {
            title: 'time_bucket + $__interval — 패널 해상도에 맞춘 구간 집계',
            description:
              '고정 버킷 폭 대신 Grafana 의 $__interval 을 써서, 조회 구간을 넓혀도 반환 포인트 수가 패널이 그릴 수 있는 범위로 유지되도록 했습니다. 데이터 소스에 TimescaleDB 옵션이 켜져 있으면 $__timeGroup(measured_at, $__interval) 도 같은 time_bucket 호출로 컴파일됩니다.',
            collapsed: true,
            highlightPhrases: ["time_bucket('$__interval'", 'last(power_total_kw, measured_at)', 'WHERE $__timeFilter(measured_at)'],
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
            collapsed: true,
            highlightPhrases: ["time_bucket('1 day'", 'delta(counter_agg(measured_at, counter))', 'WHERE $__timeFilter(measured_at)'],
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
          '반복 집계를 조회 시점에서 미리 계산·갱신하는 구조로 바꿨습니다.',
        implementationCard: {
          approach: [
            '일 → 월 2단 Continuous Aggregate로 통계를 미리 적재하고, 1시간 주기 정책으로 증분 갱신했습니다.',
            '최신 구간은 실시간 데이터와 결합하고, 월 집계는 3개월 재갱신 창으로 일별 집계 시차를 보완했습니다.',
          ],
          result: '월별 통계·집계 시간을 1.8초에서 540ms로 약 70% 단축했습니다.',
        },
        snippets: [
          {
            title: 'Continuous Aggregate — 일/월 2단 캐스케이드 자동 집계',
            description:
              '일 → 월 2단 캐스케이드 Cagg + 1시간 주기 자동 갱신 정책 (materialized_only=false 로 실시간 데이터 결합 조회). 일별 사용량은 하이퍼 함수 last − first 로 잡되, 리셋으로 음수가 나오는 구간은 0 으로 막아 집계가 오염되지 않게 했습니다.',
            collapsed: true,
            highlightPhrases: ['CREATE MATERIALIZED VIEW cagg_powermeter_reading_1d', "add_continuous_aggregate_policy('cagg_powermeter_reading_1d'", 'timescaledb.materialized_only = false', 'CREATE MATERIALIZED VIEW cagg_powermeter_reading_1m'],
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
        hidden: true,
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
            collapsed: true,
            highlightPhrases: ["timescaledb.compress_segmentby = 'sensor_id'", "add_compression_policy('tbl_powermeter_reading'", 'AS saved_pct'],
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
