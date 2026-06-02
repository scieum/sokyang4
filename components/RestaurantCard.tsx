import { THEME_LABEL, type ScoredRestaurant } from "@/types";

const TRUST_STYLE: Record<
  ScoredRestaurant["trustLevel"],
  { label: string; cls: string }
> = {
  high: { label: "신뢰 높음", cls: "bg-emerald-100 text-emerald-700" },
  medium: { label: "신뢰 보통", cls: "bg-amber-100 text-amber-700" },
  low: { label: "신뢰 낮음", cls: "bg-slate-200 text-slate-600" },
};

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-slate-500";
}

export default function RestaurantCard({ r }: { r: ScoredRestaurant }) {
  const trust = TRUST_STYLE[r.trustLevel];
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">{r.name}</h3>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
              {THEME_LABEL[r.theme]}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">{r.category}</p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-extrabold ${scoreColor(r.insightScore)}`}>
            {r.insightScore}
          </div>
          <div className="text-[10px] font-medium text-slate-400">
            INSIGHT SCORE
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {r.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className={`rounded-full px-2 py-0.5 font-medium ${trust.cls}`}>
          {trust.label}
        </span>
        {r.adFiltered && (
          <span className="rounded-full bg-rose-100 px-2 py-0.5 font-medium text-rose-700">
            ⚠ 광고 의심 필터링
          </span>
        )}
        {r.verification.blueRibbon ? (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 font-medium text-blue-700">
            블루리본 ★{r.verification.blueRibbon}
          </span>
        ) : null}
        {r.verification.localFavorite && (
          <span className="rounded-full bg-orange-100 px-2 py-0.5 font-medium text-orange-700">
            현지인 추천
          </span>
        )}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
        <div className="flex justify-between">
          <dt>구글</dt>
          <dd className="font-medium text-slate-700">
            {r.ratings.google} ({r.ratings.googleCount})
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>네이버</dt>
          <dd className="font-medium text-slate-700">
            {r.ratings.naver} ({r.ratings.naverCount})
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>평점 편차(σ)</dt>
          <dd className="font-medium text-slate-700">
            {r.scoreBreakdown.ratingDeviation}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>검증 보너스</dt>
          <dd className="font-medium text-slate-700">
            +{r.scoreBreakdown.verificationBonus}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{r.priceRange}</span>
        <span>{r.signatureMenu}</span>
      </div>
    </article>
  );
}
