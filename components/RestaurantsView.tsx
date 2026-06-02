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
            className={`rounded-[980px] px-4 py-2 text-[14px] tracking-[-0.224px] transition ${
              theme === opt.value
                ? "bg-[#0071e3] text-white"
                : "bg-white text-black/80 hover:bg-black/[0.03]"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-[14px] tracking-[-0.224px] text-black/80">
          <input
            type="checkbox"
            checked={hideAds}
            onChange={(e) => setHideAds(e.target.checked)}
            className="h-4 w-4 rounded accent-[#0071e3]"
          />
          광고 의심 숨기기
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-[17px] leading-[1.47] tracking-[-0.374px] text-black/48">
          조건에 맞는 맛집이 없습니다.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  );
}
