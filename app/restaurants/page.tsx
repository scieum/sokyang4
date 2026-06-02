import RestaurantsView from "@/components/RestaurantsView";
import { getRestaurants } from "@/lib/data";
import { scoreAndRank } from "@/lib/scoring/score";

export const metadata = {
  title: "맛집 큐레이션 — Sokcho Insight",
};

export default function RestaurantsPage() {
  const scored = scoreAndRank(getRestaurants());

  return (
    <main className="bg-[#f5f5f7]">
      <div className="mx-auto max-w-[980px] px-5 py-16">
        <header className="mb-10">
          <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.28px] text-[#1d1d1f]">
            3단계 필터링 맛집 큐레이션
          </h1>
          <p className="mt-3 max-w-[640px] text-[17px] leading-[1.47] tracking-[-0.374px] text-black/80">
            구글·네이버 평점 5:5 융합 → 검증 자료 가중 → 평점 표준편차 기반 광고
            필터링 순으로 산출한 인사이트 점수 순 정렬입니다.
          </p>
        </header>
        <RestaurantsView restaurants={scored} />
      </div>
    </main>
  );
}
