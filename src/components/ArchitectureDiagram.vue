<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Box {
  id: string
  x: number
  y: number
  w: number
  h: number
  title: string
  subtitle?: string
  icon: string
  icon2?: string
  accent: string
  layer?: 'service' | 'processing' | 'storage' | 'edge' | 'collection' | 'external'
}

interface Connection {
  id: string
  to: string
  points: number[][]
  label?: string
  labelPos?: { x: number; y: number }
  animated?: boolean
  delay?: number
}

function roundedPath(pts: number[][], r = 10): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [cx, cy] = pts[i]
    if (i === pts.length - 1) {
      d += ` L ${cx} ${cy}`
      continue
    }
    const [px, py] = pts[i - 1]
    const [nx, ny] = pts[i + 1]
    const inLen = Math.hypot(cx - px, cy - py)
    const outLen = Math.hypot(nx - cx, ny - cy)
    const er = Math.min(r, inLen / 2, outLen / 2)
    const inDx = (cx - px) / inLen
    const inDy = (cy - py) / inLen
    const outDx = (nx - cx) / outLen
    const outDy = (ny - cy) / outLen
    const bx = cx - inDx * er
    const by = cy - inDy * er
    const ax = cx + outDx * er
    const ay = cy + outDy * er
    d += ` L ${bx} ${by} Q ${cx} ${cy} ${ax} ${ay}`
  }
  return d
}

// 작은 구름 silhouette (180w x 50h) — Internet 통과 지점
const internetCloudPath = `
  M 20 35
  C 8 35, 0 25, 14 20
  C 6 8, 26 0, 40 8
  C 48 -5, 75 -5, 84 8
  C 100 -8, 130 -2, 134 16
  C 152 10, 174 20, 164 34
  C 180 35, 178 46, 162 46
  L 28 46
  C 6 48, 0 42, 20 35
  Z
`.replace(/\s+/g, ' ').trim()

const externalTop: Box[] = [
  {
    id: 'mgmt',
    x: 300,
    y: 20,
    w: 170,
    h: 50,
    title: '운영·관제팀',
    icon: 'mdi:account-tie',
    accent: '#64748b',
    layer: 'external',
  },
  {
    id: 'user',
    x: 510,
    y: 20,
    w: 170,
    h: 50,
    title: '사용자',
    icon: 'mdi:account-group',
    accent: '#64748b',
    layer: 'external',
  },
]

const innerBoxes: Box[] = [
  // SERVICE Layer (Cloud)
  {
    id: 'vue',
    x: 200,
    y: 170,
    w: 160,
    h: 72,
    title: 'Vue.js',
    subtitle: '프론트엔드 SPA',
    icon: 'logos:vue',
    accent: '#41B883',
    layer: 'service',
  },
  {
    id: 'fastapi',
    x: 400,
    y: 170,
    w: 180,
    h: 72,
    title: 'FastAPI',
    subtitle: 'API 서버',
    icon: 'logos:fastapi-icon',
    accent: '#009688',
    layer: 'service',
  },
  {
    id: 'grafana',
    x: 660,
    y: 170,
    w: 180,
    h: 72,
    title: 'Grafana',
    subtitle: '시각화·대시보드',
    icon: 'logos:grafana',
    accent: '#f46800',
    layer: 'service',
  },

  // PROCESSING Layer (Cloud)
  {
    id: 'airflow',
    x: 200,
    y: 290,
    w: 160,
    h: 72,
    title: 'Apache Airflow',
    subtitle: 'ELT 스케줄러',
    icon: 'logos:airflow-icon',
    accent: '#d63a3a',
    layer: 'processing',
  },
  {
    id: 'dbt',
    x: 400,
    y: 290,
    w: 180,
    h: 72,
    title: 'dbt',
    subtitle: '데이터 표준화',
    icon: 'logos:dbt-icon',
    accent: '#ff694a',
    layer: 'processing',
  },

  // STORAGE Layer (Cloud)
  {
    id: 'timescale',
    x: 200,
    y: 400,
    w: 380,
    h: 82,
    title: 'TimescaleDB',
    subtitle: '하이퍼테이블 · Cagg · 압축 정책',
    icon: 'simple-icons:timescale',
    accent: '#FDB515',
    layer: 'storage',
  },
  {
    id: 'vm',
    x: 620,
    y: 400,
    w: 220,
    h: 82,
    title: 'VictoriaMetrics',
    subtitle: '메트릭 저장소 (TSDB)',
    icon: 'mdi:chart-line-variant',
    accent: '#621773',
    layer: 'storage',
  },

  // EDGE SERVER 내부
  {
    id: 'opcua',
    x: 100,
    y: 640,
    w: 240,
    h: 72,
    title: 'OPC UA Server',
    subtitle: '센서 데이터 → OPC UA',
    icon: 'mdi:transit-connection-variant',
    accent: '#1e3a8a',
    layer: 'edge',
  },
  {
    id: 'prometheus',
    x: 480,
    y: 640,
    w: 180,
    h: 72,
    title: 'Prometheus',
    subtitle: '메트릭 수집',
    icon: 'logos:prometheus',
    accent: '#e6522c',
    layer: 'edge',
  },
  {
    id: 'alloy',
    x: 680,
    y: 640,
    w: 170,
    h: 72,
    title: 'Grafana Alloy',
    subtitle: '메트릭 에이전트',
    icon: 'logos:grafana',
    accent: '#f46800',
    layer: 'edge',
  },

]

