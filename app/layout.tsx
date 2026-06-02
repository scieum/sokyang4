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
      <body className="min-h-screen bg-white text-[#1d1d1f]">
        {/* Global Nav — Translucent Fog (HIG) */}
        <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(250,250,252,0.8)] [backdrop-filter:saturate(180%)_blur(20px)]">
          <nav className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-5">
            <Link
              href="/"
              className="text-[17px] font-semibold tracking-[-0.374px] text-black/80 transition hover:text-black"
            >
              Sokcho Insight
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/restaurants"
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[14px] font-normal tracking-[-0.224px] text-black/80 transition hover:text-black"
              >
                <UtensilsCrossed size={16} aria-hidden />
                맛집 큐레이션
              </Link>
              <Link
                href="/routes"
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[14px] font-normal tracking-[-0.224px] text-black/80 transition hover:text-black"
              >
                <CloudSun size={16} aria-hidden />
                기상 동선
              </Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className="bg-[#f5f5f7] py-8">
          <div className="mx-auto max-w-[980px] px-5">
            <p className="text-[12px] leading-[1.33] tracking-[-0.12px] text-black/48">
              Sokcho Insight · 데이터 무결성(Data Integrity)을 지향하는 속초 여행
              큐레이션 · MVP (목업 데이터)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
