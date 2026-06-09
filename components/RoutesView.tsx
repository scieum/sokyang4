"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  Sun,
  CloudRain,
  Wind,
  Snowflake,
  Check,
  type LucideIcon,
} from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import { curateRoute, isBadWeather, weatherAdvice } from "@/lib/weather";
import {
  WEATHER_LABEL,
  type Attraction,
  type WeatherCondition,
} from "@/types";

const WEATHER_OPTIONS: { value: WeatherCondition; Icon: LucideIcon }[] = [
  { value: "clear", Icon: Sun },
  { value: "rain", Icon: CloudRain },
  { value: "wind", Icon: Wind },
  { value: "snow", Icon: Snowflake },
];

export default function RoutesView({
  attractions,
}: {
  attractions: Attraction[];
}) {
  const [weather, setWeather] = useState<WeatherCondition>("clear");
  const [autoSynced, setAutoSynced] = useState(false);
  // 실시간 날씨로 자동 동기화 (사용자가 수동 선택하면 그 선택을 우선)
  const userChanged = useRef(false);

  const handleLiveCondition = useCallback((c: WeatherCondition) => {
    if (!userChanged.current) {
      setWeather(c);
      setAutoSynced(true);
    }
  }, []);

  const selectWeather = (c: WeatherCondition) => {
    userChanged.current = true;
    setAutoSynced(false);
    setWeather(c);
  };

  const curated = useMemo(
    () => curateRoute(attractions, weather),
    [attractions, weather],
  );
  const bad = isBadWeather(weather);

  return (
    <div>
      {/* 실시간 GPS 기상 위젯 — 상단 고정 */}
      <div className="sticky top-16 z-30">
        <WeatherWidget onCondition={handleLiveCondition} />
      </div>

      {autoSynced ? (
        <div className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[rgba(0,100,224,0.12)] px-3 py-1 text-[13px] font-semibold text-[#0064E0]">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#0064E0]" />
          실시간 날씨 기준 ‘{WEATHER_LABEL[weather]}’ 자동 선택됨
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {WEATHER_OPTIONS.map(({ value, Icon }) => (
          <button
            key={value}
            onClick={() => selectWeather(value)}
            className={`inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-[14px] font-semibold transition ${
              weather === value
                ? "bg-[#0064E0] text-white"
                : "bg-[#F0F2F5] text-[#65676B] hover:bg-[#E4E6EB]"
            }`}
          >
            <Icon size={16} aria-hidden />
            {WEATHER_LABEL[value]}
          </button>
        ))}
      </div>

      <p className="mt-6 text-[17px] leading-[1.53] text-[#65676B]">
        {weatherAdvice(weather)}
      </p>

      <div className="masonry mt-8 sm:columns-2">
        {curated.map((a) => (
          <article
            key={a.id}
            className="rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(28,43,51,0.10)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-block rounded-full bg-[rgba(0,100,224,0.12)] px-2.5 py-1 text-[12px] font-semibold text-[#0064E0]">
                {a.type === "indoor" ? "실내" : "야외"}
              </span>
              {bad && a.weatherProof ? (
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#42B72A]">
                  <Check size={14} aria-hidden />
                  악천후 추천
                </span>
              ) : null}
            </div>
            <h3 className="mt-2 text-[20px] font-semibold leading-[1.4] text-[#1C2B33]">
              {a.name}
            </h3>
            <p className="mt-0.5 text-[12px] text-[#8A8D91]">{a.category}</p>
            <p className="mt-3 text-[15px] leading-[1.47] text-[#65676B]">
              {a.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
