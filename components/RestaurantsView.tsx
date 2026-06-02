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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {THEME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              theme === opt.value
                ? "bg-sky-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={hideAds}
            onChange={(e) => setHideAds(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-sky-600"
          />
          광고 의심 숨기기
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
          조건에 맞는 맛집이 없습니다.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  );
}
