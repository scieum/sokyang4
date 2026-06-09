"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink, Info } from "lucide-react";
import { googleImageSearchUrl, naverImageSearchUrl } from "@/lib/naver";
import { representativePhotos } from "@/lib/photos";
import {
  PHOTO_CATEGORY_LABEL,
  type PhotoCategory,
  type ScoredRestaurant,
} from "@/types";

const CATEGORIES: PhotoCategory[] = ["menu", "interior", "exterior"];

export default function RestaurantGallery({
  restaurant,
  onClose,
}: {
  restaurant: ScoredRestaurant;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<PhotoCategory>("menu");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const curated = restaurant.photos?.[tab] ?? [];
  const isRepresentative = curated.length === 0;
  const photos = isRepresentative
    ? representativePhotos(restaurant, tab)
    : curated;
  const query = `${restaurant.name} ${PHOTO_CATEGORY_LABEL[tab]}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(28,43,51,0.6)] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${restaurant.name} 사진`}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-[860px] flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_12px_28px_rgba(28,43,51,0.20)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-3 border-b border-[#E4E6EB] p-6">
          <div>
            <h2 className="text-[24px] font-semibold leading-[1.33] text-[#1C2B33]">
              {restaurant.name}
            </h2>
            <p className="mt-0.5 text-[13px] text-[#65676B]">
              {restaurant.category} · {restaurant.signatureMenu}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4E6EB] text-[#1C2B33] transition hover:bg-[#D8DADF]"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* 탭 (Segmented) */}
        <div className="flex gap-2 px-6 pt-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`rounded-[8px] px-4 py-2 text-[14px] font-semibold transition ${
                tab === c
                  ? "bg-[#0064E0] text-white"
                  : "bg-[#F0F2F5] text-[#65676B] hover:bg-[#E4E6EB]"
              }`}
            >
              {PHOTO_CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        {/* 예시 이미지 안내 (간단 캡션) */}
        {isRepresentative ? (
          <p className="mx-6 mt-4 inline-flex items-center gap-1.5 text-[12px] text-[#8A8D91]">
            <Info size={13} className="shrink-0" aria-hidden />
            참고 이미지 · 실제 매장 사진은 아래 네이버·구글에서 확인
          </p>
        ) : null}

        {/* 이미지 그리드 */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`${restaurant.name} ${PHOTO_CATEGORY_LABEL[tab]} ${i + 1}`}
                loading="lazy"
                className="aspect-square w-full rounded-[8px] bg-[#F0F2F5] object-cover"
              />
            ))}
          </div>
        </div>

        {/* 실제 사진 검색 링크 */}
        <div className="flex flex-wrap gap-2 border-t border-[#E4E6EB] px-6 py-4">
          <a
            href={naverImageSearchUrl(query)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#03c75a] px-4 py-2 text-[14px] font-semibold text-white transition hover:brightness-95"
          >
            네이버 이미지
            <ExternalLink size={14} aria-hidden />
          </a>
          <a
            href={googleImageSearchUrl(query)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#E4E6EB] px-4 py-2 text-[14px] font-semibold text-[#1C2B33] transition hover:bg-[#D8DADF]"
          >
            구글 이미지
            <ExternalLink size={14} aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
