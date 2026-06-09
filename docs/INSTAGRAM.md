# 인스타그램 연동 가이드 (@i_love_sokcho)

Sokcho Insight는 인스타그램 게시물을 **빌드 시점에 수집**해 정적 페이지에 포함합니다.
액세스 토큰은 GitHub Actions Secrets / 로컬 `.env.local` 에서만 사용되며,
**클라이언트(브라우저)로는 절대 노출되지 않습니다.**

## 동작 개요

- `scripts/fetch-instagram.mjs` 가 `npm run build` 전(`prebuild`)에 실행됩니다.
- Instagram Graph API의 **Business Discovery** 로 대상 계정의 최근 게시물을 조회하고,
  **최근 1년** 게시물만 필터링해 `data/instagram.json` 에 저장합니다.
- 토큰이 없거나 호출이 실패하면 수집을 건너뛰고 빌드는 정상 진행되며,
  인스타그램 섹션은 자동으로 숨겨집니다.

## 필요 조건 (중요)

Business Discovery는 다음 조건을 모두 만족해야 동작합니다.

1. **내 인스타그램 계정이 "비즈니스" 또는 "크리에이터" 계정**이어야 하고,
   페이스북 페이지와 연결되어 있어야 합니다.
2. **대상 계정(`i_love_sokcho`)도 공개 "비즈니스/크리에이터" 계정**이어야 합니다.
   - 개인(personal) 계정이면 Graph API로 게시물을 가져올 수 없습니다(인스타그램 정책).
3. 장기(Long-lived) 액세스 토큰과 내 IG 사용자 ID가 필요합니다.

## 토큰 발급 절차 (요약)

1. [Meta for Developers](https://developers.facebook.com/) 에서 앱 생성
2. 인스타그램 그래프 API 제품 추가, 페이스북 페이지 ↔ IG 비즈니스 계정 연결
3. 권한: `instagram_basic`, `pages_show_list`, `business_management`
4. 단기 토큰 → **장기 토큰**으로 교환, 내 **IG User ID** 확인
5. 아래 값을 등록

## 설정 위치

### 로컬
`.env.local.example` 를 복사해 `.env.local` 작성:

```
IG_ACCESS_TOKEN=<장기 토큰>
IG_USER_ID=<내 IG 사용자 ID>
IG_TARGET_USERNAME=i_love_sokcho
```

그런 다음:

```bash
npm run fetch:instagram   # data/instagram.json 갱신
npm run dev               # 확인
```

### 배포 (GitHub Actions)
저장소 **Settings → Secrets and variables → Actions** 에 등록:

- `IG_ACCESS_TOKEN`
- `IG_USER_ID`

`.github/workflows/deploy.yml` 가 빌드 시 이 시크릿을 주입합니다.
다음 푸시(또는 워크플로 수동 실행)부터 인스타그램 섹션이 채워집니다.

## 한계 / 다음 단계

- 대상 계정이 개인 계정이면 공식 API로는 수집 불가 — 이 경우 게시물 캡션을
  직접 입력하는 방식(수기 큐레이션)으로 대체해야 합니다.
- 토큰 만료(장기 토큰 ~60일) 시 갱신 필요 — 추후 자동 갱신 잡 추가 검토.
- 캡션에서 맛집명/위치를 파싱해 네이버 지도와 자동 연계하는 로직은 Phase 2 확장 과제.
