// 빌드 시점 인스타그램 수집 스크립트 (Instagram Graph API – Business Discovery)
//
// 동작:
//  - 환경변수 IG_ACCESS_TOKEN, IG_USER_ID 가 있으면 IG_TARGET_USERNAME(기본
//    i_love_sokcho)의 최근 게시물을 조회해 data/instagram.json 에 기록한다.
//  - 토큰이 없거나 호출이 실패하면 빌드를 깨지 않고, 기존 JSON을 유지하거나
//    빈 배열을 보장한 뒤 정상 종료한다. (토큰은 클라이언트로 절대 노출되지 않음)
//
// 필요 조건:
//  - 내 인스타그램 "비즈니스/크리에이터" 계정 + 장기 액세스 토큰 (IG_ACCESS_TOKEN)
//  - 내 IG 사용자 ID (IG_USER_ID)
//  - 대상 계정(i_love_sokcho)도 "비즈니스/크리에이터" 공개 계정이어야 함
//
// GitHub Actions 에서는 Secrets 로 주입한다 (.github/workflows/deploy.yml 참고).

import { writeFile, mkdir, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../data/instagram.json");

const TOKEN = process.env.IG_ACCESS_TOKEN;
const USER_ID = process.env.IG_USER_ID;
const TARGET = process.env.IG_TARGET_USERNAME || "i_love_sokcho";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const GRAPH = "https://graph.facebook.com/v21.0";

async function ensureFileExists() {
  try {
    await access(OUT);
  } catch {
    await mkdir(dirname(OUT), { recursive: true });
    await writeFile(OUT, "[]\n", "utf8");
  }
}

async function main() {
  if (!TOKEN || !USER_ID) {
    console.log(
      "[instagram] IG_ACCESS_TOKEN/IG_USER_ID 미설정 — 수집을 건너뜁니다 (섹션 숨김).",
    );
    await ensureFileExists();
    return;
  }

  const fields = `business_discovery.username(${TARGET}){media.limit(100){id,caption,permalink,media_type,timestamp}}`;
  const url = `${GRAPH}/${USER_ID}?fields=${encodeURIComponent(fields)}&access_token=${TOKEN}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (!res.ok || json.error) {
      throw new Error(JSON.stringify(json.error ?? json));
    }

    const media = json?.business_discovery?.media?.data ?? [];
    const cutoff = Date.now() - ONE_YEAR_MS;
    const posts = media
      .filter((m) => new Date(m.timestamp).getTime() >= cutoff)
      .map((m) => ({
        id: m.id,
        caption: m.caption ?? "",
        permalink: m.permalink,
        mediaType: m.media_type,
        timestamp: m.timestamp,
      }));

    await mkdir(dirname(OUT), { recursive: true });
    await writeFile(OUT, JSON.stringify(posts, null, 2) + "\n", "utf8");
    console.log(
      `[instagram] @${TARGET} 최근 1년 게시물 ${posts.length}건 수집 완료.`,
    );
  } catch (err) {
    console.warn(
      `[instagram] 수집 실패 — 빌드는 계속합니다. 사유: ${err.message}`,
    );
    await ensureFileExists();
  }
}

main();
