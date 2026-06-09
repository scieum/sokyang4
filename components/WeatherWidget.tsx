"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  Snowflake,
  Wind,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import type { WeatherCondition } from "@/types";

// 속초시 기본 좌표 (위치 권한 거부/실패 시 폴백)
const SOKCHO = { lat: 38.207, lng: 128.5918, label: "속초시" };

interface WeatherData {
  label: string;
  current: { temp: number; feels: number; humidity: number; wind: number; code: number };
  today: { min: number; max: number };
  tomorrow: { min: number; max: number; pop: number; code: number };
  uv: number;
  sunrise: string;
  sunset: string;
}

/** WMO weather code → 한글 라벨 + 아이콘 */
function describe(code: number): { label: string; Icon: LucideIcon } {
  if (code === 0) return { label: "맑음", Icon: Sun };
  if (code <= 2) return { label: "구름 조금", Icon: CloudSun };
  if (code === 3) return { label: "흐림", Icon: Cloud };
  if (code <= 48) return { label: "안개", Icon: Cloud };
  if (code <= 67) return { label: "비", Icon: CloudRain };
  if (code <= 77) return { label: "눈", Icon: Snowflake };
  if (code <= 82) return { label: "소나기", Icon: CloudRain };
  if (code <= 86) return { label: "눈", Icon: Snowflake };
  return { label: "뇌우", Icon: CloudRain };
}

function toCondition(code: number, wind: number): WeatherCondition {
  if (code >= 71 && code <= 77) return "snow";
  if (code === 85 || code === 86) return "snow";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 99)) return "rain";
  if (wind >= 9) return "wind";
  return "clear";
}

function uvLabel(uv: number): string {
  if (uv < 3) return "낮음";
  if (uv < 6) return "보통";
  if (uv < 8) return "높음";
  if (uv < 11) return "매우 높음";
  return "위험";
}

const fmtTime = (iso: string) =>
  iso?.includes("T") ? iso.split("T")[1].slice(0, 5) : iso ?? "--:--";
