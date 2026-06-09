# 맛집 실제 사진 연동 가이드 (Google Places)

각 맛집의 **실제 등록 사진**을 빌드 시점에 Google Places API로 받아 정적 파일로
노출합니다. API 키는 빌드/CI에서만 사용되며 **클라이언트로 노출되지 않습니다**
(이미지는 `public/photos/` 로 내려받아 정적 서빙).

## 동작

- `scripts/fetch-photos.mjs` 가 `npm run build` 전(`prebuild`)에 실행됩니다.
- 각 맛집을 상호명 + 좌표로 Places 에서 찾고, 등록 사진(최대 8장)을 내려받아
  `public/photos/<id>/<n>.jpg` 로 저장한 뒤 `data/place-photos.json` 에 매핑합니다.
- 갤러리는 실제 사진이 있으면 그대로 노출(분류 탭/안내 문구 없이), 없으면 기존
  참고 이미지로 폴백합니다.
- 키가 없거나 호출 실패 시 수집을 건너뛰고 빌드는 정상 진행됩니다.

## 설정

### 1) 키 발급
- [Google Cloud Console](https://console.cloud.google.com/) → 프로젝트 생성
- **Places API** 사용 설정 → API 키 발급 (HTTP 리퍼러 제한은 빌드용이므로 불필요,
  대신 IP/사용량 제한 권장)

### 2) 로컬
`.env.local` 에 추가 후 실행:

```
GOOGLE_MAPS_API_KEY=<발급한 키>
```

```bash
npm run fetch:photos   # public/photos + data/place-photos.json 생성
npm run dev
```

### 3) 배포 (GitHub Actions)
저장소 **Settings → Secrets and variables → Actions** 에 `GOOGLE_MAPS_API_KEY`
등록. `.github/workflows/deploy.yml` 가 빌드 시 주입하며, 다음 푸시부터 실제
사진이 채워집니다.

## 참고 / 한계

- Google Places 사진은 **Google 사용약관**을 따릅니다(사진 장기 보관 제한). 본
  파이프라인은 배포 빌드마다 재생성하는 **임시 캐시**로만 사용하며, 다운로드
  이미지는 `.gitignore` 처리되어 저장소에 커밋되지 않습니다.
- Google 사진에는 메뉴/인테리어/외관 **분류 정보가 없어**, 실제 사진 모드에서는
  카테고리 탭 대신 한 그리드로 보여줍니다.
- 직접 촬영/보유한 사진은 `data/restaurants.json` 의 `photos`
  (menu/interior/exterior) 필드에 URL로 넣으면 분류별로 노출됩니다.
