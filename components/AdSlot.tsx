"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { googleMapUrl } from "@/lib/naver";

const ROTATE_MS = 5000;
const DISCLAIMER = "본 광고는 무수익 지역 광고 입니다. (광고주: 채지율)";

/** 광고 1 — 설온중학교 (그라데이션 배너) */
function SeolonAd() {
  return (
    <div className="bg-[linear-gradient(90deg,#39c7c7_0%,#86d06f_55%,#ece45c_100%)] px-10 py-3">
      <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-x-5 gap-y-1 text-center">
        <span className="hidden text-[12px] font-semibold leading-tight text-[#1C2B33] sm:block">
          공기 맑고 자연 좋은
          <br />
          속초에 살고 싶다면?
        </span>
        <span className="text-[26px] font-extrabold tracking-tight text-[#4B3FBF] sm:text-[32px]">
          설온중학교
        </span>
        <span className="hidden text-[12px] font-semibold leading-tight text-[#1C2B33] sm:block">
          운동장 잔디 (2026년 후반기 예정)
          <br />
          급식 맛있음
        </span>
        <span className="w-full text-[10px] text-[#1C2B33]/70">{DISCLAIMER}</span>
      </div>
    </div>
  );
}

/** 광고 2 — 하도문 한옥마을 (그린 배너) */
function HadomunAd() {
  return (
    <div className="bg-[#7BD957] px-10 py-3">
      <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
        <span className="text-[22px] font-extrabold leading-tight text-white sm:text-[28px]">
          옛 정취의 아름다운, 하도문 한옥마을
        </span>
        <span className="w-full text-[10px] text-white/85">{DISCLAIMER}</span>
      </div>
    </div>
  );
}

/** 광고 3 — 속초 프리패스 (퍼플 배너) */
function FreePassAd() {
  return (
    <div className="bg-[#6A45D9] px-10 py-3">
      <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
        <span className="hidden text-[12px] font-semibold leading-tight text-white/90 sm:block">
          속초를 즐기는
          <br />
          색다른 방법
        </span>
        <span className="text-[26px] font-extrabold tracking-tight text-white sm:text-[32px]">
          속초 프리패스
        </span>
        <span className="rounded bg-[#F5E94B] px-2 py-0.5 text-[14px] font-extrabold text-[#1C2B33]">
          Free
        </span>
        <span className="w-full text-[10px] text-white/80">{DISCLAIMER}</span>
      </div>
    </div>
  );
}

const ADS = [
  { id: "seolon", href: "https://seol-on.gwe.ms.kr/main.do", Comp: SeolonAd },
  {
    id: "hadomun",
    href: googleMapUrl("강원특별자치도 속초시 도문동"),
    Comp: HadomunAd,
  },
  {
    id: "freepass",
    href: "https://leisure-web.yanolja.com/leisure/10103315",
    Comp: FreePassAd,
  },
];

const REASONS = [
  "이 광고가 관련이 없어요",
  "이 광고를 이미 여러 번 봤어요",
  "부적절한 광고예요",
];

/**
 * 페이지 맨 아래 고정 광고 (Google Ads 스타일).
 * - 스크롤을 따라다니지 않고 문서 맨 끝에 위치.
 * - 여러 광고가 일정 간격으로 번갈아 노출되며, 개수는 노출하지 않음.
 * - 닫기 → '왜 이 광고가 마음에 안 드시나요?' 피드백을 거쳐 닫힘.
 * - 닫아도 저장하지 않으므로 재접속/새로고침 시 다시 표시됨.
 */
export default function AdSlot() {
  const [closed, setClosed] = useState(false);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    if (closed || feedback) return;
    const t = setInterval(
      () => setIndex((p) => (p + 1) % ADS.length),
      ROTATE_MS,
    );
    return () => clearInterval(t);
  }, [closed, feedback]);

  if (closed) return null;

  const dismiss = () => {
    setFeedback(false);
    setClosed(true); // 세션 한정 — 저장하지 않아 재접속 시 다시 표시됨
  };

  const ad = ADS[index];
  const Ad = ad.Comp;

  return (
    <div className="relative border-t border-black/10">
      {/* 광고 본문 (클릭 시 링크) */}
      <a
        href={ad.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block"
        aria-label="광고 보기"
      >
        <Ad />
      </a>

      {/* 광고 라벨 */}
      <span className="absolute left-2 top-2 rounded bg-black/25 px-1.5 py-0.5 text-[10px] font-semibold text-white">
        광고
      </span>

      {/* 닫기 버튼 */}
      <button
        onClick={() => setFeedback((v) => !v)}
        aria-label="광고 닫기"
        className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white transition hover:bg-black/40"
      >
        <X size={16} aria-hidden />
      </button>

      {/* 피드백 팝오버 */}
      {feedback ? (
        <div
          className="absolute bottom-full right-2 mb-2 w-[280px] overflow-hidden rounded-[12px] bg-white shadow-[0_12px_28px_rgba(28,43,51,0.24)]"
          role="dialog"
          aria-label="광고 피드백"
        >
          <div className="border-b border-[#E4E6EB] px-4 py-3">
            <p className="text-[15px] font-bold text-[#1C2B33]">
              왜 이 광고가 마음에 안 드시나요?
            </p>
            <p className="mt-0.5 text-[12px] text-[#65676B]">
              이유를 선택하시면 이 광고를 숨깁니다.
            </p>
          </div>
          <div className="py-1">
            {REASONS.map((r) => (
              <button
                key={r}
                onClick={dismiss}
                className="block w-full px-4 py-2.5 text-left text-[14px] text-[#1C2B33] transition hover:bg-[#F0F2F5]"
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFeedback(false)}
            className="block w-full border-t border-[#E4E6EB] px-4 py-2.5 text-center text-[13px] font-semibold text-[#65676B] transition hover:bg-[#F0F2F5]"
          >
            취소
          </button>
        </div>
      ) : null}
    </div>
  );
}
