import { Quote, Star } from "lucide-react";
import NaverMapLink from "@/components/NaverMapLink";
import { THEME_LABEL, type Restaurant } from "@/types";

/**
 * 제작자 추천 맛집 리스트
 * 알고리즘 점수와 별개로, 제작자가 직접 다녀보고 추천하는 큐레이션 공간.
 */
export default function EditorPicks({ picks }: { picks: Restaurant[] }) {
  if (picks.length === 0) return null;

  return (
    <section className="rounded-[28px] bg-[#f6f6f3] p-7 sm:p-10">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#e60023] text-white">
          <Star size={18} aria-hidden />
        </span>
        <div>
          <h2 className="text-[24px] font-bold tracking-[-1.2px] text-[#211922]">
            제작자 추천 맛집
          </h2>
          <p className="text-[14px] text-[#62625b]">
            알고리즘과 별개로, 제작자가 직접 다녀보고 추천하는 리스트입니다.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((r) => (
          <article
            key={r.id}
            className="flex flex-col rounded-[20px] bg-white p-6 ring-1 ring-[#e5e5e0]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-block rounded-full bg-[#e60023] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                제작자 PICK
              </span>
              <span className="text-[12px] font-medium text-[#62625b]">
                {THEME_LABEL[r.theme]}
              </span>
            </div>

            <h3 className="mt-3 text-[20px] font-bold leading-tight tracking-[-0.5px] text-[#211922]">
              {r.name}
            </h3>
            <p className="mt-0.5 text-[12px] text-[#62625b]">
              {r.category} · {r.signatureMenu}
            </p>

            {r.editorNote ? (
              <blockquote className="mt-3 flex gap-2 border-l-2 border-[#e60023] pl-3 text-[14px] leading-[1.5] text-[#211922]">
                <Quote size={16} className="shrink-0 text-[#e60023]" aria-hidden />
                <span>{r.editorNote}</span>
              </blockquote>
            ) : null}

            <div className="mt-auto pt-5">
              <NaverMapLink name={r.name} address={r.address} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
