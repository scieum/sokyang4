// 기상 연동 동선 큐레이션 로직 (순수 함수)
//
// 우천·강풍·눈 등 악천후 시 실내(박물관 등) 위주의 대안 경로를 제안하고,
// 맑은 날에는 속초 8경 등 야외 명소를 우선 추천한다.

import type { Attraction, WeatherCondition } from "@/types";

/** 야외 활동이 어려운 악천후인지 판단 */
export function isBadWeather(condition: WeatherCondition): boolean {
  return condition === "rain" || condition === "wind" || condition === "snow";
}

/**
 * 기상 조건에 따라 관광지를 큐레이션한다.
 * - 악천후: 실내/악천후 무관 명소만 추천
 * - 맑음: 전체(야외 우선 정렬) 추천
 */
export function curateRoute(
  attractions: Attraction[],
  condition: WeatherCondition,
): Attraction[] {
  if (isBadWeather(condition)) {
    return attractions.filter((a) => a.type === "indoor" || a.weatherProof);
  }
  // 맑은 날은 야외 명소를 앞에 배치
  return [...attractions].sort((a, b) => {
    if (a.type === b.type) return 0;
    return a.type === "outdoor" ? -1 : 1;
  });
}

/** 기상 조건별 안내 문구 */
export function weatherAdvice(condition: WeatherCondition): string {
  switch (condition) {
    case "rain":
      return "비가 내려요. 국립산악박물관·속초시립박물관 등 실내 명소 위주로 동선을 추천합니다.";
    case "wind":
      return "강풍이 불어요. 해안 산책로 대신 실내 클러스터 중심의 동선이 안전합니다.";
    case "snow":
      return "눈이 내려요. 미끄러운 야외 코스보다 실내 명소를 우선 추천합니다.";
    case "clear":
    default:
      return "날씨가 좋아요. 속초 8경 등 야외 명소를 마음껏 즐기기 좋은 날입니다.";
  }
}
