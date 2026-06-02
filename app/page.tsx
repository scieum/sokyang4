import Link from "next/link";
import { UtensilsCrossed, CloudSun, ArrowRight } from "lucide-react";

const features = [
  {
    href: "/restaurants",
    Icon: UtensilsCrossed,
    title: "3단계 필터링 맛집 큐레이션",
    desc: "구글 평점(실용성)과 네이버 플레이스(인지도)를 5:5로 융합하고, 검증 자료를 가중한 뒤 평점 표준편차로 광고성 데이터를 걸러냅니다.",
    cta: "맛집 보기",
  },
  {
    href: "/routes",
    Icon: CloudSun,
    title: "기상 연동 동선 큐레이션",
    desc: "비·강풍·눈 등 악천후에는 국립산악박물관·속초시립박물관 등 실내 명소 위주의 대안 경로를 자동 제안합니다.",
    cta: "동선 보기",
  },
];

const principles = [
  { label: "광고·협찬 배제", value: "바이럴·협찬 콘텐츠는 노출하지 않습니다." },
  { label: "교차 검증", value: "구글·네이버 평점을 5:5로 융합합니다." },
  { label: "이상치 필터링", value: "평점 표준편차로 광고 추정 데이터를 분류합니다." },
];

export default function Home() {
  return (
    <main className="bg-white">
      {/* 히어로 — 화이트 캔버스, 70px 플럼 블랙 헤드라인 */}
      <section className="mx-auto max-w-[1100px] px-5 py-24 text-center">
        <p className="text-[16px] font-bold text-[#e60023]">속초 인사이트</p>
        <h1 className="mx-auto mt-4 max-w-[860px] text-[clamp(44px,8vw,70px)] font-semibold leading-[1.05] tracking-[-1.2px] text-[#211922]">
          광고 없는 진짜 속초를 만나다
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] text-[18px] leading-[1.4] text-[#62625b]">
          오염된 여행 정보 대신, 교차 검증된 데이터로 현지인 가성비와 공신력 있는
          정보를 제공합니다.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/restaurants"
            className="rounded-2xl bg-[#e60023] px-6 py-3 text-[16px] font-bold text-white transition hover:bg-[#ad081b]"
          >
            맛집 큐레이션
          </Link>
          <Link
            href="/routes"
            className="rounded-2xl bg-[#e5e5e0] px-6 py-3 text-[16px] font-bold text-[#211922] transition hover:bg-[#d9d9d2]"
          >
            기상 동선 보기
          </Link>
        </div>
      </section>

      {/* 피처 — 따뜻한 포그 카드 (20px 라운드) */}
      <section className="bg-[#f6f6f3]">
        <div className="mx-auto max-w-[1100px] px-5 py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map(({ href, Icon, title, desc, cta }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-[28px] bg-white p-8 transition hover:bg-[#fcfcfa]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e0e0d9] text-[#211922]">
                  <Icon size={24} aria-hidden />
                </span>
                <h2 className="mt-5 text-[28px] font-bold leading-tight tracking-[-1.2px] text-[#211922]">
                  {title}
                </h2>
                <p className="mt-3 text-[16px] leading-[1.4] text-[#62625b]">
                  {desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-bold text-[#e60023]">
                  {cta}
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="transition group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 원칙 — 화이트 섹션, 워밍 카드 */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-20">
          <h2 className="text-center text-[28px] font-bold tracking-[-1.2px] text-[#211922]">
            데이터 무결성
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {principles.map((p) => (
              <div key={p.label} className="rounded-[20px] bg-[#f6f6f3] p-7">
                <p className="text-[18px] font-bold text-[#211922]">
                  {p.label}
                </p>
                <p className="mt-2 text-[14px] leading-[1.5] text-[#62625b]">
                  {p.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
