// 3단계 필터링 아키텍처 (순수 함수로 구현하여 테스트 용이)
//
//  Stage 1: 평점 융합 — 구글(실용성) : 네이버(인지도) = 5:5
//  Stage 2: 검증 자료 가중 — 블루리본 서베이, 연속 선정, 현지인 추천
//  Stage 3: 광고/이상치 필터링 — 플랫폼 간 평점 표준편차 분석으로
//           인플루언서/광고 추정 데이터에 패널티 부여
//
// 모든 점수는 0-100 스케일로 정규화한다.

import type { Restaurant, ScoredRestaurant, TrustLevel } from "@/types";

export const GOOGLE_WEIGHT = 0.5;
export const NAVER_WEIGHT = 0.5;

/** 두 플랫폼 평점의 표준편차 (표본 2개) */
export function computeDeviation(a: number, b: number): number {
  const mean = (a + b) / 2;
  const variance = ((a - mean) ** 2 + (b - mean) ** 2) / 2;
  return Math.sqrt(variance);
}

function toTrustLevel(score: number): TrustLevel {
  if (score >= 80) return "high";
  if (score >= 60) return "medium";
  return "low";
}

/** 단일 맛집에 3단계 필터링을 적용해 점수를 산출한다. */
export function computeScore(r: Restaurant): ScoredRestaurant {
  // --- Stage 1: 평점 융합 (0-5 → 0-100) ---
  const googleWeighted = r.ratings.google * GOOGLE_WEIGHT * 20;
  const naverWeighted = r.ratings.naver * NAVER_WEIGHT * 20;
  const fused = googleWeighted + naverWeighted; // 0-100

  // --- Stage 2: 검증 자료 가중 ---
  let verificationBonus = 0;
  if (r.verification.blueRibbon) {
    verificationBonus += r.verification.blueRibbon * 2; // 별당 +2
  }
  if (r.verification.yearsSelected) {
    verificationBonus += Math.min(r.verification.yearsSelected, 10) * 0.5; // 최대 +5
  }
  if (r.verification.localFavorite) {
    verificationBonus += 3;
  }

  // --- Stage 3: 광고/이상치 필터링 ---
  const ratingDeviation = computeDeviation(r.ratings.google, r.ratings.naver);
  const totalReviews = r.ratings.googleCount + r.ratings.naverCount;
  const lowReviewVolume = totalReviews < 100;
  // 플랫폼 간 평점 편차가 크고(>0.8) 리뷰 수가 적으면 광고/인플루언서 추정
  const adFiltered = ratingDeviation > 0.8 && lowReviewVolume;
  const deviationPenalty = adFiltered ? 15 : ratingDeviation * 5;

  const raw = fused + verificationBonus - deviationPenalty;
  const insightScore = Math.max(0, Math.min(100, Math.round(raw)));

  return {
    ...r,
    insightScore,
    trustLevel: toTrustLevel(insightScore),
    adFiltered,
    scoreBreakdown: {
      googleWeighted: Math.round(googleWeighted * 10) / 10,
      naverWeighted: Math.round(naverWeighted * 10) / 10,
      verificationBonus: Math.round(verificationBonus * 10) / 10,
      ratingDeviation: Math.round(ratingDeviation * 100) / 100,
    },
  };
}

/** 여러 맛집을 점수화하고 인사이트 점수 내림차순으로 정렬한다. */
export function scoreAndRank(restaurants: Restaurant[]): ScoredRestaurant[] {
  return restaurants
    .map(computeScore)
    .sort((a, b) => b.insightScore - a.insightScore);
}
