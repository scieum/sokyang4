"use client";

import { useMemo, useState } from "react";
import {
  Sun,
  CloudRain,
  Wind,
  Snowflake,
  Check,
  type LucideIcon,
} from "lucide-react";
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

  const curated = useMemo(
    () => curateRoute(attractions, weather),
    [attractions, weather],
  );
  const bad = isBadWeather(weather);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {WEATHER_OPTIONS.map(({ value, Icon }) => (
          <button
            key={value}
            onClick={() => setWeather(value)}
            className={`inline-flex items-center gap-2 rounded-[980px] px-4 py-2 text-[14px] tracking-[-0.224px] transition ${
              weather === value
                ? "bg-[#0071e3] text-white"
                : "bg-white text-black/80 hover:bg-black/[0.03]"
            }`}
          >
            <Icon size={16} aria-hidden />
            {WEATHER_LABEL[value]}
          </button>
        ))}
      </div>

      <p className="mt-6 text-[17px] leading-[1.47] tracking-[-0.374px] text-black/80">
        {weatherAdvice(weather)}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {curated.map((a) => (
          <article key={a.id} className="rounded-[28px] bg-white p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-semibold uppercase leading-[1.33] tracking-[0.06em] text-black/48">
                {a.type === "indoor" ? "실내" : "야외"}
              </p>
              {bad && a.weatherProof ? (
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.04em] text-[#1d8a3f]">
                  <Check size={14} aria-hidden />
                  악천후 추천
                </span>
              ) : null}
            </div>
            <h3 className="mt-1 text-[21px] font-bold leading-[1.19] tracking-[0.231px] text-[#1d1d1f]">
              {a.name}
            </h3>
            <p className="mt-0.5 text-[14px] leading-[1.29] tracking-[-0.224px] text-black/48">
              {a.category}
            </p>
            <p className="mt-3 text-[17px] leading-[1.47] tracking-[-0.374px] text-black/80">
              {a.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
