import { Camera, ExternalLink } from "lucide-react";
import type { InstagramPost } from "@/types";

const TARGET = "i_love_sokcho";

function excerpt(caption: string, max = 120): string {
  const oneLine = caption.replace(/\s+/g, " ").trim();
  return oneLine.length > max ? oneLine.slice(0, max) + "…" : oneLine;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * 인스타그램 @i_love_sokcho 추천 피드
 * 빌드 시점에 수집된 게시물(최근 1년)을 노출. 게시물이 없으면 렌더링하지 않는다.
 */
export default function InstagramFeed({ posts }: { posts: InstagramPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-14">
      <div className="mb-6 flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(120deg,#0064E0,#0082FB)] text-white">
          <Camera size={18} aria-hidden />
        </span>
        <div>
          <h2 className="text-[24px] font-semibold leading-[1.33] text-[#1C2B33]">
            인스타그램 추천
          </h2>
          <a
            href={`https://www.instagram.com/${TARGET}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#0064E0] hover:underline"
          >
            @{TARGET}
            <ExternalLink size={14} aria-hidden />
          </a>
        </div>
      </div>

      <div className="masonry sm:columns-2 lg:columns-3">
        {posts.map((p) => (
          <a
            key={p.id}
            href={p.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(28,43,51,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(28,43,51,0.12)]"
          >
            <div className="flex items-center justify-between text-[12px] text-[#8A8D91]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#1C2B33]">
                <Camera size={14} aria-hidden />@{TARGET}
              </span>
              <span>{formatDate(p.timestamp)}</span>
            </div>
            <p className="mt-3 text-[15px] leading-[1.47] text-[#1C2B33]">
              {excerpt(p.caption) || "(캡션 없음)"}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#0064E0]">
              게시물 보기
              <ExternalLink
                size={14}
                aria-hidden
                className="transition group-hover:translate-x-0.5"
              />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
