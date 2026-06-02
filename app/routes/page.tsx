import RoutesView from "@/components/RoutesView";
import { getAttractions } from "@/lib/data";

export const metadata = {
  title: "기상 연동 동선 — Sokcho Insight",
};

export default function RoutesPage() {
  const attractions = getAttractions();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-[1100px] px-5 py-16">
        <header className="mb-10">
          <h1 className="text-[clamp(32px,5vw,44px)] font-semibold leading-[1.05] tracking-[-1.2px] text-[#211922]">
            기상 연동 동선 큐레이션
          </h1>
          <p className="mt-4 max-w-[640px] text-[18px] leading-[1.4] text-[#62625b]">
            오늘의 날씨를 선택하면 동선을 자동 큐레이션합니다. 악천후 시에는 실내
            박물관 클러스터 위주로 대안 경로를 제안합니다.
          </p>
        </header>
        <RoutesView attractions={attractions} />
      </div>
    </main>
  );
}
