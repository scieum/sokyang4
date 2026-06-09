import { MapPin } from "lucide-react";
import { googleMapUrl, naverMapUrl } from "@/lib/naver";

/** 네이버/구글 지도 검색 딥링크 버튼 묶음 (상호명으로만 검색) */
export default function MapLinks({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <a
        href={naverMapUrl(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-2xl bg-[#03c75a] px-3 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#02b350]"
        aria-label={`${name} 네이버 지도에서 보기`}
      >
        <MapPin size={14} aria-hidden />
        네이버 지도
      </a>
      <a
        href={googleMapUrl(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-2xl bg-[#e5e5e0] px-3 py-1.5 text-[12px] font-bold text-[#211922] transition hover:bg-[#d9d9d2]"
        aria-label={`${name} 구글 지도에서 보기`}
      >
        <MapPin size={14} aria-hidden />
        구글 지도
      </a>
    </div>
  );
}
