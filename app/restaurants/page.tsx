import RestaurantsView from "@/components/RestaurantsView";
import { getRestaurants } from "@/lib/data";
import { scoreAndRank } from "@/lib/scoring/score";

export const metadata = {
  title: "맛집 큐레이션 — Sokcho Insight",
};

export default function RestaurantsPage() {
  const scored = scoreAndRank(getRestaurants());

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-slate-900">
          3단계 필터링 맛집 큐레이션
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          구글·네이버 평점 5:5 융합 → 검증 자료 가중 → 평점 표준편차 기반 광고
          필터링 순으로 산출한 <strong>인사이트 점수</strong> 순 정렬입니다.
        </p>
      </header>
      <RestaurantsView restaurants={scored} />
    </div>
  );
}
