"use client";

import { useMemo, useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import RestaurantGallery from "@/components/RestaurantGallery";
import { getPlacePhotos } from "@/lib/data";
import {
  THEME_LABEL,
  type RestaurantTheme,
  type ScoredRestaurant,
} from "@/types";

const PLACE_PHOTOS = getPlacePhotos();

type ThemeFilter = RestaurantTheme | "all";

const THEME_OPTIONS: { value: ThemeFilter; label: string }[] = [
  { value: "all", label: "전체" },
  ...(Object.keys(THEME_LABEL) as RestaurantTheme[]).map((t) => ({
    value: t,
    label: THEME_LABEL[t],
  })),
];

export default function RestaurantsView({
  restaurants,
}: {
  restaurants: ScoredRestaurant[];
}) {
  const [theme, setTheme] = useState<ThemeFilter>("all");
  const [hideAds, setHideAds] = useState(true);
  const [selected, setSelected] = useState<ScoredRestaurant | null>(null);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      if (theme !== "all" && r.theme !== theme) return false;
      if (hideAds && r.adFiltered) return false;
      return true;
    });
  }, [restaurants, theme, hideAds]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {THEME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`rounded-[8px] px-4 py-2 text-[14px] font-semibold transition ${
              theme === opt.value
                ? "bg-[#0064E0] text-white"
                : "bg-[#F0F2F5] text-[#65676B] hover:bg-[#E4E6EB]"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium text-[#1C2B33]">
          <input
            type="checkbox"
            checked={hideAds}
            onChange={(e) => setHideAds(e.target.checked)}
            className="h-4 w-4 rounded accent-[#0064E0]"
          />
          광고 의심 숨기기
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-[15px] text-[#8A8D91]">
          조건에 맞는 맛집이 없습니다. 다른 필터를 시도해 보세요.
        </p>
      ) : (
        <div className="masonry mt-8 sm:columns-2">
          {filtered.map((r) => (
            <RestaurantCard
              key={r.id}
              r={r}
              onOpenGallery={() => setSelected(r)}
            />
          ))}
        </div>
      )}

      {selected ? (
        <RestaurantGallery
          restaurant={selected}
          realPhotos={PLACE_PHOTOS[selected.id] ?? []}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </div>
  );
}