const fmtDate = (d: Date) =>
  `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

export default function WeatherWidget({
  onCondition,
}: {
  onCondition?: (c: WeatherCondition) => void;
}) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function load(lat: number, lng: number, fallbackLabel?: string) {
      try {
        const wxUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
          `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,sunrise,sunset,uv_index_max` +
          `&timezone=auto&wind_speed_unit=ms&forecast_days=2`;
        const wxRes = await fetch(wxUrl);
        const wx = await wxRes.json();

        let label = fallbackLabel ?? "현재 위치";
        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=ko`,
          );
          const geo = await geoRes.json();
          label = geo.locality || geo.city || geo.principalSubdivision || label;
        } catch {
          /* 지오코딩 실패 시 폴백 라벨 유지 */
        }

        if (cancelled) return;
        const built: WeatherData = {
          label,
          current: {
            temp: wx.current.temperature_2m,
            feels: wx.current.apparent_temperature,
            humidity: wx.current.relative_humidity_2m,
            wind: wx.current.wind_speed_10m,
            code: wx.current.weather_code,
          },
          today: {
            min: wx.daily.temperature_2m_min[0],
            max: wx.daily.temperature_2m_max[0],
          },
          tomorrow: {
            min: wx.daily.temperature_2m_min[1],
            max: wx.daily.temperature_2m_max[1],
            pop: wx.daily.precipitation_probability_max[1] ?? 0,
            code: wx.daily.weather_code[1],
          },
          uv: wx.daily.uv_index_max[0] ?? 0,
          sunrise: fmtTime(wx.daily.sunrise[0]),
          sunset: fmtTime(wx.daily.sunset[0]),
        };
        setData(built);
        setStatus("ready");
        onCondition?.(toCondition(built.current.code, built.current.wind));
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => load(pos.coords.latitude, pos.coords.longitude),
        () => load(SOKCHO.lat, SOKCHO.lng, SOKCHO.label),
        { timeout: 8000 },
      );
    } else {
      load(SOKCHO.lat, SOKCHO.lng, SOKCHO.label);
    }

    return () => {
      cancelled = true;
    };
  }, [onCondition]);

  if (status === "loading") {
    return (
      <div className="h-[148px] animate-pulse rounded-[16px] bg-[#E4E6EB]" />
    );
  }
  if (status === "error" || !data) {
    return (
      <div className="rounded-[16px] bg-white p-5 text-[14px] text-[#65676B] shadow-[0_1px_2px_rgba(28,43,51,0.10)]">
        실시간 날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </div>
    );
  }

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 86400000);
  const today = describe(data.current.code);
  const TodayIcon = today.Icon;

  return (
    <div className="rounded-[16px] bg-white p-5 shadow-[0_1px_2px_rgba(28,43,51,0.10)] sm:p-6">
      <div className="flex items-center gap-1.5 text-[18px] font-bold text-[#1C2B33]">
        <MapPin size={18} className="text-[#0064E0]" aria-hidden />
        {data.label}
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 sm:divide-x sm:divide-[#E4E6EB]">
        {/* 현재 */}
        <div className="sm:pr-5">
          <span className="inline-block rounded-full bg-[#F0F2F5] px-3 py-1 text-[13px] font-semibold text-[#65676B]">
            현재 {fmtDate(now)}
          </span>
          <div className="mt-2 flex items-center gap-3">
            <TodayIcon size={56} className="text-[#0064E0]" aria-hidden />
            <span className="text-[56px] font-bold leading-none text-[#1C2B33]">
              {Math.round(data.current.temp)}°
            </span>
          </div>
          <p className="mt-2 text-[15px] text-[#65676B]">
            {today.label} · 최저 <b className="text-[#1C2B33]">{Math.round(data.today.min)}°</b>{" "}
            최고 <b className="text-[#1C2B33]">{Math.round(data.today.max)}°</b>
          </p>
        </div>

        {/* 내일 */}
        <div className="sm:pl-5">
          <span className="inline-block rounded-full bg-[#F0F2F5] px-3 py-1 text-[13px] font-semibold text-[#65676B]">
            내일 {fmtDate(tomorrow)}
          </span>
          <div className="mt-2 flex items-baseline gap-2 text-[40px] font-bold leading-none text-[#1C2B33]">
            {Math.round(data.tomorrow.min)}°
            <span className="text-[#8A8D91]">/</span>
            {Math.round(data.tomorrow.max)}°
          </div>
          <p className="mt-2 text-[15px] text-[#65676B]">
            {describe(data.tomorrow.code).label} · 강수확률{" "}
            <b className="text-[#0064E0]">{data.tomorrow.pop}%</b>
          </p>
        </div>
      </div>

      {/* 상세 지표 */}
      <div className="mt-5 flex flex-wrap gap-2 border-t border-[#E4E6EB] pt-4 text-[13px]">
        {[
          { k: "체감", v: `${Math.round(data.current.feels)}°` },
          { k: "바람", v: `${data.current.wind.toFixed(1)}m/s` },
          { k: "습도", v: `${data.current.humidity}%` },
          { k: "자외선", v: `${Math.round(data.uv)} ${uvLabel(data.uv)}` },
          { k: "일출", v: data.sunrise },
          { k: "일몰", v: data.sunset },
        ].map((it) => (
          <div
            key={it.k}
            className="rounded-[8px] bg-[#F0F2F5] px-3 py-2"
          >
            <span className="text-[#8A8D91]">{it.k} </span>
            <span className="font-bold text-[#1C2B33]">{it.v}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[12px] text-[#8A8D91]">
        <Wind size={12} aria-hidden />
        실시간 기상 데이터 · Open-Meteo · 현재 GPS 위치 기준
      </div>
    </div>
  );
}
