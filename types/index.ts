// Sokcho Insight 공용 타입 정의
// 데이터 모델은 향후 실제 API(Google Places, Naver Maps, TourAPI, 기상청) 스키마와
// 호환되도록 설계한다.

/** 맛집 테마 — 웰니스 / 항구 / 시장 / 노포 */
export type RestaurantTheme = "wellness" | "harbor" | "market" | "oldShop";

export const THEME_LABEL: Record<RestaurantTheme, string> = {
  wellness: "웰니스",
  harbor: "항구",
  market: "시장",
  oldShop: "노포",
};

/** 플랫폼별 평점 — 구글(실용성) / 네이버(인지도) */
export interface RatingSource {
  google: number; // 0-5
  googleCount: number; // 리뷰 수
  naver: number; // 0-5
  naverCount: number; // 리뷰 수
}

/** 외부 검증 자료 (블루리본 서베이 등) */
export interface Verification {
  blueRibbon?: number; // 블루리본 별 개수 (0-3)
  yearsSelected?: number; // 연속 선정 연수
  localFavorite?: boolean; // 현지인 추천
}

export interface Restaurant {
  id: string;
  name: string;
  category: string; // 회 / 물회 / 닭강정 등
  theme: RestaurantTheme;
  address: string;
  priceRange: string;
  signatureMenu: string;
  description: string;
  ratings: RatingSource;
  verification: Verification;
  lat: number;
  lng: number;
}

export type TrustLevel = "high" | "medium" | "low";

/** 3단계 필터링 점수가 계산된 맛집 */
export interface ScoredRestaurant extends Restaurant {
  insightScore: number; // 최종 인사이트 점수 0-100
  trustLevel: TrustLevel;
  adFiltered: boolean; // 광고/이상치 의심으로 필터링되었는지
  scoreBreakdown: {
    googleWeighted: number;
    naverWeighted: number;
    verificationBonus: number;
    ratingDeviation: number; // 플랫폼 간 평점 표준편차
  };
}

/** 기상 조건 */
export type WeatherCondition = "clear" | "rain" | "wind" | "snow";

export const WEATHER_LABEL: Record<WeatherCondition, string> = {
  clear: "맑음",
  rain: "비",
  wind: "강풍",
  snow: "눈",
};

/** 관광지 — 속초 8경(야외) / 박물관 등(실내) */
export interface Attraction {
  id: string;
  name: string;
  type: "outdoor" | "indoor";
  category: string;
  description: string;
  /** 악천후에도 방문 가능 여부 (실내이거나 우천에도 무리 없는 곳) */
  weatherProof: boolean;
  lat: number;
  lng: number;
}
