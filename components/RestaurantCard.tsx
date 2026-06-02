import { AlertTriangle, Award, MapPin } from "lucide-react";
import { THEME_LABEL, type ScoredRestaurant } from "@/types";

const TRUST_DOT: Record<ScoredRestaurant["trustLevel"], string> = {
  high: "bg-[#103c25]",
  medium: "bg-[#a25e00]",
  low: "bg-[#91918c]",
};

const TRUST_LABEL: Record<ScoredRestaurant["trustLevel"], string> = {
  high: "신뢰 높음",
  medium: "신뢰 보통",
  low: "신뢰 낮음",
};

export default function RestaurantCard({ r }: { r: ScoredRestaurant }) {
  return (
    <article className="flex flex-col rounded-[20px] bg-white p-6 ring-1 ring-[#e5e5e0]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-[#e0e0d9] px-2.5 py-1 text-[12px] font-medium text-[#211922]">
            {THEME_LABEL[r.theme]}
          </span>
          <h3 className="mt-2 text-[20px] font-bold leading-tight tracking-[-0.5px] text-[#211922]">
            {r.name}
          </h3>
          <p className="mt-0.5 text-[12px] text-[#62625b]">{r.category}</p>
        </div>
        <div className="text-right">
          <div className="text-[34px] font-bold leading-none text-[#e60023]">
            {r.insightScore}
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[#91918c]">
            Insight
          </div>
        </div>
      </div>

      <p className="mt-3 text-[16px] leading-[1.4] text-[#62625b]">
        {r.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-medium text-[#211922]">
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
          <span className="inline-flex items-center gap-1 text-[#9e0a0a]">
            <AlertTriangle size={14} aria-hidden />
            광고 의심 필터링
          </span>
        ) : null}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-[#e5e5e0] pt-4 text-[12px] text-[#62625b]">
        <div className="flex justify-between">
          <dt>구글</dt>
          <dd className="font-medium text-[#211922]">
            {r.ratings.google} · {r.ratings.googleCount}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>네이버</dt>
          <dd className="font-medium text-[#211922]">
            {r.ratings.naver} · {r.ratings.naverCount}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>평점 편차 σ</dt>
          <dd className="font-medium text-[#211922]">
            {r.scoreBreakdown.ratingDeviation}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>검증 보너스</dt>
          <dd className="font-medium text-[#211922]">
            +{r.scoreBreakdown.verificationBonus}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center gap-1.5 text-[12px] text-[#91918c]">
        <MapPin size={14} aria-hidden className="shrink-0" />
        <span>{r.address}</span>
      </div>
      <div className="mt-1 text-[12px] text-[#91918c]">
        {r.priceRange} · {r.signatureMenu}
      </div>
    </article>
  );
}
