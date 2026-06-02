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
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-[14px] font-bold transition ${
              weather === value
                ? "bg-[#e60023] text-white"
                : "bg-[#e5e5e0] text-[#211922] hover:bg-[#d9d9d2]"
            }`}
          >
            <Icon size={16} aria-hidden />
            {WEATHER_LABEL[value]}
          </button>
        ))}
      </div>

      <p className="mt-6 text-[18px] leading-[1.4] text-[#62625b]">
        {weatherAdvice(weather)}
      </p>

      <div className="masonry mt-8 sm:columns-2">
        {curated.map((a) => (
          <article
            key={a.id}
            className="rounded-[20px] bg-white p-6 ring-1 ring-[#e5e5e0]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-block rounded-full bg-[#e0e0d9] px-2.5 py-1 text-[12px] font-medium text-[#211922]">
                {a.type === "indoor" ? "실내" : "야외"}
              </span>
              {bad && a.weatherProof ? (
                <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#103c25]">
                  <Check size={14} aria-hidden />
                  악천후 추천
                </span>
              ) : null}
            </div>
            <h3 className="mt-2 text-[20px] font-bold leading-tight tracking-[-0.5px] text-[#211922]">
              {a.name}
            </h3>
            <p className="mt-0.5 text-[12px] text-[#62625b]">{a.category}</p>
            <p className="mt-3 text-[16px] leading-[1.4] text-[#62625b]">
              {a.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
