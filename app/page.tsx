import Link from "next/link";
import { UtensilsCrossed, CloudSun, ChevronRight } from "lucide-react";

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
    <main>
      {/* Hero — 블랙 섹션 (immersive) */}
      <section className="bg-black text-white">
        <div className="mx-auto flex max-w-[980px] flex-col items-center px-5 py-28 text-center">
          <p className="text-[19px] font-semibold tracking-[-0.374px] text-[#2997ff]">
            Sokcho Insight
          </p>
          <h1 className="mt-3 text-[clamp(40px,8vw,56px)] font-semibold leading-[1.07] tracking-[-0.28px]">
            광고 없는 진짜 속초를 만나다
          </h1>
          <p className="mt-5 max-w-[640px] text-[21px] font-normal leading-[1.19] tracking-[0.231px] text-white/80">
            오염된 여행 정보 대신, 교차 검증된 데이터로 현지인 가성비와 공신력
            있는 정보를 제공합니다.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/restaurants"
              className="rounded-[980px] bg-[#0071e3] px-[21px] py-[11px] text-[17px] font-normal text-white transition hover:bg-[#0077ed]"
            >
              맛집 큐레이션
            </Link>
            <Link
              href="/routes"
              className="inline-flex items-center gap-1 text-[17px] font-normal text-[#2997ff] hover:underline"
            >
              기상 동선 보기
              <ChevronRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Features — 라이트그레이 섹션 (informational) */}
      <section className="bg-[#f5f5f7]">
        <div className="mx-auto max-w-[980px] px-5 py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map(({ href, Icon, title, desc, cta }) => (
              <div
                key={href}
                className="flex flex-col rounded-[28px] bg-white p-7"
              >
                <Icon size={32} className="text-[#0071e3]" aria-hidden />
                <h2 className="mt-4 text-[28px] font-semibold leading-[1.14] tracking-[0.196px] text-[#1d1d1f]">
                  {title}
                </h2>
                <p className="mt-3 text-[17px] leading-[1.47] tracking-[-0.374px] text-black/80">
                  {desc}
                </p>
                <Link
                  href={href}
                  className="mt-5 inline-flex items-center gap-1 text-[14px] tracking-[-0.224px] text-[#0066cc] hover:underline"
                >
                  {cta}
                  <ChevronRight size={16} aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles — 흰 섹션 */}
      <section className="bg-white">
        <div className="mx-auto max-w-[980px] px-5 py-20">
          <h2 className="text-center text-[40px] font-semibold leading-[1.1] tracking-[-0.28px] text-[#1d1d1f]">
            데이터 무결성
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {principles.map((p) => (
              <div key={p.label} className="rounded-[28px] bg-[#f5f5f7] p-7">
                <p className="text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f]">
                  {p.label}
                </p>
                <p className="mt-2 text-[14px] leading-[1.29] tracking-[-0.224px] text-black/80">
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
