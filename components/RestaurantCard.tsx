"use client";

import { AlertTriangle, Award, Camera, MapPin, Navigation } from "lucide-react";
import MapLinks from "@/components/MapLinks";
import { formatDistance } from "@/lib/geo";
import { type ScoredRestaurant } from "@/types";

const TRUST_DOT: Record<ScoredRestaurant["trustLevel"], string> = {
  high: "bg-[#42B72A]",
  medium: "bg-[#F5A623]",
  low: "bg-[#8A8D91]",
};

const TRUST_LABEL: Record<ScoredRestaurant["trustLevel"], string> = {
  high: "신뢰 높음",
  medium: "신뢰 보통",
  low: "신뢰 낮음",
};

export default function RestaurantCard({
  r,
  onOpenGallery,
  distanceKm,
}: {
  r: ScoredRestaurant;
  onOpenGallery?: () => void;
  distanceKm?: number;
}) {
  const clickable = Boolean(onOpenGallery);
  return (
    <article
      className={`flex flex-col rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(28,43,51,0.10)] ${
        clickable
          ? "cursor-pointer transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(28,43,51,0.12)]"
          : ""
      }`}
      onClick={onOpenGallery}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenGallery?.();
              }
            }
          : undefined
      }
      aria-label={clickable ? `${r.name} 사진 보기` : undefined}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-block rounded-full bg-[rgba(0,100,224,0.12)] px-2.5 py-1 text-[12px] font-semibold text-[#0064E0]">
              {r.cuisine}
            </span>
            {distanceKm !== undefined ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F2F5] px-2.5 py-1 text-[12px] font-semibold text-[#1C2B33]">
                <Navigation size={12} aria-hidden />
                {formatDistance(distanceKm)}
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 text-[20px] font-semibold leading-[1.4] text-[#1C2B33]">
            {r.name}
          </h3>
          <p className="mt-0.5 text-[13px] text-[#8A8D91]">{r.category}</p>
        </div>
        <div className="text-right">
          <div className="text-[32px] font-bold leading-none text-[#0064E0]">
            {r.insightScore}
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[#8A8D91]">
            Insight
          </div>
        </div>
      </div>

      <p className="mt-3 text-[15px] leading-[1.47] text-[#65676B]">
        {r.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-semibold text-[#1C2B33]">
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
          <span className="inline-flex items-center gap-1 text-[#FA383E]">
            <AlertTriangle size={14} aria-hidden />
            광고 의심 필터링
          </span>
        ) : null}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-[#E4E6EB] pt-4 text-[12px] text-[#8A8D91]">
        <div className="flex justify-between">
          <dt>구글</dt>
          <dd className="font-semibold text-[#1C2B33]">
            {r.ratings.google} · {r.ratings.googleCount}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>네이버</dt>
          <dd className="font-semibold text-[#1C2B33]">
            {r.ratings.naver} · {r.ratings.naverCount}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>평점 편차 σ</dt>
          <dd className="font-semibold text-[#1C2B33]">
            {r.scoreBreakdown.ratingDeviation}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>검증 보너스</dt>
          <dd className="font-semibold text-[#1C2B33]">
            +{r.scoreBreakdown.verificationBonus}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center gap-1.5 text-[12px] text-[#8A8D91]">
        <MapPin size={14} aria-hidden className="shrink-0" />
        <span>{r.address}</span>
      </div>
      <div className="mt-1 text-[12px] text-[#8A8D91]">
        {r.priceRange} · {r.signatureMenu}
      </div>

      <div className="mt-4" onClick={(e) => e.stopPropagation()}>
        <MapLinks name={r.name} />
      </div>

      {clickable ? (
        <div className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0064E0]">
          <Camera size={14} aria-hidden />
          카드를 누르면 사진 갤러리가 열립니다
        </div>
      ) : null}
    </article>
  );
}
