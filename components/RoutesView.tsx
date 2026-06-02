"use client";

import { useMemo, useState } from "react";
import { curateRoute, isBadWeather, weatherAdvice } from "@/lib/weather";
import {
  WEATHER_LABEL,
  type Attraction,
  type WeatherCondition,
} from "@/types";

const WEATHER_OPTIONS: { value: WeatherCondition; emoji: string }[] = [
  { value: "clear", emoji: "☀️" },
  { value: "rain", emoji: "🌧️" },
  { value: "wind", emoji: "💨" },
  { value: "snow", emoji: "❄️" },
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
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {WEATHER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setWeather(opt.value)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
              weather === opt.value
                ? "bg-sky-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            <span>{opt.emoji}</span>
            {WEATHER_LABEL[opt.value]}
          </button>
        ))}
      </div>

      <div
        className={`rounded-lg border p-4 text-sm ${
          bad
            ? "border-amber-200 bg-amber-50 text-amber-800"
            : "border-sky-200 bg-sky-50 text-sky-800"
        }`}
      >
        {weatherAdvice(weather)}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {curated.map((a) => (
          <article
            key={a.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">{a.name}</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  a.type === "indoor"
                    ? "bg-violet-100 text-violet-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {a.type === "indoor" ? "실내" : "야외"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">{a.category}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {a.description}
            </p>
            {bad && a.weatherProof && (
              <p className="mt-3 text-xs font-medium text-amber-700">
                ✓ 악천후에도 방문하기 좋은 곳
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
