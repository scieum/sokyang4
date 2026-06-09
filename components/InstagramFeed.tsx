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
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#e60023] text-white">
          <Camera size={18} aria-hidden />
        </span>
        <div>
          <h2 className="text-[24px] font-bold tracking-[-1.2px] text-[#211922]">
            인스타그램 추천
          </h2>
          <a
            href={`https://www.instagram.com/${TARGET}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[14px] font-bold text-[#e60023] hover:underline"
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
            className="group block rounded-[20px] bg-white p-6 ring-1 ring-[#e5e5e0] transition hover:bg-[#fcfcfa]"
          >
            <div className="flex items-center justify-between text-[12px] text-[#91918c]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#211922]">
                <Camera size={14} aria-hidden />@{TARGET}
              </span>
              <span>{formatDate(p.timestamp)}</span>
            </div>
            <p className="mt-3 text-[16px] leading-[1.4] text-[#211922]">
              {excerpt(p.caption) || "(캡션 없음)"}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-bold text-[#e60023]">
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
