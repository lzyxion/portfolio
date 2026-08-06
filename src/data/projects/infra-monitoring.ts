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
        src: `${import.meta.env.BASE_URL}architectures/infra-monitoring.svg`,
        alt: '스트리밍 복제 기반 IoT 데이터 · 모니터링 아키텍처',
        description: [
          '클라우드의 TimescaleDB Primary 앞단에 PgBouncer 를 두어 다수의 Edge 서버에서 들어오는 커넥션을 풀링·재사용하도록 했고, 적재된 IoT 시계열 데이터를 사내 내부 서버의 Replica 로 Streaming Replication 합니다. Grafana 대시보드의 데이터 소스를 Replica 로 격리해 Master 의 부하와 네트워크 아웃바운드 트래픽을 분리했고, 현장 엣지 서버와 클라우드 DB 양쪽에 Grafana Alloy + Prometheus 를 띄워 호스트·DB 메트릭을 VictoriaMetrics 로 수집해 통합 모니터링·알림 체계를 구성했습니다.',
        ],
      },
    ],
    techRationale: [
      {
        question: 'PgBouncer 를 도입한 이유',
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
          '클라우드 DB 통합 이후에도 Grafana 대시보드가 가져가는 읽기 트래픽이 누적되면서 클라우드 사업자의 아웃바운드 네트워크 계약 기준을 초과해 추가 비용이 발생하기 시작했습니다. 저는 Prometheus 로 메트릭을 쌓아 부하의 상당 부분이 Grafana 읽기 쿼리에서 온다는 것을 확인하고 읽기/쓰기 분리의 근거를 데이터로 제시했습니다. 이를 바탕으로 사내 Replica 로 읽기를 옮기기로 팀 내에서 결정했고, 복제 방식은 후보로 검토한 Logical Replication · pgpool · Patroni HA 중 Streaming Replication 으로 정해졌습니다 — 방식 선택 자체는 팀의 판단이었습니다.',
        reasons: [
          'PostgreSQL 네이티브 기능이라 별도 컴포넌트 도입 없이 빠르게 적용할 수 있었고, 운영 복잡도가 낮았습니다.',
          '물리 복제(byte-level) 방식이라 TimescaleDB 의 하이퍼테이블 · Continuous Aggregate · 확장 객체가 모두 그대로 복제되어 추가 호환성 검증이 필요 없었습니다.',
        ],
      },
      {
        question: 'Grafana Alloy 를 도입한 이유',
        tech: 'Grafana Alloy',
        preface:
          'Edge 서버가 업체 내부망에 있어 외부에서 접근할 수 없으므로 처음부터 push 방식으로 시작했고, 초기 구성은 노드마다 Prometheus agent · node_exporter · Promtail 을 각각 sh 스크립트로 설치하고 중앙 Prometheus 서버가 이를 수신하는 형태였습니다. 노드가 늘수록 한 대에 프로세스 세 개와 설정 파일 세 벌을 따로 맞춰야 해서 유지보수가 부담이 됐고, 이를 단일 에이전트로 정리하는 편이 낫다고 판단해 Grafana Alloy 로 전환했습니다.',
        decision:
          '성능보다는 세 가지 조건을 모두 만족하는지로 판단했습니다. Edge 가 업체 내부망에 있어 중앙에서 pull 할 수 없으니 push(remote_write) 를 지원할 것, 이미 Grafana 로 시각화·알람을 운영 중이니 같은 생태계 안에서 이어질 것, 현장에 한번 깔면 오래 두고 쓰는 만큼 벤더가 공식으로 지원하는 표준 에이전트일 것 — Alloy 가 셋을 모두 만족했습니다.',
        reasons: [
          '내장 unix exporter 로 호스트 지표를 직접 수집해 node_exporter 를 별도 설치·기동할 필요가 없어졌고, 노드당 systemd unit 과 설정 파일이 하나로 줄었습니다.',
          'River 설정 언어로 환경 변수 기반 라벨링·라우팅·queue_config 같은 운영 옵션을 한 파일에서 선언적으로 관리할 수 있어 다수 Edge 노드에 sh 스크립트로 일괄 배포·운영하기에 적합했습니다.',
          'Grafana 생태계와 자연스럽게 결합되어 Edge 메트릭 수집 → VictoriaMetrics 저장 → Grafana 시각화·알람까지 동일 벤더 스택 안에서 일관되게 흐를 수 있습니다.',
        ],
        tradeoffs: [
          'River 라는 전용 설정 언어를 따로 익혀야 했고, Prometheus 설정을 전제로 쓰인 자료를 그대로 가져다 쓸 수 없었습니다.',
          '이미 돌고 있던 노드를 한 번에 갈아엎을 수는 없어 전환 기간에는 구·신 구성이 함께 도는 상태를 감수했고, 이관이 끝난 노드부터 기존 Prometheus·Promtail 을 제거 스크립트로 걷어냈습니다.',
          '실제로 쓰는 것은 메트릭 수집뿐인데 로그·트레이스까지 포함한 바이너리가 현장 노드에 올라갑니다 — 확장 여지를 얻는 대신 당장 쓰지 않는 기능까지 함께 배포됩니다.',
        ],
      },
      {
        question: 'VictoriaMetrics 를 선택한 이유',
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
          '업체별 내부망에 흩어진 Edge 노드에 같은 수집 에이전트를 반복 설치해야 했기 때문에, apt 저장소 등록부터 설정 생성 · 검증 · systemd 기동 · 헬스체크까지를 한 번에 처리하는 sh 스크립트로 배포 절차 자체를 표준화했습니다. 초기 Prometheus agent · Promtail 구성에서 Alloy 단일 에이전트로 전환하면서 이 스크립트도 함께 다시 썼습니다.',
        note: [
          '노드마다 다른 값은 환경변수로만 분리 — 스크립트 본문과 config.alloy 는 전 노드가 동일하고, remote_write 주소 · basic_auth 자격 증명 · 노드 식별 라벨만 .env 나 인라인 주입으로 넘깁니다 (우선순위: 인라인 > .env > 기본값). 비밀번호가 들어가는 /etc/default/alloy 는 640 권한으로 생성합니다.',
          '설치를 "검증까지 끝난 상태" 로 정의 — 패키지 설치에서 멈추지 않고 alloy fmt --test 로 설정 포맷을 확인하고, systemctl is-active 와 /-/ready 헬스체크로 실제 기동까지 확인한 뒤 종료하게 해서 "설치는 됐는데 안 도는" 노드가 남지 않도록 했습니다.',
          'Edge 시계 어긋남을 설치 전에 차단 — 시계가 틀어진 노드는 잘못된 timestamp 로 push 해서 중앙에 저장은 되지만 조회되지 않는 증상이 납니다. 설치 시작 시 timedatectl 로 NTP 동기화 상태를 확인하고, 미동기화면 활성화할지 물어보고 진행합니다.',
          '노드당 관리 대상을 프로세스 3 → 1 로 축소 — Prometheus agent · node_exporter · Promtail 을 노드마다 따로 설치·기동하던 초기 구성을 내장 exporter 를 쓰는 Alloy 하나로 정리했고, 로그는 활용도가 낮아 수집 대상에서 제외했습니다. 이관이 끝난 노드의 기존 설치분은 별도 removal 스크립트(백업 후 서비스·바이너리·설정·계정 제거)로 걷어냈습니다.',
        ],
        snippets: [
          {
            title: 'alloy_agent_install.sh — 설치·검증·기동 파이프라인 (Bash)',
            description:
              '노드별 값은 .env / 인라인으로 주입받아 /etc/default/alloy 에 쓰고, 저장소 등록 → 설치 → 설정 생성 → 포맷 검증 → 기동 → 헬스체크를 한 흐름으로 실행.',
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
          'Grafana Alerting 으로 unix exporter 메트릭과 연결된 PromQL 룰을 작성해 호스트 자원 임계치를 자동 감시·알림하도록 구성했습니다.',
        note: [
          'Alloy 가 박은 job="integrations/unix" 라벨로 필터링해 unix exporter 메트릭에만 룰이 적용되도록 분리 — 다른 exporter 와 충돌 없이 호스트 자원만 정밀하게 감시합니다.',
          'MemAvailable 기준 사용률 계산 — 단순 Used 가 아니라 Available 을 기준으로 캐시·버퍼까지 반영한 실제 사용 가능 메모리로 임계치를 판단해 false-positive 알람을 줄였습니다.',
        ],
        snippets: [
          {
            title: 'Grafana 알람 룰 — 메모리 사용률 85% 초과 감지 (PromQL)',
            description:
              '(1 − MemAvailable / MemTotal) × 100 으로 메모리 사용률을 계산하고, unix exporter job 라벨로 필터링해 85% 초과 시 알람 발송.',
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
