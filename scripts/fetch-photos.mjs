// 빌드 시점 맛집 실제 사진 수집 (Google Places API)
//
// 동작:
//  - GOOGLE_MAPS_API_KEY 가 있으면 각 맛집을 Places 에서 찾아 등록 사진을
//    내려받아 public/photos/<id>/<n>.jpg 로 저장하고, data/place-photos.json 에
//    { "<id>": ["photos/<id>/0.jpg", ...] } 매핑을 기록한다.
//  - 키가 없거나 실패하면 빌드를 깨지 않고 빈 매핑을 보장한 뒤 종료한다.
//  - API 키는 빌드 시점에서만 사용되며 클라이언트로 노출되지 않는다(이미지는
//    정적 파일로 서빙). 다운로드 이미지는 .gitignore 처리되어 매 배포 시 재생성.
//
// 주의: Google Places 사진은 Google 사용약관을 따른다(장기 보관 제한). 본
// 파이프라인은 배포 빌드마다 재생성하는 임시 캐시로만 사용한다.

import { writeFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const restaurants = require("../data/restaurants.json");

const KEY = process.env.GOOGLE_MAPS_API_KEY;
const PHOTOS_PER = 8;
const OUT_JSON = resolve(__dirname, "../data/place-photos.json");
const PUB_DIR = resolve(__dirname, "../public/photos");
const GMAP = "https://maps.googleapis.com/maps/api/place";

async function writeMap(obj) {
  await mkdir(dirname(OUT_JSON), { recursive: true });
  await writeFile(OUT_JSON, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

async function findPlaceId(name, lat, lng) {
  const url =
    `${GMAP}/findplacefromtext/json?input=${encodeURIComponent(name)}` +
    `&inputtype=textquery&fields=place_id&language=ko` +
    `&locationbias=circle:6000@${lat},${lng}&key=${KEY}`;
  const j = await (await fetch(url)).json();
  return j.candidates?.[0]?.place_id ?? null;
}

async function getPhotoRefs(placeId) {
  const url = `${GMAP}/details/json?place_id=${placeId}&fields=photos&language=ko&key=${KEY}`;
  const j = await (await fetch(url)).json();
  return (j.result?.photos ?? [])
    .slice(0, PHOTOS_PER)
    .map((p) => p.photo_reference);
}

async function downloadPhoto(ref, dest) {
  const url = `${GMAP}/photo?maxwidth=800&photo_reference=${ref}&key=${KEY}`;
  const res = await fetch(url); // 실제 이미지로 리다이렉트됨
  if (!res.ok) throw new Error(`photo ${res.status}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  if (!KEY) {
    console.log("[photos] GOOGLE_MAPS_API_KEY 미설정 — 실제 사진 수집 건너뜀.");
    await writeMap({});
    return;
  }
  await rm(PUB_DIR, { recursive: true, force: true });
  const map = {};
  for (const r of restaurants) {
    try {
      const pid = await findPlaceId(r.name, r.lat, r.lng);
      if (!pid) continue;
      const refs = await getPhotoRefs(pid);
      if (!refs.length) continue;
      const dir = resolve(PUB_DIR, r.id);
      await mkdir(dir, { recursive: true });
      const paths = [];
      for (let i = 0; i < refs.length; i += 1) {
        try {
          await downloadPhoto(refs[i], resolve(dir, `${i}.jpg`));
          paths.push(`photos/${r.id}/${i}.jpg`);
        } catch {
          /* 개별 사진 실패는 무시 */
        }
      }
      if (paths.length) map[r.id] = paths;
      console.log(`[photos] ${r.name}: ${paths.length}장`);
    } catch (e) {
      console.warn(`[photos] ${r.name} 실패: ${e.message}`);
    }
  }
  await writeMap(map);
  console.log(`[photos] 완료 — ${Object.keys(map).length}개 가게 실제 사진.`);
}

main();