const externalBottom: Box[] = [
  {
    id: 'plc',
    x: 180,
    y: 770,
    w: 140,
    h: 56,
    title: 'PLC',
    subtitle: 'LAN 직접 연결',
    icon: 'mdi:chip',
    accent: '#1F6FB0',
    layer: 'external',
  },
  {
    id: 'sensors',
    x: 440,
    y: 770,
    w: 140,
    h: 56,
    title: '센서',
    subtitle: 'Sensors',
    icon: 'mdi:access-point',
    accent: '#2E86C1',
    layer: 'external',
  },
]

const allBoxes = [...externalTop, ...innerBoxes, ...externalBottom]

const connections: Connection[] = [
  // === 주축 데이터 흐름 (애니메이션) ===
  // 1. PLC → OPC UA Server (LAN 직접)
  { id: 'plc-opcua',         to: 'opcua',     points: [[250,770],[250,712]], animated: true, delay: 0,
    label: 'LAN', labelPos: { x: 250, y: 741 } },
  // 2. 센서 → OPC UA Server (RS-232/485 → LAN, 컨버터는 선상 표기만)
  { id: 'sensors-opcua',     to: 'opcua',     points: [[510,770],[510,725],[310,725],[310,712]], animated: true, delay: 0.1,
    label: 'RS-232/485 → LAN', labelPos: { x: 510, y: 748 } },
  // 4. OPC UA Server → Internet (구름) → TimescaleDB
  { id: 'opcua-timescale',   to: 'timescale', points: [[220,640],[220,565],[410,565],[410,482]], animated: true, delay: 0.5,
    label: 'write', labelPos: { x: 220, y: 600 } },
  // 5. TimescaleDB → FastAPI
  { id: 'timescale-fastapi', to: 'fastapi',   points: [[380,400],[380,260],[490,260],[490,242]], animated: true, delay: 0.7,
    label: '마트 read', labelPos: { x: 435, y: 260 } },
  // 6. FastAPI → Vue
  { id: 'fastapi-vue',       to: 'vue',       points: [[400,206],[360,206]], animated: true, delay: 0.95,
    label: 'REST', labelPos: { x: 380, y: 216 } },
  // 7. Vue → 사용자
  { id: 'vue-user',          to: 'user',      points: [[280,170],[280,130],[560,130],[560,70]], animated: true, delay: 1.1,
    label: 'HTTPS', labelPos: { x: 420, y: 130 } },
  // 8. TimescaleDB → Grafana (병렬)
  { id: 'timescale-grafana', to: 'grafana',   points: [[580,400],[590,400],[590,270],[700,270],[700,242]], animated: true, delay: 0.7 },
  // 9. Grafana → 사용자
  { id: 'grafana-user',      to: 'user',      points: [[700,170],[700,130],[630,130],[630,70]], animated: true, delay: 1.1 },

  // === 보조 데이터 흐름 (정적) ===
  { id: 'grafana-mgmt',      to: 'mgmt',      points: [[800,170],[800,100],[385,100],[385,70]],
    label: 'HTTPS', labelPos: { x: 590, y: 100 } },
  { id: 'timescale-airflow', to: 'airflow',   points: [[270,400],[270,362]],
    label: 'raw read', labelPos: { x: 270, y: 381 } },
  { id: 'airflow-timescale', to: 'timescale', points: [[310,362],[310,400]],
    label: 'mart write', labelPos: { x: 310, y: 381 } },
  { id: 'airflow-dbt',       to: 'dbt',       points: [[360,326],[400,326]] },

  // === Edge Server 내부: OPC UA → Prometheus → Alloy ===
  { id: 'prometheus-alloy',  to: 'alloy',      points: [[550,676],[680,676]] },

  // === Alloy → Internet (구름) → VictoriaMetrics ===
  { id: 'alloy-vm',          to: 'vm',        points: [[765,640],[765,565],[510,565],[510,500],[730,500],[730,482]],
    label: 'remote_write', labelPos: { x: 765, y: 602 } },
  // VictoriaMetrics → Grafana (Cloud 내부)
  { id: 'vm-grafana',        to: 'grafana',   points: [[730,400],[730,270],[810,270],[810,242]],
    label: 'PromQL', labelPos: { x: 730, y: 335 } },
]

