import type { Metadata } from "next";
import Link from "next/link";
import { UtensilsCrossed, CloudSun } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sokcho Insight — 광고 없는 진짜 속초",
  description:
    "광고와 바이럴에 오염되지 않은, 교차 검증된 속초 여행 큐레이션. 데이터 무결성을 핵심 가치로 합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-[#1C2B33]">
        {/* 헤더 — 화이트 + Meta Blue 액센트 */}
        <header className="sticky top-0 z-50 border-b border-[#E4E6EB] bg-white/90 [backdrop-filter:blur(8px)]">
          <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4">
            <Link
              href="/"
              className="bg-[linear-gradient(120deg,#0064E0,#0082FB)] bg-clip-text text-[20px] font-bold text-transparent"
            >
              Sokcho Insight
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/restaurants"
                className="flex items-center gap-1.5 rounded-[8px] px-3 py-2 text-[15px] font-semibold text-[#65676B] transition hover:bg-[#F0F2F5] hover:text-[#1C2B33]"
              >
                <UtensilsCrossed size={18} aria-hidden />
                맛집 큐레이션
              </Link>
              <Link
                href="/routes"
                className="flex items-center gap-1.5 rounded-[8px] px-3 py-2 text-[15px] font-semibold text-[#65676B] transition hover:bg-[#F0F2F5] hover:text-[#1C2B33]"
              >
                <CloudSun size={18} aria-hidden />
                기상 동선
              </Link>
            </div>
          </nav>
        </header>

        {children}

        <AdSlot />

        {/* 다크 풀-위드 푸터 (#1C2B33) + 제작 정보 */}
        <footer className="bg-[#1C2B33] py-10">
          <div className="mx-auto max-w-[1100px] px-4">
            <p className="bg-[linear-gradient(120deg,#0064E0,#0082FB)] bg-clip-text text-[20px] font-bold text-transparent">
              Sokcho Insight
            </p>
            <p className="mt-2 text-[13px] leading-[1.5] text-[#8A8D91]">
              데이터 무결성(Data Integrity)을 지향하는 속초 여행 큐레이션 · MVP
              (목업 데이터)
            </p>
            <div className="mt-5 border-t border-white/10 pt-4 text-[13px] text-[#BCC0C4]">
              <p>
                제작사 <span className="font-semibold text-white">Viva Sokcho</span>
              </p>
              <p className="mt-1">
                제작자 <span className="font-semibold text-white">신현우</span>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
