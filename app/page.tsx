import Link from "next/link";

const features = [
  {
    href: "/restaurants",
    emoji: "🍽️",
    title: "3단계 필터링 맛집 큐레이션",
    desc: "구글 평점(실용성)과 네이버 플레이스(인지도)를 5:5로 융합하고, 검증 자료를 가중한 뒤 평점 표준편차로 광고성 데이터를 걸러냅니다.",
  },
  {
    href: "/routes",
    emoji: "🌦️",
    title: "기상 연동 동선 큐레이션",
    desc: "우천·강풍·눈 등 악천후에는 국립산악박물관·속초시립박물관 등 실내 명소 위주의 대안 경로를 자동 제안합니다.",
  },
];

const principles = [
  { label: "광고/협찬 배제", value: "바이럴·협찬 콘텐츠는 노출하지 않습니다." },
  { label: "교차 검증", value: "구글·네이버 평점을 5:5로 융합합니다." },
  { label: "이상치 필터링", value: "평점 표준편차로 광고 추정 데이터를 분류합니다." },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 px-6 py-14 text-center text-white shadow-lg">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-sky-100">
          Sokcho Insight
        </p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          광고 없는 진짜 속초를 만나다
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sky-50">
          SNS 광고와 바이럴에 오염된 여행 정보 대신, 교차 검증된 데이터로
          현지인 가성비와 공신력 있는 정보를 제공합니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/restaurants"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-sky-700 shadow transition hover:bg-sky-50"
          >
            맛집 큐레이션 보기
          </Link>
          <Link
            href="/routes"
            className="rounded-full border border-white/60 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            기상 동선 보기
          </Link>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        {features.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
          >
            <div className="text-3xl">{f.emoji}</div>
            <h2 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-sky-700">
              {f.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {f.desc}
            </p>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
          핵심 가치 · 데이터 무결성
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.label}
              className="rounded-lg border border-slate-200 bg-white p-4 text-center"
            >
              <p className="text-sm font-bold text-sky-700">{p.label}</p>
              <p className="mt-1 text-xs text-slate-500">{p.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
