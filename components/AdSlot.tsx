"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "sokcho-ad-dismissed";

/**
 * 우측 고정 광고 슬롯 (Google Ads 스타일, 닫기 가능).
 * - 콘텐츠와 겹치지 않도록 넓은 화면(2xl+)에서만 우측 여백에 노출.
 * - 닫기 시 localStorage 에 기록되어 다시 뜨지 않음.
 * - 캐릭터 등 라이선스 이미지는 포함하지 않으며, 광고주 자체 문구만 사용.
 */
export default function AdSlot() {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    setClosed(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const dismiss = () => {
    setClosed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* 무시 */
    }
  };

  if (closed) return null;

  return (
    <aside
      className="fixed right-5 top-1/2 z-40 hidden w-[200px] -translate-y-1/2 2xl:block"
      aria-label="광고"
    >
      <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_4px_16px_rgba(28,43,51,0.12)]">
        {/* 광고 라벨 바 */}
        <div className="flex items-center justify-between bg-[#F0F2F5] px-2 py-1">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#8A8D91]">
            광고 · Ad
          </span>
          <button
            onClick={dismiss}
            aria-label="광고 닫기"
            className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[#8A8D91] transition hover:bg-[#E4E6EB] hover:text-[#1C2B33]"
          >
            <X size={12} aria-hidden />
          </button>
        </div>

        {/* 광고 본문 (광고주 자체 문구) */}
        <div className="relative bg-[#22c07a] px-4 py-5 text-center text-white">
          <span className="absolute right-3 top-3 text-[18px] text-yellow-300">
            ★
          </span>
          <p className="text-[12px] font-semibold opacity-90">
            공기 좋고 아름다운 속초,
          </p>
          <p className="mt-2 text-[26px] font-extrabold leading-tight">
            <span className="rounded-md bg-[#e02d2d] px-1.5">YES</span>
          </p>
          <p className="mt-1 text-[22px] font-extrabold leading-tight text-[#0a3a2a]">
            설온중학교
          </p>

          <div className="mt-3 space-y-1.5 text-[12px] font-bold">
            <p className="rounded-md bg-[#f59e0b] px-2 py-1">
              잔디있음{" "}
              <span className="text-[10px] font-semibold">(2027 예정)</span>
            </p>
            <p className="rounded-md bg-[#d6217e] px-2 py-1">
              급식 진짜 GOOD!
            </p>
          </div>

          <p className="mt-3 text-[13px] font-extrabold leading-snug">
            좋은 친구들,
            <br />
            좋은 선생님,
            <br />
            좋은 학교!
          </p>

          <p className="mt-3 text-[9px] leading-tight opacity-80">
            본 광고는 무수익 자선 광고입니다. (광고주: 채지율)
          </p>
        </div>
      </div>
    </aside>
  );
}
