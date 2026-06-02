import { AlertTriangle, Award, MapPin } from "lucide-react";
import { THEME_LABEL, type ScoredRestaurant } from "@/types";

const TRUST_DOT: Record<ScoredRestaurant["trustLevel"], string> = {
  high: "bg-[#1d8a3f]",
  medium: "bg-[#a25e00]",
  low: "bg-black/40",
};

const TRUST_LABEL: Record<ScoredRestaurant["trustLevel"], string> = {
  high: "신뢰 높음",
  medium: "신뢰 보통",
  low: "신뢰 낮음",
};

export default function RestaurantCard({ r }: { r: ScoredRestaurant }) {
  return (
    <article className="flex flex-col rounded-[28px] bg-white p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-semibold uppercase leading-[1.33] tracking-[0.06em] text-black/48">
            {THEME_LABEL[r.theme]}
          </p>
          <h3 className="mt-1 text-[21px] font-bold leading-[1.19] tracking-[0.231px] text-[#1d1d1f]">
            {r.name}
          </h3>
          <p className="mt-0.5 text-[14px] leading-[1.29] tracking-[-0.224px] text-black/48">
            {r.category}
          </p>
        </div>
        <div className="text-right">
          <div className="text-[40px] font-semibold leading-none tracking-[-0.28px] text-[#1d1d1f]">
            {r.insightScore}
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-black/48">
            Insight Score
          </div>
        </div>
      </div>

      <p className="mt-4 text-[17px] leading-[1.47] tracking-[-0.374px] text-black/80">
        {r.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#1d1d1f]">
        <span className="inline-flex items-center gap-1.5">
          <span
            className={`inline-block h-2 w-2 rounded-full ${TRUST_DOT[r.trustLevel]}`}
            aria-hidden
          />
          {TRUST_LABEL[r.trustLevel]}
        </span>
        {r.verification.blueRibbon ? (
          <span className="inline-flex items-center gap-1">
            <Award size={14} aria-hidden />
            블루리본 {r.verification.blueRibbon}
          </span>
        ) : null}
        {r.verification.localFavorite ? <span>현지인 추천</span> : null}
        {r.adFiltered ? (
          <span className="inline-flex items-center gap-1 text-[#b3261e]">
            <AlertTriangle size={14} aria-hidden />
            광고 의심 필터링
          </span>
        ) : null}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-black/5 pt-4 text-[14px] tracking-[-0.224px] text-black/48">
        <div className="flex justify-between">
          <dt>구글</dt>
          <dd className="text-[#1d1d1f]">
            {r.ratings.google} · {r.ratings.googleCount}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>네이버</dt>
          <dd className="text-[#1d1d1f]">
            {r.ratings.naver} · {r.ratings.naverCount}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>평점 편차 σ</dt>
          <dd className="text-[#1d1d1f]">
            {r.scoreBreakdown.ratingDeviation}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>검증 보너스</dt>
          <dd className="text-[#1d1d1f]">
            +{r.scoreBreakdown.verificationBonus}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center gap-1.5 text-[12px] leading-[1.33] tracking-[-0.12px] text-black/48">
        <MapPin size={14} aria-hidden className="shrink-0" />
        <span>{r.address}</span>
      </div>
      <div className="mt-1 text-[12px] leading-[1.33] tracking-[-0.12px] text-black/48">
        {r.priceRange} · {r.signatureMenu}
      </div>
    </article>
  );
}
