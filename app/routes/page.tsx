import RoutesView from "@/components/RoutesView";
import { getAttractions } from "@/lib/data";

export const metadata = {
  title: "기상 연동 동선 — Sokcho Insight",
};

export default function RoutesPage() {
  const attractions = getAttractions();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-slate-900">
          기상 연동 동선 큐레이션
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          오늘의 날씨를 선택하면 동선을 자동 큐레이션합니다. 악천후 시에는 실내
          박물관 클러스터 위주로 대안 경로를 제안합니다.
        </p>
      </header>
      <RoutesView attractions={attractions} />
    </div>
  );
}
