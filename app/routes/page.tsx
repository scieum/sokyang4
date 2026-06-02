import RoutesView from "@/components/RoutesView";
import { getAttractions } from "@/lib/data";

export const metadata = {
  title: "기상 연동 동선 — Sokcho Insight",
};

export default function RoutesPage() {
  const attractions = getAttractions();

  return (
    <main className="bg-[#f5f5f7]">
      <div className="mx-auto max-w-[980px] px-5 py-16">
        <header className="mb-10">
          <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.28px] text-[#1d1d1f]">
            기상 연동 동선 큐레이션
          </h1>
          <p className="mt-3 max-w-[640px] text-[17px] leading-[1.47] tracking-[-0.374px] text-black/80">
            오늘의 날씨를 선택하면 동선을 자동 큐레이션합니다. 악천후 시에는 실내
            박물관 클러스터 위주로 대안 경로를 제안합니다.
          </p>
        </header>
        <RoutesView attractions={attractions} />
      </div>
    </main>
  );
}
