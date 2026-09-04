"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string };

const GREETING =
  "안녕하세요! 속초 인사이트 도우미예요. 맛집·조건 필터, 기상 동선, 사진, 광고, 문의 등 무엇이든 물어보세요.";

const QUICK = [
  "맛집은 어떻게 추천되나요?",
  "신뢰 점수가 뭐예요?",
  "기상 동선이 뭐예요?",
  "문의하고 싶어요",
];

function answer(q: string): string {
  const has = (...ks: string[]) => ks.some((k) => q.includes(k));
  if (has("맛집", "추천", "식당", "음식", "필터", "조건", "주변"))
    return "맛집 큐레이션 페이지에서 음식 종류(물회·회, 고기·구이, 국수·면 등)로 나눴 보고, ‘현지인 추천만 / 신뢰 높음만’ 조건과 ‘내 주변순’(현재 위치 기준 거리)으로도 찾을 수 있어요. 카드를 누르면 사진 갤러리가 열립니다.";
  if (has("점수", "신뢰", "필터링", "알고리즘", "평점"))
    return "인사이트 점수는 3단계로 계산돼요. ① 구글·네이버 평점 5:5 융합 → ② 블루리본·현지인 추천 등 검증 자료 가중 → ③ 플랫폼 간 평점 표준편차로 광고 의심 데이터를 걸러냅니다.";
  if (has("날씨", "기상", "동선", "비", "눈", "위치"))
    return "기상 동선 페이지는 현재 GPS 위치의 실시간 날씨(Open-Meteo)를 받아, 악천후면 실내 박물관 위주로 동선을 자동 추천하고 탭도 실시간 날씨로 전환돼요.";
  if (has("사진", "이미지", "갤러리"))
    return "맛집 카드를 누르면 사진 갤러리가 열려요. 실제 매장 사진은 Google Places 연동으로 채워지며, 없을 때는 참고 이미지와 네이버·구글 이미지 검색 링크를 보여줍니다.";
  if (has("광고", "배너"))
    return "하단 광고는 무수익 지역 광고예요. 여러 광고가 번갈아 표시되고, 닫기(✕)를 누르면 사유를 선택해 숨길 수 있어요(재접속 시 다시 표시).";
  if (has("제작", "만든", "문의", "연락", "누구", "채지율", "신현우", "제보"))
    return "제작사는 Viva Sokcho, 제작자는 신현우입니다. 문의·맛집 제보는 이 창에 남겨 주세요 — 제작자에게 전달됩니다.";
  if (has("안녕", "하이", "hello", "도움", "뭐 해", "누구"))
    return GREETING;
  return "아직 학습되지 않은 질문이에요. 맛집/조건 필터, 기상 동선, 사진, 광고, 문의 중에 물어봐 주시면 도와드릴게요!";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: "user", text: q }, { role: "bot", text: answer(q) }]);
    setInput("");
  };

  return (
    <>
      {/* 푸터에 들어가는 트리거 버튼 */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-[#0064E0] px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-[#0058C4]"
      >
        <MessageCircle size={15} aria-hidden />
        AI 문의하기
      </button>

      {/* 채팅 패널 */}
      {open ? (
        <div className="fixed bottom-4 right-4 z-[90] flex h-[460px] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[16px] bg-white text-left shadow-[0_12px_28px_rgba(28,43,51,0.24)]">
          <div className="flex items-center justify-between bg-[linear-gradient(120deg,#0064E0,#0082FB)] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} aria-hidden />
              <div>
                <p className="text-[15px] font-bold leading-tight">속초 인사이트 도우미</p>
                <p className="text-[11px] text-white/80">AI 문의 · 보통 즉시 응답</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
            >
              <X size={16} aria-hidden />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#F0F2F5] p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <p
                  className={`max-w-[80%] whitespace-pre-line rounded-[14px] px-3 py-2 text-[14px] leading-[1.5] ${
                    m.role === "user"
                      ? "bg-[#0064E0] text-white"
                      : "bg-white text-[#1C2B33] shadow-[0_1px_2px_rgba(28,43,51,0.10)]"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {msgs.length <= 1 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-[#0064E0] shadow-[0_1px_2px_rgba(28,43,51,0.10)] transition hover:bg-[#E7F0FE]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-[#E4E6EB] p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요…"
              className="min-w-0 flex-1 rounded-[8px] bg-[#F0F2F5] px-3 py-2 text-[14px] text-[#1C2B33] outline-none placeholder:text-[#8A8D91]"
            />
            <button
              type="submit"
              aria-label="보내기"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#0064E0] text-white transition hover:bg-[#0058C4]"
            >
              <Send size={16} aria-hidden />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
