"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink, ImageOff } from "lucide-react";
import { googleImageSearchUrl, naverImageSearchUrl } from "@/lib/naver";
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

  // ESC 닫기 + 바디 스크롤 잠금
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

  const photos = restaurant.photos?.[tab] ?? [];
  const query = `${restaurant.name} ${PHOTO_CATEGORY_LABEL[tab]}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${restaurant.name} 사진`}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-[860px] flex-col overflow-hidden rounded-[28px] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-3 border-b border-[#e5e5e0] p-6">
          <div>
            <h2 className="text-[22px] font-bold tracking-[-0.5px] text-[#211922]">
              {restaurant.name}
            </h2>
            <p className="mt-0.5 text-[13px] text-[#62625b]">
              {restaurant.category} · {restaurant.signatureMenu}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0e0d9] text-[#211922] transition hover:bg-[#d4d4cc]"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 px-6 pt-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`rounded-2xl px-4 py-2 text-[14px] font-bold transition ${
                tab === c
                  ? "bg-[#e60023] text-white"
                  : "bg-[#e5e5e0] text-[#211922] hover:bg-[#d9d9d2]"
              }`}
            >
              {PHOTO_CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        {/* 본문 */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt={`${restaurant.name} ${PHOTO_CATEGORY_LABEL[tab]} ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-[16px] object-cover ring-1 ring-[#e5e5e0]"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-[20px] bg-[#f6f6f3] px-6 py-12 text-center">
              <ImageOff size={32} className="text-[#91918c]" aria-hidden />
              <p className="mt-3 text-[16px] font-bold text-[#211922]">
                아직 등록된 {PHOTO_CATEGORY_LABEL[tab]} 사진이 없습니다
              </p>
              <p className="mt-1 max-w-[420px] text-[14px] leading-[1.5] text-[#62625b]">
                데이터 무결성을 위해 출처가 확인된 사진만 노출합니다. 아래에서
                실제 사진을 바로 확인하세요.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <a
                  href={naverImageSearchUrl(query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-[#03c75a] px-4 py-2 text-[14px] font-bold text-white transition hover:bg-[#02b350]"
                >
                  네이버 이미지
                  <ExternalLink size={14} aria-hidden />
                </a>
                <a
                  href={googleImageSearchUrl(query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-[#e5e5e0] px-4 py-2 text-[14px] font-bold text-[#211922] transition hover:bg-[#d9d9d2]"
                >
                  구글 이미지
                  <ExternalLink size={14} aria-hidden />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
