# 이진열 — 포트폴리오

제조 현장 시계열 데이터를 다루는 데이터 엔지니어 이진열의 개인 포트폴리오 사이트입니다.

**https://leejinyeol170.github.io**

## 구성

연차별로 담당했던 프로젝트를 문제 → 접근 → 결과 순으로 정리했고, 각 프로젝트는 아키텍처 다이어그램과 실제 운영 화면을 함께 담고 있습니다.

| 연차 | 프로젝트 | 기간 |
| --- | --- | --- |
| 1년차 | 스마트 팩토리 IIoT 시계열 데이터 최적화 및 통합 관제 대시보드 구축 | 2023.11 ~ 2024.04 |
| 2년차 | 시스템 인프라 고도화 및 모니터링, 알림 구축 | 2024.10 ~ 2025.05 |
| 3년차 | 데이터 파이프라인 구축 및 사내 자체 관리 대시보드 · 확장형 API 서버 개발 | 2025.11 ~ 2026.06 |
| 4년차 | 사내 문서 기반 RAG 챗봇 구축 | 2026.07 ~ 진행중 |

## 기술 스택

Vue 3 (`<script setup>`) · TypeScript · Vite · Vue Router · Tailwind CSS v4 · PrimeVue · ECharts · highlight.js

## 로컬 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입 체크(vue-tsc) + 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드 후 GitHub Pages로 배포합니다. SPA라 새로고침·직접 URL 진입을 위해 배포 단계에서 `index.html`을 `404.html`로 복사합니다.

## 디렉터리

```
src/
├── components/
│   ├── sections/     # Intro · Career · Projects · Skills · Contact 섹션
│   └── ...           # 아키텍처 다이어그램, 코드 블록, 지표 바 등 공용 컴포넌트
├── data/
│   ├── projects/     # 프로젝트별 상세 데이터 (연차 메타 포함)
│   └── skills.ts
├── views/            # 홈 · 프로젝트 상세 · 404
└── router/

public/architectures/  # 아키텍처 다이어그램(SVG) · 운영 화면 캡처(PNG)
```