const accentMap: Record<string, string> = Object.fromEntries(
  allBoxes.map((b) => [b.id, b.accent]),
)

function strokeColor(c: Connection): string {
  return accentMap[c.to] ?? '#94a3b8'
}

const animatedCount = connections.filter((c) => c.animated).length
</script>

<template>
  <div class="w-full overflow-x-auto">
    <svg
      viewBox="0 0 920 860"
      preserveAspectRatio="xMidYMid meet"
      class="w-full min-w-[640px]"
      role="img"
      aria-label="Smart Factory Data Platform 아키텍처"
    >
      <!-- Container: Cloud (일반 사각형) -->
      <rect
        x="40"
        y="130"
        width="840"
        height="370"
        rx="14"
        fill="none"
        class="stroke-surface-300 dark:stroke-surface-700"
        stroke-width="1.2"
        stroke-dasharray="6 4"
      />
      <text
        x="60"
        y="152"
        class="fill-surface-500 dark:fill-surface-400"
        font-size="11"
        font-weight="600"
        letter-spacing="0.18em"
      >
        CLOUD
      </text>

      <!-- Container: Local Network -->
      <rect
        x="40"
        y="570"
        width="840"
        height="275"
        rx="14"
        fill="none"
        class="stroke-surface-300 dark:stroke-surface-700"
        stroke-width="1.2"
        stroke-dasharray="6 4"
      />
      <text
        x="60"
        y="592"
        class="fill-surface-500 dark:fill-surface-400"
        font-size="11"
        font-weight="600"
        letter-spacing="0.18em"
      >
        LOCAL NETWORK
      </text>

      <!-- Sub-container: Edge Server -->
      <rect
        x="80"
        y="610"
        width="790"
        height="125"
        rx="10"
        fill="none"
        class="stroke-surface-400 dark:stroke-surface-600"
        stroke-width="1.2"
        stroke-dasharray="4 3"
      />
      <text
        x="98"
        y="628"
        class="fill-surface-500 dark:fill-surface-400"
        font-size="10"
        font-weight="600"
        letter-spacing="0.16em"
      >
        EDGE SERVER
      </text>

      <!-- 계층 라벨 -->
      <text
        x="60"
        y="195"
        class="fill-primary"
        font-size="9"
        font-weight="700"
        letter-spacing="0.2em"
      >
        SERVICE
      </text>
      <text
        x="60"
        y="280"
        class="fill-primary"
        font-size="9"
        font-weight="700"
        letter-spacing="0.2em"
      >
        PROCESSING
      </text>
      <text
        x="60"
        y="395"
        class="fill-primary"
        font-size="9"
        font-weight="700"
        letter-spacing="0.2em"
      >
        STORAGE
      </text>

      <!-- 연결선 (Internet 구름보다 먼저 그려서 구름 통과 부분이 가려지도록) -->
      <g
        class="connections"
        fill="none"
        stroke-width="1.2"
        stroke-linejoin="round"
      >
        <path
          v-for="c in connections"
          :id="`path-${c.id}`"
          :key="c.id"
          :d="roundedPath(c.points)"
          :stroke="strokeColor(c)"
        />
        <template v-for="c in connections" :key="`label-${c.id}`">
          <g v-if="c.label && c.labelPos">
            <rect
              :x="c.labelPos.x - c.label.length * 3 - 4"
              :y="c.labelPos.y - 8"
              :width="c.label.length * 6 + 8"
              height="14"
              rx="3"
              class="fill-white dark:fill-surface-950"
            />
            <text
              :x="c.labelPos.x"
              :y="c.labelPos.y + 2"
              :fill="strokeColor(c)"
              font-size="9"
              font-weight="600"
              text-anchor="middle"
            >
              {{ c.label }}
            </text>
          </g>
        </template>
      </g>

      <!-- 박스 -->
      <g
        v-for="b in allBoxes"
        :key="b.id"
        :transform="`translate(${b.x},${b.y})`"
      >
        <rect
          :width="b.w"
          :height="b.h"
          rx="9"
          class="fill-white dark:fill-surface-900"
          :stroke="b.accent"
          stroke-width="1.2"
        />
        <foreignObject :width="b.w" :height="b.h" x="0" y="0">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            class="flex h-full items-center gap-2.5 px-3"
          >
            <div class="flex shrink-0 items-center gap-1">
              <Icon
                :icon="b.icon"
                class="size-7"
                :style="b.layer === 'external' || b.layer === 'collection' ? `color: ${b.accent}` : ''"
              />
              <Icon v-if="b.icon2" :icon="b.icon2" class="size-7" />
            </div>
            <div class="min-w-0 flex-1">
              <div
                class="truncate text-[12.5px] font-semibold text-surface-900 dark:text-surface-0"
              >
                {{ b.title }}
              </div>
              <div
                v-if="b.subtitle"
                class="truncate text-[10px] text-surface-500 dark:text-surface-400"
              >
                {{ b.subtitle }}
              </div>
            </div>
          </div>
        </foreignObject>
      </g>

      <!-- Internet (구름 모양 통과 지점) — 연결선보다 나중에 그려서 통과선이 가려짐 -->
      <g transform="translate(370, 510)">
        <path
          :d="internetCloudPath"
          class="fill-white dark:fill-surface-900"
          stroke="#94a3b8"
          stroke-width="1.2"
        />
        <foreignObject width="180" height="50" x="0" y="0">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            class="flex h-full items-center justify-center gap-1.5"
          >
            <Icon
              icon="mdi:cloud-outline"
              class="size-4"
              style="color: #64748b"
            />
            <span
              class="text-[11px] font-semibold tracking-wide text-surface-600 dark:text-surface-300"
            >
              Internet
            </span>
          </div>
        </foreignObject>
      </g>

      <!-- 애니메이션 패킷 -->
      <g class="packets">
        <template v-for="c in connections" :key="`pkt-${c.id}`">
          <circle v-if="c.animated" r="4" :fill="strokeColor(c)">
            <animateMotion
              dur="1.4s"
              repeatCount="indefinite"
              :begin="`${c.delay ?? 0}s`"
              rotate="auto"
            >
              <mpath :href="`#path-${c.id}`" />
            </animateMotion>
          </circle>
        </template>
      </g>
    </svg>
    <p
      class="mt-3 text-center text-[11px] text-surface-400 dark:text-surface-500"
    >
      {{ animatedCount }}개 주축 데이터 흐름 · 실시간 패킷 시뮬레이션 (Reduced
      Motion 시 정지)
    </p>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .packets {
    display: none;
  }
}
</style>
