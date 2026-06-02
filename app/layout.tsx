import type { Metadata } from "next";
import Link from "next/link";
import { UtensilsCrossed, CloudSun } from "lucide-react";
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
      <body className="min-h-screen bg-white text-[#211922]">
        {/* 클린 헤더 — 화이트 캔버스 + Pinterest Red 액센트 */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
          <nav className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5">
            <Link
              href="/"
              className="flex items-center gap-2 text-[20px] font-bold tracking-[-0.5px] text-[#e60023]"
            >
              Sokcho Insight
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/restaurants"
                className="flex items-center gap-1.5 rounded-2xl px-4 py-2 text-[16px] font-medium text-[#211922] transition hover:bg-[#e5e5e0]"
              >
                <UtensilsCrossed size={18} aria-hidden />
                맛집 큐레이션
              </Link>
              <Link
                href="/routes"
                className="flex items-center gap-1.5 rounded-2xl px-4 py-2 text-[16px] font-medium text-[#211922] transition hover:bg-[#e5e5e0]"
              >
                <CloudSun size={18} aria-hidden />
                기상 동선
              </Link>
            </div>
          </nav>
        </header>

        {children}

        {/* 다크 풀-위드 푸터 (#33332e) */}
        <footer className="bg-[#33332e] py-10">
          <div className="mx-auto max-w-[1100px] px-5">
            <p className="text-[20px] font-bold tracking-[-0.5px] text-white">
              Sokcho Insight
            </p>
            <p className="mt-2 text-[12px] leading-[1.5] text-[#91918c]">
              데이터 무결성(Data Integrity)을 지향하는 속초 여행 큐레이션 · MVP
              (목업 데이터)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
