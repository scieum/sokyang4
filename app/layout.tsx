import type { Metadata } from "next";
import Link from "next/link";
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
      <body className="min-h-screen antialiased">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-sky-700">
                Sokcho Insight
              </span>
              <span className="hidden text-xs text-slate-400 sm:inline">
                광고 없는 진짜 속초
              </span>
            </Link>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Link
                href="/restaurants"
                className="rounded-md px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                맛집 큐레이션
              </Link>
              <Link
                href="/routes"
                className="rounded-md px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                기상 동선
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          Sokcho Insight · 데이터 무결성(Data Integrity)을 지향하는 속초 여행
          큐레이션 · MVP (목업 데이터)
        </footer>
      </body>
    </html>
  );
}
