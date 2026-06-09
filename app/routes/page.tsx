import RoutesView from "@/components/RoutesView";
import { getAttractions } from "@/lib/data";

export const metadata = {
  title: "기상 연동 동선 — Sokcho Insight",
};

export default function RoutesPage() {
  const attractions = getAttractions();

  return (
    <main className="bg-[#F0F2F5]">
      <div className="mx-auto max-w-[1100px] px-4 py-12">
        <header className="mb-8">
          <h1 className="text-[clamp(28px,5vw,40px)] font-bold leading-[1.2] tracking-[-0.01em] text-[#1C2B33]">
            기상 연동 동선 큐레이션
          </h1>
          <p className="mt-3 max-w-[640px] text-[17px] leading-[1.53] text-[#65676B]">
            현재 GPS 위치의 실시간 날씨를 기준으로 동선을 자동 큐레이션합니다.
            악천후 시에는 실내 박물관 클러스터 위주로 대안 경로를 제안합니다.
          </p>
        </header>
        <RoutesView attractions={attractions} />
      </div>
    </main>
  );
}
