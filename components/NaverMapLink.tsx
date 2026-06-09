import { MapPin } from "lucide-react";
import { naverMapUrl } from "@/lib/naver";

/** 네이버 지도 검색 딥링크 버튼 (새 탭) */
export default function NaverMapLink({
  name,
  address,
  className = "",
}: {
  name: string;
  address?: string;
  className?: string;
}) {
  return (
    <a
      href={naverMapUrl(name, address)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-2xl bg-[#03c75a] px-3 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#02b350] ${className}`}
      aria-label={`${name} 네이버 지도에서 보기`}
    >
      <MapPin size={14} aria-hidden />
      네이버 지도
    </a>
  );
}
