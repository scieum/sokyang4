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
        className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#03c75a] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:brightness-95"
        aria-label={`${name} 네이버 지도에서 보기`}
      >
        <MapPin size={14} aria-hidden />
        네이버 지도
      </a>
      <a
        href={googleMapUrl(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#E4E6EB] px-3 py-1.5 text-[12px] font-semibold text-[#1C2B33] transition hover:bg-[#D8DADF]"
        aria-label={`${name} 구글 지도에서 보기`}
      >
        <MapPin size={14} aria-hidden />
        구글 지도
      </a>
    </div>
  );
}
