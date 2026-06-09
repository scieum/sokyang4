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
      {/* 그라데이션 히어로 (브랜드 에너지 — 화면당 1회) */}
      <section className="mx-auto max-w-[1100px] px-4 py-12">
        <div className="overflow-hidden rounded-[20px] bg-[linear-gradient(120deg,#0064E0,#0082FB)] px-6 py-20 text-center text-white shadow-[0_8px_32px_rgba(0,100,224,0.30)]">
          <h1 className="mx-auto max-w-[760px] text-[clamp(36px,7vw,56px)] font-bold leading-[1.07] tracking-[-0.02em]">
            광고 없는 진짜 속초를 만나다
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.53] text-white/90">
            오염된 여행 정보 대신, 교차 검증된 데이터로 현지인 가성비와 공신력
            있는 정보를 제공합니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/restaurants"
              className="rounded-[28px] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0064E0] transition hover:bg-white/90"
            >
              맛집 큐레이션
            </Link>
            <Link
              href="/routes"
              className="rounded-[28px] border-[1.5px] border-white/80 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
            >
              기상 동선 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 피처 — 제품 캔버스(#F0F2F5) 위 흰 카드 */}
      <section className="bg-[#F0F2F5]">
        <div className="mx-auto max-w-[1100px] px-4 py-16">
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map(({ href, Icon, title, desc, cta }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-[16px] bg-white p-6 shadow-[0_1px_2px_rgba(28,43,51,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(28,43,51,0.12)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(0,100,224,0.12)] text-[#0064E0]">
                  <Icon size={24} aria-hidden />
                </span>
                <h2 className="mt-4 text-[24px] font-semibold leading-[1.33] text-[#1C2B33]">
                  {title}
                </h2>
                <p className="mt-2 text-[15px] leading-[1.47] text-[#65676B]">
                  {desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-[15px] font-semibold text-[#0064E0]">
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

      {/* 원칙 */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-4 py-16">
          <h2 className="text-center text-[32px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#1C2B33]">
            데이터 무결성
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.label}
                className="rounded-[12px] bg-white p-6 shadow-[0_1px_2px_rgba(28,43,51,0.10)]"
              >
                <p className="text-[20px] font-semibold text-[#1C2B33]">
                  {p.label}
                </p>
                <p className="mt-2 text-[15px] leading-[1.47] text-[#65676B]">
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
