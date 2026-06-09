"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { googleMapUrl } from "@/lib/naver";

const STORAGE_KEY = "sokcho-ad-dismissed";
const ROTATE_MS = 5000;

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
        <span className="w-full text-[10px] text-[#1C2B33]/70">
          본 광고는 무수익 지역 광고 입니다. (광고주: 채지율)
        </span>
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
        <span className="w-full text-[10px] text-white/85">
          본 광고는 무수익 지역 광고 입니다. (광고주: 채지율)
        </span>
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
];

const REASONS = [
  "이 광고가 관련이 없어요",
  "이 광고를 이미 여러 번 봤어요",
  "부적절한 광고예요",
];

/**
 * 하단 고정 광고 배너 (Google Ads 스타일).
 * - 두 광고가 일정 간격으로 번갈아 노출(로테이션)되고, 각각 지정 링크로 연결.
 * - 닫기 → '왜 이 광고가 마음에 안 드시나요?' 피드백을 거쳐 닫힘(localStorage 기록).
 */
export default function AdSlot() {
  const [closed, setClosed] = useState(true);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClosed(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  // 로테이션
  useEffect(() => {
    if (closed || feedback) return;
    const t = setInterval(
      () => setIndex((p) => (p + 1) % ADS.length),
      ROTATE_MS,
    );
    return () => clearInterval(t);
  }, [closed, feedback]);

  // 배너 높이만큼 본문 하단 여백 확보 (콘텐츠 가림 방지)
  useEffect(() => {
    if (closed) {
      document.body.style.paddingBottom = "";
      return;
    }
    const h = ref.current?.offsetHeight ?? 0;
    document.body.style.paddingBottom = `${h}px`;
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [closed, index]);

  if (closed) return null;

  const dismiss = () => {
    setFeedback(false);
    setClosed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* 무시 */
    }
  };

  const ad = ADS[index];
  const Ad = ad.Comp;

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 shadow-[0_-2px_12px_rgba(28,43,51,0.12)]"
    >
      <div className="relative">
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

        {/* 로테이션 도트 */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {ADS.map((a, k) => (
            <span
              key={a.id}
              className={`h-1.5 w-1.5 rounded-full ${
                k === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

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
    </div>
  );
}
