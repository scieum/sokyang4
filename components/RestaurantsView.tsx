"use client";

import { useMemo, useState } from "react";
import { Navigation, Loader2 } from "lucide-react";
import RestaurantCard from "@/components/RestaurantCard";
import RestaurantGallery from "@/components/RestaurantGallery";
import { getPlacePhotos } from "@/lib/data";
import { distanceKm } from "@/lib/geo";
import { type ScoredRestaurant } from "@/types";

const PLACE_PHOTOS = getPlacePhotos();

type Pos = { lat: number; lng: number };

export default function RestaurantsView({
  restaurants,
}: {
  restaurants: ScoredRestaurant[];
}) {
  const [cuisine, setCuisine] = useState<string>("all");
  const [hideAds, setHideAds] = useState(true);
  const [localOnly, setLocalOnly] = useState(false);
  const [highTrustOnly, setHighTrustOnly] = useState(false);
  const [selected, setSelected] = useState<ScoredRestaurant | null>(null);
  const [pos, setPos] = useState<Pos | null>(null);
  const [locating, setLocating] = useState(false);
  const [nearby, setNearby] = useState(false);

  const cuisines = useMemo(
    () => Array.from(new Set(restaurants.map((r) => r.cuisine))),
    [restaurants],
  );

  const list = useMemo(() => {
    const filtered = restaurants.filter((r) => {
      if (cuisine !== "all" && r.cuisine !== cuisine) return false;
      if (hideAds && r.adFiltered) return false;
      if (localOnly && !r.verification.localFavorite) return false;
      if (highTrustOnly && r.trustLevel !== "high") return false;
      return true;
    });
    const withDist = filtered.map((r) => ({
      r,
      dist: pos ? distanceKm(pos, { lat: r.lat, lng: r.lng }) : undefined,
    }));
    if (nearby && pos) {
      withDist.sort((a, b) => (a.dist ?? Infinity) - (b.dist ?? Infinity));
    }
    return withDist;
  }, [restaurants, cuisine, hideAds, localOnly, highTrustOnly, pos, nearby]);

  const findNearby = () => {
    if (nearby) {
      setNearby(false);
      return;
    }
    if (pos) {
      setNearby(true);
      return;
    }
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos({ lat: p.coords.latitude, lng: p.coords.longitude });
        setNearby(true);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 },
    );
  };

  const chipCls = (active: boolean) =>
    `rounded-[8px] px-4 py-2 text-[14px] font-semibold transition ${
      active
        ? "bg-[#0064E0] text-white"
        : "bg-[#F0F2F5] text-[#65676B] hover:bg-[#E4E6EB]"
    }`;

  return (
    <div>
      {/* 음식 종류 필터 */}
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setCuisine("all")} className={chipCls(cuisine === "all")}>
          전체
        </button>
        {cuisines.map((c) => (
          <button key={c} onClick={() => setCuisine(c)} className={chipCls(cuisine === c)}>
            {c}
          </button>
        ))}
      </div>

      {/* 조건 필터 + 내 주변 */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={findNearby}
          className={`inline-flex items-center gap-1.5 rounded-[8px] px-4 py-2 text-[14px] font-semibold transition ${
            nearby ? "bg-[#0064E0] text-white" : "bg-[#E4E6EB] text-[#1C2B33] hover:bg-[#D8DADF]"
          }`}
        >
          {locating ? (
            <Loader2 size={16} className="animate-spin" aria-hidden />
          ) : (
            <Navigation size={16} aria-hidden />
          )}
          내 주변순
        </button>
        <button
          onClick={() => setLocalOnly((v) => !v)}
          className={chipCls(localOnly)}
        >
          현지인 추천만
        </button>
        <button
          onClick={() => setHighTrustOnly((v) => !v)}
          className={chipCls(highTrustOnly)}
        >
          신뢰 높음만
        </button>
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

      {nearby && pos ? (
        <p className="mt-3 text-[13px] font-semibold text-[#0064E0]">
          현재 위치에서 가까운 순으로 정렬했습니다.
        </p>
      ) : null}

      {list.length === 0 ? (
        <p className="mt-10 text-[15px] text-[#8A8D91]">
          조건에 맞는 맛집이 없습니다. 다른 필터를 시도해 보세요.
        </p>
      ) : (
        <div className="masonry mt-8 sm:columns-2">
          {list.map(({ r, dist }) => (
            <RestaurantCard
              key={r.id}
              r={r}
              distanceKm={dist}
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
