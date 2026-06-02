"use client";

import { useMemo, useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import {
  THEME_LABEL,
  type RestaurantTheme,
  type ScoredRestaurant,
} from "@/types";

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
            className={`rounded-2xl px-4 py-2 text-[14px] font-bold transition ${
              theme === opt.value
                ? "bg-[#e60023] text-white"
                : "bg-[#e5e5e0] text-[#211922] hover:bg-[#d9d9d2]"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium text-[#211922]">
          <input
            type="checkbox"
            checked={hideAds}
            onChange={(e) => setHideAds(e.target.checked)}
            className="h-4 w-4 rounded accent-[#e60023]"
          />
          광고 의심 숨기기
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-[16px] text-[#62625b]">
          조건에 맞는 맛집이 없습니다. 다른 필터를 시도해 보세요.
        </p>
      ) : (
        <div className="masonry mt-8 sm:columns-2">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  );
}
