import type { Project } from './types'

export const infraMonitoring: Project = {
    slug: 'infra-monitoring',
    title: '시스템 인프라 고도화 및 모니터링, 알림 구축',
    period: '2024.10 ~ 2025.05',
    year: 2,
    contribution: 50,
    contributionScope: 'DB 부하 진단 · Grafana 데이터 소스 격리 · Edge 모니터링/알람 체계 구축',
    tags: [
      'PostgreSQL',
      'TimescaleDB',
      'PgBouncer',
      'Streaming Replication',
      'Grafana',
      'Grafana Alloy',
      'Prometheus',
      'VictoriaMetrics',
    ],
    summary:
      '업체 확장기에 한꺼번에 드러난 DB 과부하 · 트래픽 초과 비용 · Edge 장애를, 메트릭 진단 → 복제 격리 → 사전 알람의 순서로 구조적으로 분리·예방한 인프라 고도화 프로젝트입니다.',
    problem: {
      situation: [
        '업체 수 증가에 대비해 팀 차원에서 클라우드 서버 확장과 OPC UA 서버 개선을 진행했지만, 증설한 서버는 사양이 예상보다 부족해 결국 DB 를 기존 서버로 되돌려 통합했습니다. 이 시기에 DB 부하·아웃바운드 비용·현장 Edge 장비 장애가 한꺼번에 겹쳤습니다.',
        '이 문제들에 대응하기 위해 저는 DB 부하 진단과 Grafana 데이터 소스 격리, 현장 Edge 장비의 모니터링·알람 체계 구축을 맡았습니다.',
      ],
      issues: [
        {
          title: 'CPU 99%까지 치솟은 메인 DB',
          description:
            'DB 통합 이후 메인 DB CPU 가 피크 99%까지 올라 실시간 관제 처리가 밀렸습니다. 증설을 되돌린 직후라 서버를 또 늘릴 수는 없었고, 부하가 어디서 오는지부터 알아야 했습니다.',
        },
        {
          title: '계약 기준을 3배 넘긴 아웃바운드 트래픽',
          description:
            'Grafana 대시보드의 읽기 트래픽이 누적돼 피크 30Mbps 까지 올라, 아웃바운드 계약 기준 10Mbps 를 세 배 넘겨 매달 초과 요금이 붙었습니다. 메인 DB 의 CPU 를 밀어올린 것도 같은 읽기 트래픽이었습니다.',
        },
        {
          title: '12대 중 3대가 멈춘 현장 Edge 장비',
          description:
            'OPC UA 서버 개선 과정에 들어간 버그로 메모리가 고갈돼, 2025년 한 해 동안 현장 Edge 서버 12대 중 3대가 다운됐습니다. 그마저도 장애가 난 뒤에야 알 수 있어, 임계치 전에 감지할 방법이 없었습니다.',
        },
      ],
    },
    goals: [
      '서버 증설 없이 메인 DB 의 읽기·쓰기 부하를 구조적으로 분리해 실시간 관제 안정화',
      '클라우드 아웃바운드 트래픽을 계약 기준 이내로 낮춰 매달 발생하는 초과 비용 제거',
      'Edge 장비 장애를 사후 대응에서 사전 감지로 전환하는 모니터링·알람 체계 구축',
    ],
    solutions: [
      {
        title: '추측 대신 메트릭 진단 → Streaming Replication 읽기/쓰기 분리',
        approach:
          '추측 대신 Prometheus 로 메트릭을 쌓아 부하의 상당 부분이 Grafana 읽기 쿼리에서 온다는 것을 확인하고, 읽기/쓰기 분리(Replication) 근거를 데이터로 제시했습니다. Logical Replication·pgpool·Patroni 중, 하이퍼테이블·Cagg·확장 객체가 그대로 복제되고 운영 복잡도가 낮은 Streaming Replication 을 택했습니다.',
        result: '메인 DB CPU 99% → 25% (피크 기준 약 75%p ↓)',
      },
      {
        title: '읽기를 사내망으로 — Replica 격리 + PgBouncer 풀링',
        approach:
          '읽기 트래픽을 사내망 안에서 끝내면 아웃바운드가 발생하지 않는다는 데 착안해 사내 내부 서버에 Replica 를 두고 Grafana 데이터 소스를 Replica 로 옮겼습니다. 다수 Edge 서버 커넥션은 PgBouncer 로 단일 엔드포인트에 풀링해 DB 위치 변화가 애플리케이션에 영향을 주지 않게 추상화했습니다.',
        result: '아웃바운드 트래픽 30Mbps → 10Mbps (약 67% ↓ · 계약 기준 10Mbps 이내)',
      },
      {
        title: '수집 에이전트 단일화(Alloy) + MemAvailable 기준 사전 알람',
        approach:
          '현장 노드의 호스트 메트릭을 Grafana Alloy 단일 에이전트로 모아 VictoriaMetrics 에 쌓았습니다. 알람은 MemAvailable 기준으로 실제 사용 가능 메모리를 계산해 85% 초과 시 울리도록 해 오탐을 줄였습니다. 버그로 메모리가 차오르던 기간에는 임계 도달을 먼저 감지해 다운을 막았고, 원인이 된 버그를 팀에서 수정한 뒤에도 알람 체계는 같은 상황을 장애 전에 잡아내는 안전장치로 남았습니다.',
        result: '현장 Edge 장비 다운 3대 → 0대 (12대 기준) — 메모리 고갈 전 사전 조치',
      },
    ],
    review: [
      {
        label: '배운 점',
        text: '병목 진단을 추측이 아니라 메트릭으로 시작하면 해결책 선택뿐 아니라 팀 설득까지 자연스럽게 따라온다는 것을 경험했습니다. 복제 도입 결정도 "데이터로 제시한 근거" 였기에 빠르게 합의될 수 있었습니다.',
      },
      {
        label: '배운 점',
        text: '네트워크 비용·계약 조건도 아키텍처 설계 변수라는 것을 배웠습니다. 읽기 트래픽의 방향을 사내망으로 돌리는 구조 변경 하나로 성능 문제와 비용 문제를 동시에 풀 수 있었습니다.',
      },
      {
        label: '아쉬운 점',
        text: '알람 체계를 장애가 반복된 뒤에야 갖췄습니다. 관측성(모니터링·알람)은 인프라를 확장하기 전에 먼저 확보해야 한다는 교훈을 얻었고, 이후 새 구성 요소를 올릴 때는 메트릭 수집을 기본값으로 포함하고 있습니다.',
      },
    ],
    outcome:
      'Prometheus 진단·Slave DB 격리로 DB CPU 99%→25% 안정화·아웃바운드 트래픽 10Mbps 이하 유지, Grafana Alloy 알림 체계 구축으로 현장 Edge 장비 다운율 25% → 0% 사전 예방.',
    metrics: [
      {
        label: '메인 DB CPU 사용률 (피크 기준)',
        beforeValue: 99,
        beforeDisplay: '99%',
        afterValue: 25,
        afterDisplay: '25%',
        improvement: '약 75%p ↓',
        unit: '%',
      },
      {
        label: '아웃바운드 트래픽 (피크)',
        beforeValue: 30,
        beforeDisplay: '30Mbps',
        afterValue: 10,
        afterDisplay: '10Mbps',
        improvement: '약 67% ↓ · 계약 기준 이내',
        unit: 'Mbps',
      },
      {
        label: '현장 Edge 장비 다운 (12대 기준)',
        beforeValue: 25,
        beforeDisplay: '3대 · 25%',
        afterValue: 0,
        afterDisplay: '0대',
        improvement: '알람 도입 이후 0건',
        unit: '%',
      },
    ],
    roles: [
      '메인 DB CPU 과부하 (99%) 문제를 Prometheus 메트릭으로 진단하여 팀 내 복제 (Replication) 아키텍처 도입 근거 제시',
      '실시간 관제 대시보드 (Grafana) 의 데이터 소스를 Slave DB 로 이전 — Master DB CPU 사용량 안정화 (평균 25%) 및 네트워크 아웃바운드 트래픽 10Mbps 이하 유지로 초과 비용 개선',
      '현장 PC 에 Grafana Alloy 에이전트를 도입하여 호스트 메트릭 수집 및 임계치 알림 체계를 구축, 메모리 고갈 전 사전 조치로 장비 다운율 25% → 0% 예방',
    ],
    media: [
      {
        label: '아키텍처',
        src: `${import.meta.env.BASE_URL}architectures/infra-architecture.svg`,
        alt: 'Replica 기반 조회 부하 분리와 Grafana Alloy 모니터링 흐름',
        description: [
          '현장 Edge의 데이터는 TimescaleDB Primary에 적재하고, Streaming Replication으로 Replica에 복제했습니다.',
          'Grafana 조회를 Replica로 분리해 Primary의 적재 부하와 대시보드 조회 부하를 나눴습니다.',
          'Edge와 DB의 메트릭은 Grafana Alloy가 VictoriaMetrics로 전송하고, Grafana 알림으로 운영 상태를 확인합니다.',
        ],
      },
    ],
    techRationale: [
      {
        question: 'PgBouncer 를 도입한 이유',
        hidden: true,
        tech: 'PgBouncer',
        preface:
          '업체 수 증가에 대비해 신규 클라우드 DB 서버를 추가 도입했지만 예상보다 사양이 부족해 CPU 가 100% 까지 치솟는 문제가 발생했습니다. 이를 해소하기 위해 신규 서버를 기존 DB 서버로 이전·통합하는 작업이 진행됐고, 이 통합 과정에서 read/write 가 여러 포트로 분산되어 있던 구조를 단일 엔드포인트로 정리하고 다수 Edge 서버의 동시 접속을 안전하게 처리하기 위해 팀에서 PgBouncer 를 함께 도입했습니다. 제가 고른 기술은 아니고, 이후 Grafana 데이터 소스를 Replica 로 옮기는 작업을 이 구조 위에서 했습니다.',
        reasons: [
          '여러 포트로 흩어져 있던 read/write 엔드포인트를 PgBouncer 단일 지점으로 통합 — 애플리케이션·Edge 서버가 DB 위치 변화나 포트 분기에 신경 쓰지 않도록 추상화했습니다.',
          '다수의 Edge 서버에서 동시에 발생하는 커넥션을 풀링·재사용하여 동시 접속 폭증으로 인한 max_connections 소진 문제를 해소했습니다.',
        ],
      },
      {
        question: 'Streaming Replication 을 선택한 이유',
        tech: 'Streaming Replication',
        preface:
          'Prometheus 메트릭으로 Grafana 읽기 쿼리가 DB 부하와 아웃바운드 트래픽의 주요 원인임을 확인했습니다. 읽기 트래픽을 사내 Replica로 분리하기 위해 Streaming Replication을 적용했습니다.',
        reasons: [
          'PostgreSQL 네이티브 기능으로 별도 복제 컴포넌트 없이 읽기·쓰기를 분리했습니다.',
          'TimescaleDB 하이퍼테이블·연속집계 등 확장 객체를 그대로 복제할 수 있었습니다.',
        ],
      },
      {
        question: 'Grafana Alloy 를 도입한 이유',
        tech: 'Grafana Alloy',
        preface:
          '외부에서 접근할 수 없는 Edge 서버마다 Prometheus agent·node exporter·Promtail을 따로 설치하던 구성이었습니다. 배포와 운영 대상을 하나로 줄이기 위해 Grafana Alloy로 통합했습니다.',
        decision:
          '성능보다는 세 가지 조건을 모두 만족하는지로 판단했습니다. Edge 가 업체 내부망에 있어 중앙에서 pull 할 수 없으니 push(remote_write) 를 지원할 것, 이미 Grafana 로 시각화·알람을 운영 중이니 같은 생태계 안에서 이어질 것, 현장에 한번 깔면 오래 두고 쓰는 만큼 벤더가 공식으로 지원하는 표준 에이전트일 것 — Alloy 가 셋을 모두 만족했습니다.',
        reasons: [
          '내장 unix exporter로 노드당 프로세스·설정 파일을 3개에서 1개로 줄였습니다.',
          '환경 변수 기반 설정과 remote_write를 이용해 다수 Edge 노드를 같은 방식으로 배포했습니다.',
        ],
        tradeoffs: [
          'River 라는 전용 설정 언어를 따로 익혀야 했고, Prometheus 설정을 전제로 쓰인 자료를 그대로 가져다 쓸 수 없었습니다.',
          '이미 돌고 있던 노드를 한 번에 갈아엎을 수는 없어 전환 기간에는 구·신 구성이 함께 도는 상태를 감수했고, 이관이 끝난 노드부터 기존 Prometheus·Promtail 을 제거 스크립트로 걷어냈습니다.',
          '실제로 쓰는 것은 메트릭 수집뿐인데 로그·트레이스까지 포함한 바이너리가 현장 노드에 올라갑니다 — 확장 여지를 얻는 대신 당장 쓰지 않는 기능까지 함께 배포됩니다.',
        ],
      },
      {
        question: 'VictoriaMetrics 를 선택한 이유',
        hidden: true,
        tech: 'VictoriaMetrics',
        preface:
          '에이전트를 Alloy 로 바꾸면서 수신·저장 계층도 함께 옮겼습니다. 초기에는 중앙 Prometheus 서버가 각 노드의 remote_write 를 받아 저장했는데, 노드 수와 보관 기간이 늘수록 저장소 쪽이 먼저 한계에 닿을 것으로 보고 VictoriaMetrics 로 교체했습니다.',
        decision:
          '메트릭 저장소는 한번 정하면 쌓인 데이터 때문에 되돌리기 비싼 선택이라, 지금 메트릭 양이 아니라 노드가 늘고 보관 기간이 길어진 뒤를 기준으로 판단했습니다. Prometheus 를 그대로 두면 장기 보관을 위해 결국 원격 저장소를 따로 붙여야 하는 구조여서, 어차피 에이전트를 갈아끼우는 김에 저장소까지 한 번에 정리하는 편이 낫다고 봤습니다.',
        reasons: [
          '공식 벤치마크 기준 Prometheus 대비 디스크 사용량이 크게 낮아(최대 5~7배), 메트릭 장기 보관 비용을 구조적으로 절감할 수 있습니다.',
          '태생부터 "낮은 메모리 점유" 를 목표로 설계되어 다수 Edge 노드의 메트릭이 누적되는 환경에서도 단일 노드 자원으로 안정적 운영이 가능합니다.',
          '향후 메트릭 양이 늘면 cluster 모드로 scale-out 이 가능해 인프라 확장 경로가 단일 노드 한계에 막히지 않습니다.',
        ],
        tradeoffs: [
          '저장 효율·메모리 수치는 공식 벤치마크를 근거로 삼았고, 앞서 쓰던 중앙 Prometheus 와 같은 조건에서 직접 측정해 비교하지는 않았습니다. 전환 이후 단일 노드로 안정 운영되는 것은 확인했지만, 그대로 뒀다면 어땠는지는 대조군이 없습니다.',
          '사실상 표준인 Prometheus 에서 벗어난 선택이라 참고할 운영 사례가 적고, PromQL 호환을 표방하지만 완전히 같지는 않아 Prometheus 전제 자료를 그대로 옮기기 어려운 경우가 있습니다.',
        ],
      },
    ],
    codeSections: [
      {
        slug: 'agent-provisioning',
        title: 'Agent Provisioning · Alloy 일괄 설치 스크립트',
        icon: 'pi pi-server',
        headline:
          '반복 설치가 필요한 Edge 노드의 모니터링 에이전트 배포 절차를 하나의 스크립트로 표준화했습니다.',
        implementationCard: {
          approach: [
            '노드별 주소·인증 정보만 환경 변수로 주입하고, 설치·설정 생성·검증·기동·헬스체크를 하나의 흐름으로 구성했습니다.',
            'Prometheus agent·node exporter·Promtail 구성을 Alloy 단일 에이전트로 통합했습니다.',
          ],
          result: '노드별 운영 대상을 3개 프로세스에서 1개로 줄이고, 설치 이후 실제 수집 가능 상태까지 일관되게 확인할 수 있게 했습니다.',
        },
        snippets: [
          {
            title: 'alloy_agent_install.sh — 설치·검증·기동 파이프라인 (Bash)',
            description:
              '노드별 값은 .env / 인라인으로 주입받아 /etc/default/alloy 에 쓰고, 저장소 등록 → 설치 → 설정 생성 → 포맷 검증 → 기동 → 헬스체크를 한 흐름으로 실행.',
            collapsed: true,
            highlightPhrases: ['write_env_file', 'validate_config', 'check_installation'],
            language: 'bash',
            code: `# 우선순위: 인라인 주입(FOO=bar ./script.sh) > .env > 아래 기본값
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
[ -f "$SCRIPT_DIR/.env" ] && { set -a; . "$SCRIPT_DIR/.env"; set +a; }

REMOTE_WRITE_URL="\${REMOTE_WRITE_URL:-https://monitor.example.com/api/v1/write}"
REMOTE_WRITE_USER="\${REMOTE_WRITE_USER:-agent}"
REMOTE_WRITE_PASSWORD="\${REMOTE_WRITE_PASSWORD:-change_me}"
ALLOY_INSTANCE="\${ALLOY_INSTANCE:-$(hostname)}"   # 노드 유일 식별자

# systemd(alloy.service) 가 EnvironmentFile 로 읽는 파일 — 비밀번호 포함이라 640
write_env_file() {
    sudo tee /etc/default/alloy > /dev/null <<EOF
CONFIG_FILE=/etc/alloy/config.alloy
CUSTOM_ARGS="--server.http.listen-addr=0.0.0.0:\${ALLOY_HTTP_PORT} --stability.level=generally-available"
INSTANCE=\${ALLOY_INSTANCE}
REMOTE_WRITE_URL=\${REMOTE_WRITE_URL}
REMOTE_WRITE_USER=\${REMOTE_WRITE_USER}
REMOTE_WRITE_PASSWORD=\${REMOTE_WRITE_PASSWORD}
EOF
    sudo chmod 640 /etc/default/alloy
    sudo chown root:alloy /etc/default/alloy
}

main() {
    [[ $EUID -eq 0 ]] && { log_error "root 로 실행하지 마세요"; exit 1; }

    check_time_sync      # NTP 미동기화 시 timestamp 어긋나 조회 불가 — 설치 전 차단
    add_grafana_repo     # apt 키링 + Grafana 저장소 등록 (이미 있으면 skip)
    install_alloy        # apt-get install -y alloy
    write_env_file       # /etc/default/alloy  — 노드별로 다른 값
    write_alloy_config   # /etc/alloy/config.alloy — 전 노드 동일
    validate_config      # alloy fmt --test 로 설정 포맷 검증
    start_service        # systemctl enable + restart, is-active 로 기동 확인
    check_installation   # /-/ready 헬스체크 + 접속·운영 명령 안내 출력
}`,
          },
          {
            title: 'config.alloy — 호스트 메트릭 수집 · remote_write (River)',
            description:
              '내장 unix exporter 로 호스트 지표를 수집하고, instance 라벨을 노드 식별자로 치환한 뒤 basic_auth 로 중앙 VictoriaMetrics 에 push.',
            collapsed: true,
            highlightPhrases: ['prometheus.remote_write "central"', 'replacement  = sys.env("INSTANCE")', 'forward_to      = [prometheus.remote_write.central.receiver]'],
            language: 'river',
            code: `// 중앙 저장소(VictoriaMetrics) 로 push — 엣지가 내부망이라 pull 불가
prometheus.remote_write "central" {
  endpoint {
    url = sys.env("REMOTE_WRITE_URL")

    basic_auth {
      username = sys.env("REMOTE_WRITE_USER")
      password = sys.env("REMOTE_WRITE_PASSWORD")
    }

    // 회선이 끊겼다 붙을 때 밀린 샘플을 몰아 보낼 수 있도록 큐 여유를 둔다
    queue_config {
      max_samples_per_send = 1000
      max_shards           = 200
      capacity             = 2500
      batch_send_deadline  = "5s"
    }
  }
}

// 호스트 지표 — 별도 node_exporter 바이너리 없이 Alloy 내장 unix exporter 사용
prometheus.exporter.unix "host" { }

// 내장 exporter 가 박는 기본 instance 라벨을 노드 유일 식별자로 치환
discovery.relabel "host_targets" {
  targets = prometheus.exporter.unix.host.targets
  rule {
    target_label = "instance"
    replacement  = sys.env("INSTANCE")
  }
}

// job 라벨은 Alloy 컨벤션상 "integrations/unix" 로 고정 — 알람 룰의 필터 기준이 된다
prometheus.scrape "host_metrics" {
  targets         = discovery.relabel.host_targets.output
  forward_to      = [prometheus.remote_write.central.receiver]
  scrape_interval = "15s"
}`,
          },
        ],
      },
      {
        slug: 'grafana',
        title: 'Grafana Dashboard · Alert',
        icon: 'pi pi-chart-line',
        headline:
          '호스트 자원 고갈을 실제 장애 전에 감지하도록 Grafana 알림 룰을 구성했습니다.',
        implementationCard: {
          approach: [
            'Alloy의 unix exporter 메트릭만 라벨로 분리해 알림 대상과 범위를 명확히 했습니다.',
            'MemAvailable 기준 사용률로 캐시·버퍼를 반영해 85% 초과 시 알림을 발송했습니다.',
          ],
          result: '메모리 고갈 전에 조치할 수 있는 운영 경로를 마련해 현장 Edge 장비 다운을 예방했습니다.',
        },
        snippets: [
          {
            title: 'Grafana 알람 룰 — 메모리 사용률 85% 초과 감지 (PromQL)',
            description:
              '(1 − MemAvailable / MemTotal) × 100 으로 메모리 사용률을 계산하고, unix exporter job 라벨로 필터링해 85% 초과 시 알람 발송.',
            collapsed: true,
            highlightPhrases: ['node_memory_MemAvailable_bytes', ') * 100'],
            language: 'sql',
            code: `(
  1 - (
    node_memory_MemAvailable_bytes{origin_prometheus=~"", job=~"integrations/unix"}
    /
    node_memory_MemTotal_bytes{origin_prometheus=~"", job=~"integrations/unix"}
  )
) * 100`,
          },
        ],
      },
    ],
}
