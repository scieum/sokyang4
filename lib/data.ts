// 데이터 접근 레이어 (Phase 1: 목업 JSON)
// 추후 Supabase / 외부 API로 교체하더라도 이 함수들의 시그니처를 유지한다.

import restaurantsJson from "@/data/restaurants.json";
import attractionsJson from "@/data/attractions.json";
import instagramJson from "@/data/instagram.json";
import type { Attraction, InstagramPost, Restaurant } from "@/types";

export function getRestaurants(): Restaurant[] {
  return restaurantsJson as Restaurant[];
}

/** 제작자(에디터)가 직접 추천한 맛집 목록 — 알고리즘 점수와 별개의 큐레이션 */
export function getEditorPicks(): Restaurant[] {
  return getRestaurants().filter((r) => r.editorPick);
}

export function getAttractions(): Attraction[] {
  return attractionsJson as Attraction[];
}

/** 인스타그램 @i_love_sokcho 최근 1년 게시물 (빌드 시점 수집, 미설정 시 빈 배열) */
export function getInstagramPosts(): InstagramPost[] {
  return instagramJson as InstagramPost[];
}
