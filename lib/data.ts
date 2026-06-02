// 데이터 접근 레이어 (Phase 1: 목업 JSON)
// 추후 Supabase / 외부 API로 교체하더라도 이 함수들의 시그니처를 유지한다.

import restaurantsJson from "@/data/restaurants.json";
import attractionsJson from "@/data/attractions.json";
import type { Attraction, Restaurant } from "@/types";

export function getRestaurants(): Restaurant[] {
  return restaurantsJson as Restaurant[];
}

export function getAttractions(): Attraction[] {
  return attractionsJson as Attraction[];
}
