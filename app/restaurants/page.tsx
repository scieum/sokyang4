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
    <main className="bg-white">
      <div className="mx-auto max-w-[1100px] px-5 py-16">
        <header className="mb-10">
          <h1 className="text-[clamp(32px,5vw,44px)] font-semibold leading-[1.05] tracking-[-1.2px] text-[#211922]">
            3단계 필터링 맛집 큐레이션
          </h1>
          <p className="mt-4 max-w-[640px] text-[18px] leading-[1.4] text-[#62625b]">
            구글·네이버 평점 5:5 융합 → 검증 자료 가중 → 평점 표준편차 기반 광고
            필터링 순으로 산출한 인사이트 점수 순 정렬입니다.
          </p>
        </header>

        <EditorPicks picks={picks} />

        <InstagramFeed posts={instagramPosts} />

        <div className="mt-14">
          <h2 className="mb-6 text-[24px] font-bold tracking-[-1.2px] text-[#211922]">
            전체 큐레이션
          </h2>
          <RestaurantsView restaurants={scored} />
        </div>
      </div>
    </main>
  );
}
