import { Quote, Star } from "lucide-react";
import MapLinks from "@/components/MapLinks";
import { THEME_LABEL, type Restaurant } from "@/types";

/**
 * 제작자 추천 맛집 리스트
 * 알고리즘 점수와 별개로, 제작자가 직접 다녀보고 추천하는 큐레이션 공간.
 */
export default function EditorPicks({ picks }: { picks: Restaurant[] }) {
  if (picks.length === 0) return null;

  return (
    <section className="rounded-[16px] bg-white p-6 shadow-[0_1px_2px_rgba(28,43,51,0.10)] sm:p-8">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(120deg,#0064E0,#0082FB)] text-white">
          <Star size={18} aria-hidden />
        </span>
        <div>
          <h2 className="text-[24px] font-semibold leading-[1.33] text-[#1C2B33]">
            제작자 추천 맛집
          </h2>
          <p className="text-[14px] text-[#65676B]">
            알고리즘과 별개로, 제작자가 직접 다녀보고 추천하는 리스트입니다.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((r) => (
          <article
            key={r.id}
            className="flex flex-col rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(28,43,51,0.10)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-block rounded-full bg-[linear-gradient(120deg,#0064E0,#0082FB)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                제작자 PICK
              </span>
              <span className="text-[12px] font-medium text-[#65676B]">
                {THEME_LABEL[r.theme]}
              </span>
            </div>

            <h3 className="mt-3 text-[20px] font-semibold leading-[1.4] text-[#1C2B33]">
              {r.name}
            </h3>
            <p className="mt-0.5 text-[12px] text-[#8A8D91]">
              {r.category} · {r.signatureMenu}
            </p>

            {r.editorNote ? (
              <blockquote className="mt-3 flex gap-2 border-l-2 border-[#0064E0] pl-3 text-[14px] leading-[1.5] text-[#1C2B33]">
                <Quote size={16} className="shrink-0 text-[#0064E0]" aria-hidden />
                <span>{r.editorNote}</span>
              </blockquote>
            ) : null}

            <div className="mt-auto pt-5">
              <MapLinks name={r.name} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
