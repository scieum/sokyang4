import EditorPicks from "@/components/EditorPicks";
import InstagramFeed from "@/components/InstagramFeed";
import RestaurantsView from "@/components/RestaurantsView";
import {
  getEditorPicks,
  getInstagramPosts,
  getRestaurants,
} from "@/lib/data";
import { scoreAndRank } from "@/lib/scoring/score";

export const metadata = {
  title: "맛집 큐레이션 — Sokcho Insight",
};

export default function RestaurantsPage() {
  const scored = scoreAndRank(getRestaurants());
  const picks = getEditorPicks();
  const instagramPosts = getInstagramPosts();

  return (
    <main className="bg-[#F0F2F5]">
      <div className="mx-auto max-w-[1100px] px-4 py-12">
        <header className="mb-8">
          <h1 className="text-[clamp(28px,5vw,40px)] font-bold leading-[1.2] tracking-[-0.01em] text-[#1C2B33]">
            3단계 필터링 맛집 큐레이션
          </h1>
          <p className="mt-3 max-w-[640px] text-[17px] leading-[1.53] text-[#65676B]">
            구글·네이버 평점 5:5 융합 → 검증 자료 가중 → 평점 표준편차 기반 광고
            필터링 순으로 산출한 인사이트 점수 순 정렬입니다.
          </p>
        </header>

        <EditorPicks picks={picks} />

        <InstagramFeed posts={instagramPosts} />

        <div className="mt-14">
          <h2 className="mb-6 text-[24px] font-semibold tracking-[-0.01em] text-[#1C2B33]">
            전체 큐레이션
          </h2>
          <RestaurantsView restaurants={scored} />
        </div>
      </div>
    </main>
  );
}
